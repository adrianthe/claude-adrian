// Install whisper.cpp + model sekali. Jalankan: npm run whisper:install
import { downloadWhisperModel, installWhisperCpp } from "@remotion/install-whisper-cpp";
import { WHISPER_MODEL, WHISPER_PATH, WHISPER_VERSION } from "./whisper-config.ts";

await installWhisperCpp({ to: WHISPER_PATH, version: WHISPER_VERSION });
await downloadWhisperModel({ model: WHISPER_MODEL, folder: WHISPER_PATH });
console.log("whisper.cpp + model", WHISPER_MODEL, "siap di", WHISPER_PATH);
