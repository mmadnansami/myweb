import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Loader2, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "model";
  content: string;
  sources?: { uri: string; title: string }[];
}

// Helper to convert Float32Array into 16-bit PCM little-endian ArrayBuffer
function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return buffer;
}

// Helper to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "model", 
      content: "Assalamu Alaikum! I am Muttaki's AI Assistant. Ask me anything about his cinematic AI films, business automation setups, growth loops, or how to schedule a strategy call! You can also click the call icon above to talk with me over voice!" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Live Voice Mode States
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isVoiceConnected, setIsVoiceConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Audio & WebSockets Refs
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  const quickPrompts = [
    "What services do you offer?",
    "Tell me about your AI films.",
    "What tools are in your stack?",
    "How do I book a call?"
  ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isVoiceMode) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, isLoading, isVoiceMode]);

  // Clean up all voice audio contexts and socket connections on component unmount
  useEffect(() => {
    return () => {
      cleanupVoiceResources();
    };
  }, []);

  const cleanupVoiceResources = () => {
    if (processorRef.current) {
      try { processorRef.current.disconnect(); } catch (e) {}
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (wsRef.current) {
      try { wsRef.current.close(); } catch (e) {}
      wsRef.current = null;
    }
    
    // Stop playing audios
    activeSourcesRef.current.forEach((src) => {
      try { src.stop(); } catch (e) {}
    });
    activeSourcesRef.current = [];
    
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }
    setIsVoiceConnected(false);
  };

  const startVoiceSession = async () => {
    setVoiceError(null);
    setIsVoiceConnected(false);
    
    try {
      // 1. Get microphone stream first
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      
      // 2. Initialize input AudioContext at 16kHz
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioCtxClass({ sampleRate: 16000 });
      audioContextRef.current = inputCtx;
      
      // 3. Connect to our backend live server WebSocket
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/api/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      
      ws.onopen = () => {
        setIsVoiceConnected(true);
        
        // Setup mic processing
        const source = inputCtx.createMediaStreamSource(stream);
        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        
        source.connect(processor);
        processor.connect(inputCtx.destination);
        
        processor.onaudioprocess = (e) => {
          if (isMuted) return;
          const inputData = e.inputBuffer.getChannelData(0);
          
          // Convert to 16-bit PCM ArrayBuffer
          const buffer = floatTo16BitPCM(inputData);
          const base64 = arrayBufferToBase64(buffer);
          
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ audio: base64 }));
          }
        };
      };
      
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.audio) {
            playVoiceAudioChunk(msg.audio);
          }
          if (msg.interrupted) {
            handleVoiceInterruption();
          }
          if (msg.error) {
            setVoiceError(msg.error);
            stopVoiceSession();
          }
        } catch (e) {
          console.error("Error handling voice websocket message:", e);
        }
      };
      
      ws.onerror = (e) => {
        console.error("Voice websocket error:", e);
        setVoiceError("Failed to connect to the AI voice server.");
        stopVoiceSession();
      };
      
      ws.onclose = () => {
        console.log("Voice websocket closed.");
        setIsVoiceConnected(false);
      };
      
    } catch (err: any) {
      console.error("Could not access microphone or connect:", err);
      setVoiceError(err.message || "Microphone access is required for voice calls.");
      stopVoiceSession();
    }
  };

  const stopVoiceSession = () => {
    cleanupVoiceResources();
    setIsVoiceMode(false);
  };

  const playVoiceAudioChunk = (base64Audio: string) => {
    if (!outputAudioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      outputAudioCtxRef.current = new AudioCtxClass({ sampleRate: 24000 });
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }

    const audioCtx = outputAudioCtxRef.current;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const binaryString = window.atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const int16Data = new Int16Array(bytes.buffer);
    const float32Data = new Float32Array(int16Data.length);
    for (let i = 0; i < int16Data.length; i++) {
      float32Data[i] = int16Data[i] / 32768.0;
    }

    const buffer = audioCtx.createBuffer(1, float32Data.length, 24000);
    buffer.copyToChannel(float32Data, 0);

    const sourceNode = audioCtx.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(audioCtx.destination);

    const startTime = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
    sourceNode.start(startTime);
    
    sourceNode.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== sourceNode);
    };
    activeSourcesRef.current.push(sourceNode);
    
    nextStartTimeRef.current = startTime + buffer.duration;
  };

  const handleVoiceInterruption = () => {
    activeSourcesRef.current.forEach((src) => {
      try { src.stop(); } catch (e) {}
    });
    activeSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setInput("");
    
    // Add user message to history
    const updatedMessages = [...messages, { role: "user", content: userMessage } as Message];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with assistant server.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev, 
        { 
          role: "model", 
          content: data.text,
          sources: data.sources
        }
      ]);
    } catch (error) {
      console.error("Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "model", 
          content: "I'm having a small trouble connecting to my brain server right now. Muttaki is based in Bangladesh and is an AI Creative Director. You can contact him directly at muttakiadnansami@gmail.com or via WhatsApp at +880 1317 680620!" 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-assistant-container" className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Circular Trigger Button */}
      <motion.button
        id="ai-assistant-trigger"
        onClick={() => {
          if (isOpen) {
            stopVoiceSession();
          }
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex items-center justify-center text-white shadow-2xl shadow-purple-500/20 glow-purple border border-white/20 relative group cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-zinc-950 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle tooltip on hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block shadow-xl">
          Chat with Muttaki's AI
        </span>
      </motion.button>

      {/* Main Chat Panel Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-18 right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] rounded-2xl border border-zinc-800/80 bg-zinc-950/95 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden glow-purple"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-800/60 bg-zinc-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    Adnan Systems AI
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    {isVoiceMode ? "GEMINI-3.1-LIVE" : "GEMINI-3.5-FLASH · GROUNDED"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {!isVoiceMode && (
                  <button
                    id="ai-voice-call-btn"
                    onClick={() => {
                      setIsVoiceMode(true);
                      startVoiceSession();
                    }}
                    className="text-zinc-500 hover:text-purple-400 p-1.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                    title="Start Voice Call"
                  >
                    <Phone className="w-4.5 h-4.5" />
                  </button>
                )}
                <button 
                  id="ai-panel-close-btn"
                  onClick={() => {
                    stopVoiceSession();
                    setIsOpen(false);
                  }}
                  className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Calling Overlay / Voice Interface Screen */}
            {isVoiceMode ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 bg-zinc-950/40 relative">
                
                {/* Voice Call Status Indicator */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono uppercase tracking-widest text-purple-400">
                    <span className={`w-1.5 h-1.5 rounded-full bg-purple-400 ${isVoiceConnected ? "animate-pulse" : ""}`} />
                    {isVoiceConnected ? "Live Call Connected" : "Connecting..."}
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Adnan Systems AI</h4>
                  <p className="text-xs text-zinc-500 font-sans max-w-[280px] mx-auto">
                    {isVoiceConnected 
                      ? "Real-time voice conversation. Speak directly into your microphone!" 
                      : "Establishing secure audio connection with Gemini..."}
                  </p>
                </div>

                {/* Animated Audio Visualizer Waves */}
                <div className="h-28 flex items-center justify-center gap-1.5">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isVoiceConnected && !isMuted ? {
                        scaleY: [1, 2.2 + Math.sin(i) * 0.6, 1],
                        height: ["16px", "48px", "16px"]
                      } : {
                        scaleY: 1,
                        height: "12px"
                      }}
                      transition={{
                        duration: 0.8 + (i * 0.12),
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-blue-500"
                    />
                  ))}
                </div>

                {/* Microphone / Mute & End Call Controls */}
                <div className="flex items-center gap-4">
                  {/* Mute Button */}
                  <motion.button
                    id="ai-voice-mute-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${
                      isMuted 
                        ? "bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }`}
                    title={isMuted ? "Unmute Mic" : "Mute Mic"}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </motion.button>

                  {/* End Call Button */}
                  <motion.button
                    id="ai-voice-end-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopVoiceSession}
                    className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-lg shadow-red-600/20 cursor-pointer"
                    title="End Call"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Error Banner if any */}
                {voiceError && (
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                    <p className="text-xs text-red-400 font-sans">{voiceError}</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Chat Messages Log */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, idx) => {
                    const isModel = msg.role === "model";
                    return (
                      <div 
                        key={idx} 
                        className={`flex ${isModel ? "justify-start" : "justify-end"}`}
                      >
                        <div 
                          className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                            isModel 
                              ? "bg-zinc-900/80 text-zinc-200 border border-zinc-800/60 rounded-tl-none font-sans" 
                              : "bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white rounded-tr-none font-sans shadow-md shadow-purple-900/10"
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.content}</p>

                          {/* Render Google Search sources if they exist */}
                          {isModel && msg.sources && msg.sources.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-zinc-850 text-[11px] space-y-1.5 text-zinc-400">
                              <div className="flex items-center gap-1 font-mono text-zinc-500 text-[9px] uppercase tracking-wider">
                                <Globe className="w-3 h-3 text-purple-400 animate-pulse" />
                                Sources (Google Grounded):
                              </div>
                              <div className="flex flex-col gap-1">
                                {msg.sources.slice(0, 3).map((source, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={source.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-purple-400 hover:text-purple-300 hover:underline transition-colors leading-tight"
                                  >
                                    <span className="line-clamp-1 text-left">{source.title || source.uri}</span>
                                    <ArrowUpRight className="w-2.5 h-2.5 opacity-60 flex-shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Chat loader state */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-900/80 border border-zinc-800/60 text-zinc-400 rounded-xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                        <span className="font-mono text-xs text-zinc-500">Adnan is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Drawer */}
                {messages.length === 1 && !isLoading && (
                  <div className="px-4 py-2 bg-zinc-900/20 border-t border-zinc-900">
                    <span className="text-[10px] font-mono text-zinc-600 block mb-1.5 uppercase tracking-wider">
                      SUGGESTED QUESTIONS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickPrompts.map((prompt) => (
                        <button
                          id={`ai-quick-prompt-${prompt.toLowerCase().replace(/[?']/g, "").replace(/\s+/g, "-")}`}
                          key={prompt}
                          onClick={() => handleSend(prompt)}
                          className="text-xs text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <span>{prompt}</span>
                          <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Form Footer */}
                <form 
                  id="ai-assistant-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="p-3 bg-zinc-900/40 border-t border-zinc-800/60 flex gap-2 items-center"
                >
                  <input
                    id="ai-assistant-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Adnan's assistant..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors placeholder:text-zinc-600"
                    disabled={isLoading}
                  />
                  <button
                    id="ai-assistant-send-btn"
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-xl bg-white disabled:bg-zinc-800 text-black disabled:text-zinc-500 flex items-center justify-center hover:bg-zinc-100 transition-all cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
