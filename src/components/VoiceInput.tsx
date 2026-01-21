"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onResult: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceInput({ onResult, disabled }: Props) {
  const [recording, setRecording] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event: any) => {
      const text = event.results?.[0]?.[0]?.transcript || "";
      if (text) onResult(text);
      setRecording(false);
    };
    recognition.onerror = () => {
      setRecording(false);
    };
    recognitionRef.current = recognition;
  }, [onResult]);

  const start = () => {
    if (disabled || !recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      setRecording(true);
    } catch {
      setRecording(false);
    }
  };
  const stop = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setRecording(false);
  };

  if (!supported) {
    return (
      <div className="text-xs text-gray-500">
        浏览器不支持语音识别，请使用文本输入。
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={recording ? stop : start}
        disabled={disabled}
        className={cn(
          "px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2",
          recording ? "bg-red-600 text-white" : "bg-orange-600 text-white",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {recording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        {recording ? "停止录音" : "开始录音"}
      </button>
    </div>
  );
}

