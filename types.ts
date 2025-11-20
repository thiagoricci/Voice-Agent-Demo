import { Modality } from "@google/genai";

export enum AgentType {
  AFTER_HOURS = 'AFTER_HOURS',
  BACKUP = 'BACKUP',
  RECEPTIONIST = 'RECEPTIONIST',
  FULL_SERVICE = 'FULL_SERVICE'
}

export interface AgentConfig {
  id: AgentType;
  title: string;
  subtitle: string;
  description: string;
  systemInstruction: string;
  voiceName: string;
  icon: string; // Emoji or lucide icon name
}

export interface LogMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export type LiveConfig = {
  model: string;
  systemInstruction: string;
  voiceName: string;
};
