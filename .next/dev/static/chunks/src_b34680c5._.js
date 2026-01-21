(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ImageUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ImageUpload({ onImagesSelect, selectedImages }) {
    _s();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const compressImage = (dataUrl, mime)=>{
        return new Promise((resolve)=>{
            const img = new Image();
            img.onload = ()=>{
                const maxW = 1280;
                const maxH = 1280;
                let { width, height } = img;
                const ratio = Math.min(1, maxW / width, maxH / height);
                const canvas = document.createElement("canvas");
                canvas.width = Math.round(width * ratio);
                canvas.height = Math.round(height * ratio);
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const out = canvas.toDataURL(mime.includes("png") ? "image/png" : "image/jpeg", 0.85);
                resolve(out);
            };
            img.src = dataUrl;
        });
    };
    const handleFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageUpload.useCallback[handleFile]": async (file)=>{
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = ({
                    "ImageUpload.useCallback[handleFile]": async ()=>{
                        const dataUrl = reader.result;
                        const mime = file.type;
                        const compressed = await compressImage(dataUrl, mime);
                        onImagesSelect([
                            ...selectedImages || [],
                            compressed
                        ]);
                    }
                })["ImageUpload.useCallback[handleFile]"];
                reader.readAsDataURL(file);
            }
        }
    }["ImageUpload.useCallback[handleFile]"], [
        onImagesSelect,
        selectedImages
    ]);
    // Paste Event Listener
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageUpload.useEffect": ()=>{
            const handlePaste = {
                "ImageUpload.useEffect.handlePaste": (e)=>{
                    if (e.clipboardData && e.clipboardData.items) {
                        for(let i = 0; i < e.clipboardData.items.length; i++){
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
                }
            }["ImageUpload.useEffect.handlePaste"];
            window.addEventListener("paste", handlePaste);
            return ({
                "ImageUpload.useEffect": ()=>{
                    window.removeEventListener("paste", handlePaste);
                }
            })["ImageUpload.useEffect"];
        }
    }["ImageUpload.useEffect"], [
        handleFile
    ]);
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageUpload.useCallback[onDrop]": (e)=>{
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const files = Array.from(e.dataTransfer.files).filter({
                    "ImageUpload.useCallback[onDrop].files": (f)=>f.type.startsWith("image/")
                }["ImageUpload.useCallback[onDrop].files"]);
                files.slice(0, 6).forEach({
                    "ImageUpload.useCallback[onDrop]": (f)=>handleFile(f)
                }["ImageUpload.useCallback[onDrop]"]);
            }
        }
    }["ImageUpload.useCallback[onDrop]"], [
        handleFile
    ]);
    const handleChange = (e)=>{
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files).filter((f)=>f.type.startsWith("image/"));
            files.slice(0, 6).forEach((f)=>handleFile(f));
        }
    };
    if (selectedImages && selectedImages.length > 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 md:grid-cols-4 gap-3",
                    children: selectedImages.map((img, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200 h-32 md:h-36",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: img,
                                    alt: `Uploaded ${idx}`,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ImageUpload.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const next = [
                                            ...selectedImages
                                        ];
                                        next.splice(idx, 1);
                                        onImagesSelect(next);
                                    },
                                    className: "absolute top-1 right-1 p-1 bg-white/80 rounded-full text-gray-700 hover:bg-white",
                                    title: "移除图片",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ImageUpload.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ImageUpload.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/src/components/ImageUpload.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/ImageUpload.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "image-upload-more",
                            className: "inline-flex items-center px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ImageUpload.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                "继续添加图片"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ImageUpload.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "image-upload-more",
                            type: "file",
                            accept: "image/*",
                            multiple: true,
                            onChange: handleChange,
                            className: "hidden"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImageUpload.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ImageUpload.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ImageUpload.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onDragOver: (e)=>{
            e.preventDefault();
            setIsDragging(true);
        },
        onDragLeave: ()=>setIsDragging(false),
        onDrop: onDrop,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-3 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors h-48 md:h-56 flex flex-col items-center justify-center relative", isDragging ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:border-orange-400 hover:bg-gray-50"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                accept: "image/*",
                multiple: true,
                onChange: handleChange,
                className: "hidden",
                id: "image-upload"
            }, void 0, false, {
                fileName: "[project]/src/components/ImageUpload.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "image-upload",
                className: "flex flex-col items-center cursor-pointer w-full h-full justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-orange-100 rounded-full mb-4 text-orange-600",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                            className: "w-8 h-8"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImageUpload.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImageUpload.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-medium text-gray-700",
                        children: "点击或拖拽图片到这里（可多选）"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImageUpload.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mt-2",
                        children: "支持 JPG, PNG；大图会自动压缩"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImageUpload.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 px-3 py-1 bg-gray-100 rounded text-xs text-gray-500 border border-gray-200",
                        children: "支持 Ctrl+V / Cmd+V 直接粘贴"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ImageUpload.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ImageUpload.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ImageUpload.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_s(ImageUpload, "OklrQ9mLaJASh9RjTF46Sh5uBYQ=");
_c = ImageUpload;
var _c;
__turbopack_context__.k.register(_c, "ImageUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RecipeDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RecipeDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chef$2d$hat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChefHat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chef-hat.js [app-client] (ecmascript) <export default as ChefHat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
;
;
function RecipeDisplay({ data }) {
    if (!data || !data.recipes) return null;
    const norm = (s)=>{
        if (!s) return "";
        let t = String(s).toLowerCase();
        t = t.replace(/[（）()]/g, "");
        t = t.replace(/\s+/g, "");
        t = t.replace(/番茄/g, "西红柿");
        t = t.replace(/鸡胸肉/g, "鸡肉");
        return t;
    };
    const detSet = new Set(Array.isArray(data.detectedIngredients) ? data.detectedIngredients.map((x)=>norm(x)) : []);
    const inDetected = (name)=>{
        const n = norm(name);
        return detSet.has(n) || Array.from(detSet).some((d)=>n.includes(d) || d.includes(n));
    };
    const shareRecipeImage = async (recipe)=>{
        const W = 1080;
        // 先创建一个超高画布用于绘制，最后裁剪
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = W;
        tempCanvas.height = 5000;
        const ctx = tempCanvas.getContext("2d");
        // 背景填充
        const g = ctx.createLinearGradient(0, 0, 0, tempCanvas.height);
        g.addColorStop(0, "#fff7ed");
        g.addColorStop(1, "#ffffff");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, tempCanvas.height);
        // 头部渐变条
        const headerGrad = ctx.createLinearGradient(0, 0, W, 0);
        headerGrad.addColorStop(0, "#fb923c");
        headerGrad.addColorStop(1, "#ef4444");
        ctx.fillStyle = headerGrad;
        ctx.fillRect(40, 40, W - 80, 120); // 增加高度
        // 标题
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 48px system-ui"; // 增大字号
        // 简单的标题换行处理
        const titleWords = recipe.title.split("");
        let titleLine = "";
        let titleY = 115;
        if (ctx.measureText(recipe.title).width > W - 140) {
            // 如果标题太长，简单缩小一点
            ctx.font = "bold 40px system-ui";
        }
        ctx.fillText(recipe.title, 60, titleY);
        // 辅助换行函数
        const wrapText = (text, x, y, maxWidth, lineHeight)=>{
            const words = text.split("");
            let line = "";
            for(let i = 0; i < words.length; i++){
                const test = line + words[i];
                if (ctx.measureText(test).width > maxWidth && i > 0) {
                    ctx.fillText(line, x, y);
                    line = words[i];
                    y += lineHeight;
                } else {
                    line = test;
                }
            }
            ctx.fillText(line, x, y);
            return y + lineHeight;
        };
        let y = 200; // 初始 Y 坐标下移
        // Meta 信息
        ctx.font = "30px system-ui"; // 增大字号
        ctx.fillStyle = "#6b7280";
        const meta = [
            `⏱ ${recipe.time}`,
            `👥 ${recipe.servings}`,
            typeof recipe.calories_kcal === "number" ? `✨ ≈${recipe.calories_kcal} kcal` : ""
        ].filter(Boolean).join("    ");
        ctx.fillText(meta, 60, y);
        y += 60; // 增加间距
        // 绘制区块标题的辅助函数
        const drawSectionTitle = (title, yPos)=>{
            // 背景框
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "#f97316"; // 橙色边框
            ctx.lineWidth = 3;
            // 阴影
            ctx.shadowColor = "rgba(0,0,0,0.1)";
            ctx.shadowBlur = 10;
            ctx.fillRect(50, yPos, W - 100, 60);
            ctx.shadowBlur = 0;
            ctx.strokeRect(50, yPos, W - 100, 60);
            // 文字
            ctx.fillStyle = "#c2410c"; // 深橙色
            ctx.font = "bold 32px system-ui";
            ctx.fillText(title, 70, yPos + 40);
            return yPos + 80; // 返回内容开始的 Y
        };
        // 所需食材
        y = drawSectionTitle("所需食材", y);
        y += 20; // 内容与标题的间距
        ctx.font = "28px system-ui"; // 增大正文字号
        ctx.fillStyle = "#374151";
        recipe.ingredients.forEach((ing)=>{
            const isObj = typeof ing === "object";
            const name = isObj ? ing.name : ing;
            const qty = isObj ? ing.quantity : undefined;
            const unit = isObj ? ing.unit : undefined;
            const needRaw = isObj ? !!ing.needToBuy : false;
            // 这里的逻辑与前端展示保持一致：如果识别到了，就不显示“需购买”
            const need = needRaw && !inDetected(String(name));
            const line = `${name}${qty ? ` ${qty}` : ""}${unit ? unit : ""}${need ? "（需购买）" : ""}`;
            // 绘制圆点
            ctx.beginPath();
            ctx.arc(70, y - 10, 6, 0, Math.PI * 2);
            ctx.fillStyle = "#f97316";
            ctx.fill();
            ctx.fillStyle = "#374151";
            y = wrapText(line, 100, y, W - 200, 48); // 行高 48
            y += 12; // 段间距
        });
        y += 60; // 模块间距大幅增加
        // 烹饪步骤
        y = drawSectionTitle("烹饪步骤", y);
        y += 20;
        ctx.font = "28px system-ui";
        ctx.fillStyle = "#374151";
        recipe.steps.forEach((step, idx)=>{
            // 序号
            ctx.fillStyle = "#ef4444";
            ctx.font = "bold 30px system-ui";
            ctx.fillText(`${idx + 1}.`, 60, y);
            // 内容
            ctx.fillStyle = "#374151";
            ctx.font = "28px system-ui";
            y = wrapText(step, 110, y, W - 180, 52); // 行高 52
            y += 24; // 步骤间距增加
        });
        y += 60; // 模块间距
        // 大厨贴士
        if (recipe.tips) {
            // 先计算贴士高度
            const tipsYStart = y;
            // 模拟绘制计算高度
            const dummyCtx = document.createElement("canvas").getContext("2d");
            dummyCtx.font = "26px system-ui";
            const tipsWords = recipe.tips.split("");
            let tipsLine = "";
            let tipsH = 0;
            const tipsLineHeight = 40;
            // 简单估算高度，或者直接用 wrapText 绘制
            // 直接画背景框，假设高度足够或者动态填充
            // 这里采用先画背景，后画文字的方式。为了确定背景高度，我们先“预演”一下 wrapText
            // 但为了简化，我们先画一个带标题的框，然后文字在下面
            ctx.fillStyle = "#fefce8"; // 黄色背景
            ctx.strokeStyle = "#fde047";
            ctx.lineWidth = 2;
            // 保存当前 Y
            const contentStartY = y + 50;
            // 绘制标题
            ctx.fillStyle = "#854d0e";
            ctx.font = "bold 28px system-ui";
            ctx.fillText("💡 大厨贴士", 70, y + 35);
            // 绘制内容并更新 Y
            ctx.font = "26px system-ui";
            ctx.fillStyle = "#854d0e";
            const endY = wrapText(recipe.tips, 70, contentStartY + 10, W - 140, 40);
            // 回过头画框（利用层级？不行，canvas 是覆盖的）
            // 所以必须先算高度。
            // 重新来：
            // 1. 计算文字高度
            const textHeight = endY - (contentStartY + 10) + 40; // + padding
            const totalBoxHeight = textHeight + 50; // + title height
            // 2. 画框
            ctx.globalCompositeOperation = "destination-over"; // 在现有内容下面画
            ctx.fillStyle = "#fefce8";
            ctx.fillRect(50, y, W - 100, totalBoxHeight);
            ctx.strokeStyle = "#fde047";
            ctx.strokeRect(50, y, W - 100, totalBoxHeight);
            ctx.globalCompositeOperation = "source-over"; // 恢复
            y = endY + 40;
        }
        y += 80; // 底部留白
        // 裁剪到实际高度
        const finalH = Math.min(y, 5000);
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = W;
        finalCanvas.height = finalH;
        const finalCtx = finalCanvas.getContext("2d");
        finalCtx.drawImage(tempCanvas, 0, 0, W, finalH, 0, 0, W, finalH);
        const dataUrl = finalCanvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `${recipe.title}.png`;
        a.click();
        if (navigator.canShare && navigator.canShare({
            files: []
        })) {
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([
                blob
            ], `${recipe.title}.png`, {
                type: "image/png"
            });
            try {
                await navigator.share({
                    files: [
                        file
                    ],
                    title: recipe.title,
                    text: recipe.title
                });
            } catch (e) {
                void 0;
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-orange-50 rounded-xl p-6 border border-orange-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-orange-800 mb-2 flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "w-5 h-5 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RecipeDisplay.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this),
                            "识别到的食材"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RecipeDisplay.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: data.detectedIngredients.map((ing, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-orange-100",
                                children: ing
                            }, idx, false, {
                                fileName: "[project]/src/components/RecipeDisplay.tsx",
                                lineNumber: 268,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/RecipeDisplay.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RecipeDisplay.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-center text-gray-800",
                        children: "推荐菜谱"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RecipeDisplay.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    data.recipes.map((recipe, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold mb-2",
                                            children: recipe.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                            lineNumber: 282,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-x-4 text-sm font-medium opacity-90",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "w-4 h-4 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 61
                                                        }, this),
                                                        " ",
                                                        recipe.time
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                            className: "w-4 h-4 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 61
                                                        }, this),
                                                        " ",
                                                        recipe.servings
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 25
                                                }, this),
                                                typeof recipe.calories_kcal === "number" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "w-4 h-4 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 63
                                                        }, this),
                                                        " ≈",
                                                        recipe.calories_kcal,
                                                        " kcal"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                            lineNumber: 283,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>shareRecipeImage(recipe),
                                            className: "absolute right-4 top-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-sm",
                                            title: "生成分享图片",
                                            children: "分享"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                            lineNumber: 290,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                    lineNumber: 281,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 md:p-8 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-semibold text-gray-800 mb-3 flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chef$2d$hat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChefHat$3e$__["ChefHat"], {
                                                            className: "w-5 h-5 mr-2 text-orange-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 29
                                                        }, this),
                                                        "所需食材"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-2",
                                                    children: recipe.ingredients.map((ing, i)=>{
                                                        const isObj = typeof ing === "object";
                                                        const name = isObj ? ing.name : ing;
                                                        const qty = isObj ? ing.quantity : undefined;
                                                        const unit = isObj ? ing.unit : undefined;
                                                        const needRaw = isObj ? !!ing.needToBuy : false;
                                                        const need = needRaw && !inDetected(String(name));
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 bg-orange-400 rounded-full mt-2 mr-2 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                    lineNumber: 316,
                                                                    columnNumber: 39
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                            lineNumber: 318,
                                                                            columnNumber: 41
                                                                        }, this),
                                                                        (qty || unit) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "ml-1 text-gray-500",
                                                                            children: [
                                                                                qty,
                                                                                unit
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                            lineNumber: 319,
                                                                            columnNumber: 59
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                    lineNumber: 317,
                                                                    columnNumber: 39
                                                                }, this),
                                                                need && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200",
                                                                    children: "需购买"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 35
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                            lineNumber: 301,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-semibold text-gray-800 mb-3 flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                                            className: "w-5 h-5 mr-2 text-orange-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 29
                                                        }, this),
                                                        "烹饪步骤"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: recipe.steps.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm",
                                                                    children: i + 1
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                    lineNumber: 341,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-gray-600 pt-1 leading-relaxed",
                                                                    children: step
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                    lineNumber: 344,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 33
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                            lineNumber: 333,
                                            columnNumber: 21
                                        }, this),
                                        recipe.shoppingList && recipe.shoppingList.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center font-semibold mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                            className: "w-5 h-5 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 33
                                                        }, this),
                                                        "购物清单"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-2",
                                                    children: recipe.shoppingList.map((s, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                    lineNumber: 359,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-700",
                                                                    children: s.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                    lineNumber: 360,
                                                                    columnNumber: 41
                                                                }, this),
                                                                (s.quantity || s.unit) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-1 text-gray-500",
                                                                    children: [
                                                                        s.quantity,
                                                                        s.unit
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                                    lineNumber: 362,
                                                                    columnNumber: 43
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 37
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                            lineNumber: 351,
                                            columnNumber: 25
                                        }, this),
                                        recipe.tips && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 border border-yellow-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "💡 大厨贴士："
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 29
                                                }, this),
                                                " ",
                                                recipe.tips
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                                            lineNumber: 371,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RecipeDisplay.tsx",
                                    lineNumber: 299,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/src/components/RecipeDisplay.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RecipeDisplay.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RecipeDisplay.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
_c = RecipeDisplay;
var _c;
__turbopack_context__.k.register(_c, "RecipeDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RecipeGenerator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RecipeGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImageUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ImageUpload.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RecipeDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RecipeDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function RecipeGenerator() {
    _s();
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputText, setInputText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [apiKey, setApiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time value", "dc970b26-4ed9-4367-aed8-07198aff6359") || "");
    const [endpointId, setEndpointId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time value", "ep-20260121005507-nl4gw") || "");
    const [showApiKey, setShowApiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSettings, setShowSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [localMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const localAnalyze = async ()=>{
        if (!inputText.trim() && images.length > 0 && !inputText.trim()) {
            setError("本地模式暂不支持图片自动识别，请填写文字描述中的食材与偏好");
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        const known = [
            "土豆",
            "马铃薯",
            "胡萝卜",
            "西红柿",
            "番茄",
            "洋葱",
            "鸡蛋",
            "鸡胸肉",
            "鸡肉",
            "猪肉",
            "牛肉",
            "虾",
            "豆腐",
            "青椒",
            "西兰花",
            "米饭",
            "面条",
            "大蒜",
            "蒜",
            "姜",
            "葱",
            "香菜",
            "蘑菇",
            "玉米"
        ];
        const text = inputText.trim();
        const detectedSet = new Set();
        known.forEach((k)=>{
            if (text.includes(k)) detectedSet.add(k === "番茄" ? "西红柿" : k);
        });
        const prefs = {
            noSpicy: /不辣|清淡|少辣|不要辣/.test(text),
            spicy: /辣|麻辣|重口/.test(text) && !/不辣|清淡|少辣|不要辣/.test(text),
            quick: /快手|快速|省事|简单/.test(text)
        };
        const kcalMap = {
            "鸡蛋": 78,
            "西红柿": 22,
            "番茄": 22,
            "土豆": 110,
            "胡萝卜": 41,
            "洋葱": 40,
            "豆腐": 76,
            "米饭": 240,
            "面条": 260,
            "橄榄油": 119,
            "食用油": 119,
            "辣椒": 18,
            "蒜": 4,
            "大蒜": 4,
            "黑胡椒": 0
        };
        const approxCalories = (names)=>{
            let sum = 0;
            names.forEach((n)=>{
                sum += kcalMap[n] ?? 30;
            });
            return Math.round(sum * (prefs.quick ? 1 : 1.2));
        };
        const ings = Array.from(detectedSet);
        if (ings.length === 0 && !text) {
            setError("请在文本框中输入至少一种食材名称，例如：土豆、鸡蛋、西红柿等");
            setLoading(false);
            return;
        }
        const pickTime = ()=>prefs.quick ? "15 分钟" : "25-35 分钟";
        const servings = "2 人份";
        const makeNonSpicy = (t)=>prefs.noSpicy ? t.replace(/辣|麻辣|剁椒/g, "清淡") : t;
        const addSpicyTip = (t)=>{
            if (prefs.spicy) return (t ? t + "。" : "") + "可加入辣椒或豆瓣酱增辣。";
            if (prefs.noSpicy) return (t ? t + "。" : "") + "不吃辣则不加辣椒，改用葱姜提味。";
            return t || "";
        };
        const recipes = [];
        const has = (x)=>ings.includes(x);
        const needFlag = (n)=>!has(n);
        if (has("西红柿") && has("鸡蛋")) {
            recipes.push({
                title: "番茄炒蛋",
                time: pickTime(),
                servings,
                ingredients: [
                    {
                        name: "西红柿",
                        quantity: "2",
                        unit: "个",
                        needToBuy: needFlag("西红柿")
                    },
                    {
                        name: "鸡蛋",
                        quantity: "3",
                        unit: "个",
                        needToBuy: needFlag("鸡蛋")
                    },
                    {
                        name: "葱花",
                        quantity: "适量",
                        needToBuy: needFlag("葱")
                    },
                    {
                        name: "食用油",
                        quantity: "2",
                        unit: "汤匙",
                        needToBuy: false
                    },
                    {
                        name: "盐",
                        quantity: "1/2",
                        unit: "茶匙",
                        needToBuy: false
                    },
                    prefs.spicy ? {
                        name: "辣椒",
                        quantity: "少许",
                        needToBuy: needFlag("辣椒")
                    } : {
                        name: "白糖",
                        quantity: "1/2",
                        unit: "茶匙",
                        needToBuy: false
                    }
                ],
                steps: [
                    "西红柿切块，鸡蛋打散加少许盐",
                    "热锅入油，炒蛋至半熟盛出",
                    makeNonSpicy("锅中补油，下西红柿翻炒至出汁"),
                    "倒回鸡蛋翻匀，调味后起锅"
                ],
                tips: addSpicyTip("可加少许白糖平衡酸味"),
                shoppingList: [
                    ...needFlag("西红柿") ? [
                        {
                            name: "西红柿",
                            quantity: "2",
                            unit: "个"
                        }
                    ] : [],
                    ...needFlag("鸡蛋") ? [
                        {
                            name: "鸡蛋",
                            quantity: "3",
                            unit: "个"
                        }
                    ] : [],
                    ...prefs.spicy && needFlag("辣椒") ? [
                        {
                            name: "辣椒",
                            quantity: "少许"
                        }
                    ] : []
                ],
                calories_kcal: approxCalories([
                    "西红柿",
                    "鸡蛋",
                    "食用油"
                ])
            });
        }
        if (has("土豆") && has("胡萝卜")) {
            recipes.push({
                title: "家常土豆胡萝卜炖菜",
                time: pickTime(),
                servings,
                ingredients: [
                    {
                        name: "土豆",
                        quantity: "2",
                        unit: "个",
                        needToBuy: needFlag("土豆")
                    },
                    {
                        name: "胡萝卜",
                        quantity: "1",
                        unit: "根",
                        needToBuy: needFlag("胡萝卜")
                    },
                    {
                        name: "洋葱",
                        quantity: "1/2",
                        unit: "个",
                        needToBuy: needFlag("洋葱")
                    },
                    prefs.spicy ? {
                        name: "辣椒",
                        quantity: "1",
                        unit: "个",
                        needToBuy: needFlag("辣椒")
                    } : {
                        name: "香叶",
                        quantity: "1",
                        unit: "片",
                        needToBuy: false
                    },
                    {
                        name: "盐",
                        quantity: "适量",
                        needToBuy: false
                    },
                    {
                        name: "食用油",
                        quantity: "1",
                        unit: "汤匙",
                        needToBuy: false
                    }
                ],
                steps: [
                    "土豆胡萝卜去皮切块，洋葱切丝",
                    makeNonSpicy("锅中入油，下洋葱与香叶炒香"),
                    "加入土豆胡萝卜翻炒，倒入没过的水小火炖 15-20 分钟",
                    "加盐调味，收汁至粘稠后出锅"
                ],
                tips: addSpicyTip("可加入少量酱油增色"),
                shoppingList: [
                    ...needFlag("土豆") ? [
                        {
                            name: "土豆",
                            quantity: "2",
                            unit: "个"
                        }
                    ] : [],
                    ...needFlag("胡萝卜") ? [
                        {
                            name: "胡萝卜",
                            quantity: "1",
                            unit: "根"
                        }
                    ] : [],
                    ...needFlag("洋葱") ? [
                        {
                            name: "洋葱",
                            quantity: "1/2",
                            unit: "个"
                        }
                    ] : [],
                    ...prefs.spicy && needFlag("辣椒") ? [
                        {
                            name: "辣椒",
                            quantity: "1",
                            unit: "个"
                        }
                    ] : []
                ],
                calories_kcal: approxCalories([
                    "土豆",
                    "胡萝卜",
                    "洋葱",
                    "食用油"
                ])
            });
        }
        if (recipes.length < 2 && has("豆腐")) {
            recipes.push({
                title: prefs.noSpicy ? "清煎豆腐" : "香煎豆腐辣酱",
                time: pickTime(),
                servings,
                ingredients: [
                    {
                        name: "北豆腐",
                        quantity: "1",
                        unit: "块",
                        needToBuy: needFlag("豆腐")
                    },
                    {
                        name: "蒜末",
                        quantity: "1",
                        unit: "瓣",
                        needToBuy: needFlag("大蒜")
                    },
                    {
                        name: "生抽",
                        quantity: "1",
                        unit: "汤匙",
                        needToBuy: false
                    },
                    prefs.spicy ? {
                        name: "辣酱",
                        quantity: "1",
                        unit: "汤匙",
                        needToBuy: needFlag("辣酱")
                    } : {
                        name: "香油",
                        quantity: "1",
                        unit: "茶匙",
                        needToBuy: false
                    },
                    {
                        name: "盐",
                        quantity: "适量",
                        needToBuy: false
                    }
                ],
                steps: [
                    "豆腐切厚片，擦干表面水分",
                    "平底锅热油，中火煎至两面金黄",
                    makeNonSpicy("调入蒜末生抽与香油，翻匀出锅")
                ],
                tips: addSpicyTip("煎豆腐前擦干可防粘并更酥香"),
                shoppingList: [
                    ...needFlag("豆腐") ? [
                        {
                            name: "北豆腐",
                            quantity: "1",
                            unit: "块"
                        }
                    ] : [],
                    ...needFlag("大蒜") ? [
                        {
                            name: "大蒜",
                            quantity: "1",
                            unit: "瓣"
                        }
                    ] : [],
                    ...prefs.spicy && needFlag("辣酱") ? [
                        {
                            name: "辣酱",
                            quantity: "1",
                            unit: "汤匙"
                        }
                    ] : []
                ],
                calories_kcal: approxCalories([
                    "豆腐",
                    "食用油"
                ])
            });
        }
        if (recipes.length < 2 && has("面条")) {
            recipes.push({
                title: "蒜香意面（中式风）",
                time: pickTime(),
                servings,
                ingredients: [
                    {
                        name: "面条",
                        quantity: "200",
                        unit: "g",
                        needToBuy: needFlag("面条")
                    },
                    {
                        name: "蒜末",
                        quantity: "2",
                        unit: "瓣",
                        needToBuy: needFlag("大蒜")
                    },
                    {
                        name: "橄榄油",
                        quantity: "2",
                        unit: "汤匙",
                        needToBuy: false
                    },
                    {
                        name: "盐",
                        quantity: "适量",
                        needToBuy: false
                    },
                    prefs.spicy ? {
                        name: "干辣椒",
                        quantity: "适量",
                        needToBuy: needFlag("辣椒")
                    } : {
                        name: "黑胡椒",
                        quantity: "少许",
                        needToBuy: false
                    }
                ],
                steps: [
                    "面条煮至偏硬捞出",
                    makeNonSpicy("锅中热油，下蒜末与黑胡椒小火炒香"),
                    "倒入面条翻炒，调味后起锅"
                ],
                tips: addSpicyTip("可加西红柿丁提升酸香"),
                shoppingList: [
                    ...needFlag("面条") ? [
                        {
                            name: "面条",
                            quantity: "200",
                            unit: "g"
                        }
                    ] : [],
                    ...needFlag("大蒜") ? [
                        {
                            name: "大蒜",
                            quantity: "2",
                            unit: "瓣"
                        }
                    ] : [],
                    ...prefs.spicy && needFlag("辣椒") ? [
                        {
                            name: "干辣椒",
                            quantity: "适量"
                        }
                    ] : []
                ],
                calories_kcal: approxCalories([
                    "面条",
                    "食用油"
                ])
            });
        }
        if (recipes.length < 2 && has("米饭") && has("鸡蛋")) {
            recipes.push({
                title: "快手蛋炒饭",
                time: "12-15 分钟",
                servings,
                ingredients: [
                    {
                        name: "米饭",
                        quantity: "2",
                        unit: "碗",
                        needToBuy: needFlag("米饭")
                    },
                    {
                        name: "鸡蛋",
                        quantity: "2",
                        unit: "个",
                        needToBuy: needFlag("鸡蛋")
                    },
                    {
                        name: "葱花",
                        quantity: "适量",
                        needToBuy: needFlag("葱")
                    },
                    {
                        name: "盐",
                        quantity: "适量",
                        needToBuy: false
                    },
                    {
                        name: "食用油",
                        quantity: "1",
                        unit: "汤匙",
                        needToBuy: false
                    }
                ],
                steps: [
                    "鸡蛋打散入锅炒至半凝固盛出",
                    "锅中入油，下米饭翻散，加入鸡蛋与葱花翻炒",
                    "加盐调味，出锅前滴少许香油"
                ],
                tips: "隔夜米饭更松散不粘锅",
                shoppingList: [
                    ...needFlag("米饭") ? [
                        {
                            name: "米饭",
                            quantity: "2",
                            unit: "碗"
                        }
                    ] : [],
                    ...needFlag("鸡蛋") ? [
                        {
                            name: "鸡蛋",
                            quantity: "2",
                            unit: "个"
                        }
                    ] : [],
                    ...needFlag("葱") ? [
                        {
                            name: "葱",
                            quantity: "适量"
                        }
                    ] : []
                ],
                calories_kcal: approxCalories([
                    "米饭",
                    "鸡蛋",
                    "食用油"
                ])
            });
        }
        if (recipes.length === 0) {
            recipes.push({
                title: "清炒时蔬拼盘",
                time: pickTime(),
                servings,
                ingredients: [
                    {
                        name: "蔬菜",
                        quantity: "300",
                        unit: "g",
                        needToBuy: needFlag("西兰花") && needFlag("青椒")
                    },
                    {
                        name: "蒜片",
                        quantity: "1",
                        unit: "瓣",
                        needToBuy: needFlag("大蒜")
                    },
                    {
                        name: "盐",
                        quantity: "适量",
                        needToBuy: false
                    },
                    {
                        name: "食用油",
                        quantity: "1",
                        unit: "汤匙",
                        needToBuy: false
                    }
                ],
                steps: [
                    "蔬菜洗净切片",
                    "热锅入油，下蒜片炒香，投入蔬菜大火快炒",
                    "加盐调味，保持脆嫩出锅"
                ],
                tips: addSpicyTip("不吃辣则仅用蒜与葱提升香气"),
                shoppingList: [
                    ...needFlag("大蒜") ? [
                        {
                            name: "大蒜",
                            quantity: "1",
                            unit: "瓣"
                        }
                    ] : []
                ],
                calories_kcal: approxCalories([
                    "蔬菜",
                    "食用油"
                ])
            });
        }
        const data = {
            detectedIngredients: ings.length ? ings : [
                "文本识别的食材"
            ],
            recipes: recipes.slice(0, 2)
        };
        setResult(data);
        setLoading(false);
    };
    const handleAnalyze = async (variant)=>{
        if (images.length === 0 && !inputText.trim()) return;
        if (localMode) {
            await localAnalyze();
            return;
        }
        if (!apiKey || !endpointId) {
            setShowSettings(true);
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    images,
                    text: inputText,
                    apiKey,
                    endpointId,
                    variant: !!variant
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to analyze");
            }
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-3xl space-y-8 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowSettings(!showSettings),
                    className: "flex items-center text-sm text-gray-500 hover:text-orange-600 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                            className: "w-4 h-4 mr-1"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RecipeGenerator.tsx",
                            lineNumber: 302,
                            columnNumber: 13
                        }, this),
                        apiKey && endpointId ? "已配置 API (Doubao)" : "设置豆包 API"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/RecipeGenerator.tsx",
                    lineNumber: 298,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RecipeGenerator.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, this),
            showSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-lg shadow-sm border border-orange-100 animate-in fade-in slide-in-from-top-2 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "火山引擎 API Key"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 311,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: showApiKey ? "text" : "password",
                                        value: apiKey,
                                        onChange: (e)=>setApiKey(e.target.value),
                                        placeholder: "请输入您的火山引擎 API Key",
                                        className: "w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 313,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setShowApiKey(!showApiKey),
                                        className: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none",
                                        children: showApiKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RecipeGenerator.tsx",
                                            lineNumber: 325,
                                            columnNumber: 39
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RecipeGenerator.tsx",
                                            lineNumber: 325,
                                            columnNumber: 72
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 320,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 312,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 310,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "模型接入点 ID (Endpoint ID)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 331,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: endpointId,
                                onChange: (e)=>setEndpointId(e.target.value),
                                placeholder: "例如：ep-20250101010101-abcde",
                                className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 332,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 330,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-500 mt-3 space-y-2 bg-gray-50 p-3 rounded border border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-700",
                                children: "🔍 如何获取？"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 342,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "list-disc list-inside space-y-1 ml-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "登录 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint",
                                                target: "_blank",
                                                className: "underline text-orange-600 font-medium hover:text-orange-700",
                                                children: "火山引擎方舟控制台"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                                lineNumber: 344,
                                                columnNumber: 28
                                            }, this),
                                            "。"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 344,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "确保您已开通 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Doubao-Vision-pro"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                                lineNumber: 345,
                                                columnNumber: 32
                                            }, this),
                                            " (或类似支持视觉的模型)。"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 345,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "复制该模型的 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "接入点 ID (Endpoint ID)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                                lineNumber: 346,
                                                columnNumber: 32
                                            }, this),
                                            "。"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 346,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "在 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey",
                                                target: "_blank",
                                                className: "underline text-orange-600 font-medium hover:text-orange-700",
                                                children: "API Key 管理"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                                lineNumber: 347,
                                                columnNumber: 27
                                            }, this),
                                            " 页面获取 API Key。"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 347,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 343,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 341,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RecipeGenerator.tsx",
                lineNumber: 309,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold mb-6 text-center text-gray-800",
                        children: "1. 输入食材信息"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-500",
                                    children: "当前使用：豆包 API"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RecipeGenerator.tsx",
                                    lineNumber: 358,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "上传图片（可选，可多张）"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 361,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImageUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        onImagesSelect: setImages,
                                        selectedImages: images
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 362,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 360,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "文字描述（可选）"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: inputText,
                                        onChange: (e)=>setInputText(e.target.value),
                                        placeholder: "例如：冰箱里还有一些土豆和胡萝卜，不想吃辣...",
                                        className: "w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none min-h-[100px] resize-y"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 367,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    (images.length > 0 || inputText.trim()) && !result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleAnalyze(),
                            disabled: loading || !apiKey || !endpointId,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all transform hover:scale-105 active:scale-95", loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-orange-200", (!apiKey || !endpointId) && "opacity-50 cursor-not-allowed"),
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-6 h-6 mr-2 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                                        lineNumber: 389,
                                        columnNumber: 29
                                    }, this),
                                    "AI 正在分析中..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 388,
                                columnNumber: 25
                            }, this) : !apiKey || !endpointId ? "请先在上方设置豆包 API" : "生成美味菜谱 🍳"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RecipeGenerator.tsx",
                            lineNumber: 378,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 377,
                        columnNumber: 13
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-100",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 402,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RecipeGenerator.tsx",
                lineNumber: 354,
                columnNumber: 7
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleAnalyze(true),
                                className: "px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium shadow hover:opacity-95",
                                children: "换一批"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 412,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setImages([]);
                                    setInputText("");
                                    setResult(null);
                                    setError(null);
                                },
                                className: "px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300",
                                children: "重新定制美食"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RecipeGenerator.tsx",
                                lineNumber: 418,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 411,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RecipeDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        data: result
                    }, void 0, false, {
                        fileName: "[project]/src/components/RecipeGenerator.tsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RecipeGenerator.tsx",
                lineNumber: 410,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RecipeGenerator.tsx",
        lineNumber: 295,
        columnNumber: 5
    }, this);
}
_s(RecipeGenerator, "BPXyMx90b8gTTJCmyHunsiS1iCM=");
_c = RecipeGenerator;
var _c;
__turbopack_context__.k.register(_c, "RecipeGenerator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_b34680c5._.js.map