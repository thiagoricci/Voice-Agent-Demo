import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from '../utils/audioUtils';
import { MODEL_NAME } from '../constants';

export interface UseLiveAgentProps {
  systemInstruction: string;
  voiceName: string;
}

export function useLiveAgent({ systemInstruction, voiceName }: UseLiveAgentProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mounted ref to prevent state updates after unmount
  const mountedRef = useRef(true);

  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Playback State
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Session Ref
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const disconnect = useCallback(() => {
    if (sessionPromiseRef.current) {
      sessionPromiseRef.current.then(session => {
          if(session.close) session.close();
      }).catch(() => {});
      sessionPromiseRef.current = null;
    }
    
    // Stop Input
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (audioWorkletNodeRef.current) {
        audioWorkletNodeRef.current.disconnect();
        audioWorkletNodeRef.current = null;
    }
    
    if (inputSourceRef.current) {
        inputSourceRef.current.disconnect();
        inputSourceRef.current = null;
    }

    if (inputAudioContextRef.current) {
      if (inputAudioContextRef.current.state !== 'closed') {
        inputAudioContextRef.current.close();
      }
      inputAudioContextRef.current = null;
    }

    // Stop Output
    activeSourcesRef.current.forEach(src => {
         try { src.stop(); } catch(e) {} 
    });
    activeSourcesRef.current.clear();
    
    if (outputAudioContextRef.current) {
       if (outputAudioContextRef.current.state !== 'closed') {
        outputAudioContextRef.current.close();
      }
      outputAudioContextRef.current = null;
    }

    if (mountedRef.current) {
        setIsConnected(false);
        setIsSpeaking(false);
    }
  }, []);

  const connect = useCallback(async () => {
    try {
      if (mountedRef.current) setError(null);
      
      if (!process.env.API_KEY) {
          throw new Error("API Key not found in environment");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Initialize Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      inputAudioContextRef.current = inputCtx;
      
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputAudioContextRef.current = outputCtx;

      // Resume contexts to ensure they are active (fixes some browser autoplay blocks)
      await inputCtx.resume();
      await outputCtx.resume();

      // Load AudioWorklet Processor
      const workletScript = `
        class RecorderProcessor extends AudioWorkletProcessor {
          constructor() {
            super();
            this.bufferSize = 4096;
            this.buffer = new Float32Array(this.bufferSize);
            this.index = 0;
          }
          process(inputs, outputs, parameters) {
            const input = inputs[0];
            if (input.length > 0) {
              const channelData = input[0];
              for (let i = 0; i < channelData.length; i++) {
                this.buffer[this.index++] = channelData[i];
                if (this.index >= this.bufferSize) {
                  this.port.postMessage(this.buffer);
                  this.index = 0;
                }
              }
            }
            return true;
          }
        }
        registerProcessor('recorder-processor', RecorderProcessor);
      `;
      const blob = new Blob([workletScript], { type: 'application/javascript' });
      const workletUrl = URL.createObjectURL(blob);
      await inputCtx.audioWorklet.addModule(workletUrl);
      URL.revokeObjectURL(workletUrl);

      // Initialize Microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const config = {
        model: MODEL_NAME,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName } },
          },
          systemInstruction: systemInstruction,
        },
      };

      // Establish Connection
      sessionPromiseRef.current = ai.live.connect({
        ...config,
        callbacks: {
          onopen: () => {
            if (!mountedRef.current) return;
            console.log("Session opened");
            setIsConnected(true);
            
            // Setup Input Streaming with AudioWorklet
            if (!inputAudioContextRef.current || !mediaStreamRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
            inputSourceRef.current = source;
            
            const workletNode = new AudioWorkletNode(inputAudioContextRef.current, 'recorder-processor');
            audioWorkletNodeRef.current = workletNode;
            
            workletNode.port.onmessage = (e) => {
              if (!mountedRef.current) return;
              const inputData = e.data;
              const pcmBlob = createPcmBlob(inputData);
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(workletNode);
            // Keep the node alive by connecting to destination (silent)
            workletNode.connect(inputAudioContextRef.current.destination);

            // KICKSTART: Send a burst of low-level noise to trigger the model's VAD.
            // Wrapped in setTimeout to prevent 400 Bad Request / QUIC errors by ensuring session stability.
            setTimeout(() => {
                if (!mountedRef.current) return;
                sessionPromiseRef.current?.then((session) => {
                   const sampleRate = 16000;
                   const duration = 0.2; // 200ms of noise
                   const noiseData = new Float32Array(sampleRate * duration);
                   
                   // Generate subtle white noise
                   for (let i = 0; i < noiseData.length; i++) {
                       noiseData[i] = (Math.random() * 2 - 1) * 0.01;
                   }
                   
                   const pcmBlob = createPcmBlob(noiseData);
                   session.sendRealtimeInput({ media: pcmBlob });
                   
                   // Additionally, send a simple text input to trigger the agent to speak the opening line
                   // The system instruction should contain the opening line that needs to be spoken immediately
                   session.sendClientContent({ turns: [{ role: "user", parts: [{ text: "Hello." }] }] });
                }).catch(err => console.log("Kickstart skipped or failed", err));
            }, 500); // 500ms delay for stability
          },
          onmessage: async (message: LiveServerMessage) => {
            if (!mountedRef.current) return;

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio && outputAudioContextRef.current) {
              setIsSpeaking(true);
              
              const ctx = outputAudioContextRef.current;
              const audioData = base64ToUint8Array(base64Audio);
              const audioBuffer = await decodeAudioData(audioData, ctx, 24000, 1);
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              // Scheduling
              const currentTime = ctx.currentTime;
              if (nextStartTimeRef.current < currentTime) {
                nextStartTimeRef.current = currentTime;
              }
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              
              activeSourcesRef.current.add(source);
              
              source.onended = () => {
                activeSourcesRef.current.delete(source);
                if (activeSourcesRef.current.size === 0 && mountedRef.current) {
                  setIsSpeaking(false);
                }
              };
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
              console.log("Interrupted");
              activeSourcesRef.current.forEach(src => {
                 try { src.stop(); } catch(e) {} 
              });
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              if (mountedRef.current) setIsSpeaking(false);
            }
          },
          onclose: () => {
            if (mountedRef.current) {
                console.log("Session closed");
                setIsConnected(false);
                setIsSpeaking(false);
            }
          },
          onerror: (err) => {
            if (mountedRef.current) {
                console.error("Session error:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
                disconnect();
            }
          }
        }
      });

    } catch (err) {
      if (mountedRef.current) {
        console.error("Connection failed:", err);
        setError("Failed to access microphone or connect to AI.");
        setIsConnected(false);
      }
    }
  }, [systemInstruction, voiceName, disconnect]);

  // Cleanup on unmount or dep change
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect, systemInstruction, voiceName]);

  return {
    isConnected,
    isSpeaking,
    error,
    connect,
    disconnect
  };
}