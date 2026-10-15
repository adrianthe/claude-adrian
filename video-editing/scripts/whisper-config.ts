import path from "node:path";

export const WHISPER_PATH = path.resolve(import.meta.dirname, "../whisper.cpp");
export const WHISPER_VERSION = "1.5.5";
// Model multilingual (bukan .en) karena audio bahasa Indonesia.
export const WHISPER_MODEL = "medium" as const;
