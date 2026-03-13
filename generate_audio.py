import re
import os
import subprocess

md_file = "video_composition.md"
output_dir = "public/audio"

os.makedirs(output_dir, exist_ok=True)

with open(md_file, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to find: **台本**: 「...」
pattern = r"\*\*台本\*\*:\s*「(.*?)」"
matches = re.finditer(pattern, content)

for i, match in enumerate(matches, 1):
    text = match.group(1).strip()
    print(f"Scene {i}: {text}")
    
    output_file = os.path.join(output_dir, f"scene{i}.mp3")
    
    # Generate TTS using edge-tts (Nanami is a good female voice, Keita is male. Let's use Nanami)
    cmd = [
        "edge-tts",
        "--voice", "ja-JP-NanamiNeural",
        "--rate=-15%",
        "--text", text,
        "--write-media", output_file
    ]
    
    print(f"Generating {output_file}...")
    subprocess.run(cmd, check=True)
    
print("Done generating audio files.")
