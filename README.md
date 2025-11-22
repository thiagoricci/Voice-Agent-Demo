<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Estalio Real Estate - AI Voice Assistant Demo

A professional demonstration of a real-time AI voice assistant tailored for the Real Estate industry. Powered by **Google's Gemini Multimodal Live API**, this application showcases how to build low-latency, natural, and interruptible voice interactions for business use cases.

## 🌟 Features

- **Real-time Voice Interaction**: Experience ultra-low latency conversations that feel natural.
- **4 Specialized Agent Personas**:
  - 🌙 **After Hours Support**: Handles calls when the office is closed, collecting lead info.
  - 📋 **Lead Qualification**: Steps in when agents are busy to qualify buyers and sellers.
  - 📞 **Live Router**: Acts as a receptionist to direct calls to the right department.
  - 🏠 **Virtual Agent**: A fully autonomous agent capable of scheduling viewings and answering listing questions.
- **Live Audio Visualization**: Visual feedback of the user's and agent's audio levels.
- **Interruptibility**: The AI naturally handles interruptions, stopping its speech to listen to the user.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 2.5 Flash (Native Audio Streaming)
- **SDK**: Google Gen AI SDK (`@google/genai`)
- **Audio Processing**: Web Audio API & AudioWorklet

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Gemini API Key**: You need a valid API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env.local` file in the root directory of the project.
2. Add your Gemini API key to the file:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

   > **Note**: The application is configured to look for `GEMINI_API_KEY` and expose it to the client side securely for this demo.

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 📖 How to Use

1. **Grant Permissions**: Upon starting a demo, your browser will request microphone access. Please **Allow** this to enable voice interaction.
2. **Select a Scenario**: Scroll down to the "Test Our Agents" section. You will see a sidebar with 4 different agent personas.
3. **Start the Call**:
   - Click on an agent to select it (e.g., "After Hours Support").
   - Click the **"Start Demo"** button.
4. **Interact**:
   - The agent is configured to speak first (e.g., "Thank you for calling Estalio Real Estate...").
   - Speak naturally as if you were a client.
   - You can interrupt the agent at any time; it will stop speaking and listen to your new input.
5. **End the Call**: Click the **"End Call"** button to disconnect the session.

## 🔧 Troubleshooting

- **Microphone Error**: If the demo fails to start, ensure you have granted microphone permissions to the site. Check your browser's address bar for a blocked camera/microphone icon.
- **"Connection failed"**:
  - Verify your internet connection.
  - Check that your `GEMINI_API_KEY` in `.env.local` is correct and has not expired.
  - Ensure your API key has access to the `gemini-2.5-flash-native-audio-preview-09-2025` model.
- **No Audio**:
  - Check your system volume.
  - Ensure the correct audio output device is selected in your OS settings.

## 📄 License

This project is for demonstration purposes.
