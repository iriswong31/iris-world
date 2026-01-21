"use client";

import { Upload, Camera, X } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImagesSelect: (base64s: string[]) => void;
  selectedImages: string[];
}

export default function ImageUpload({ onImagesSelect, selectedImages }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const compressImage = (dataUrl: string, mime: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 1280;
        const maxH = 1280;
        let { width, height } = img;
        const ratio = Math.min(1, maxW / width, maxH / height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const out = canvas.toDataURL(mime.includes("png") ? "image/png" : "image/jpeg", 0.85);
        resolve(out);
      };
      img.src = dataUrl;
    });
  };

  const handleFile = useCallback(async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        const mime = file.type;
        const compressed = await compressImage(dataUrl, mime);
        onImagesSelect([...(selectedImages || []), compressed]);
      };
      reader.readAsDataURL(file);
    }
  }, [onImagesSelect, selectedImages]);

  // Paste Event Listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
                handleFile(file);
                e.preventDefault(); // Prevent default paste behavior
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handleFile]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
      files.slice(0, 6).forEach(f => handleFile(f));
    }
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
      files.slice(0, 6).forEach(f => handleFile(f));
    }
  };

  if (selectedImages && selectedImages.length > 0) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {selectedImages.map((img, idx) => (
            <div key={idx} className="relative bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200 h-32 md:h-36">
              <img src={img} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
              <button
                onClick={() => {
                  const next = [...selectedImages];
                  next.splice(idx, 1);
                  onImagesSelect(next);
                }}
                className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-gray-700 hover:bg-white"
                title="移除图片"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <label htmlFor="image-upload-more" className="inline-flex items-center px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            继续添加图片
          </label>
          <input id="image-upload-more" type="file" accept="image/*" multiple onChange={handleChange} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={cn(
        "border-3 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors h-48 md:h-56 flex flex-col items-center justify-center relative",
        isDragging ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:border-orange-400 hover:bg-gray-50"
      )}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
        <div className="p-4 bg-orange-100 rounded-full mb-4 text-orange-600">
            <Camera className="w-8 h-8" />
        </div>
        <p className="text-lg font-medium text-gray-700">点击或拖拽图片到这里（可多选）</p>
        <p className="text-sm text-gray-500 mt-2">支持 JPG, PNG；大图会自动压缩</p>
        <div className="mt-4 px-3 py-1 bg-gray-100 rounded text-xs text-gray-500 border border-gray-200">
            支持 Ctrl+V / Cmd+V 直接粘贴
        </div>
      </label>
    </div>
  );
}
