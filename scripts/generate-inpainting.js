const Replicate = require('replicate');
const fs = require('fs');
const https = require('https');
const path = require('path');
const { pipeline } = require('stream/promises');
const { Readable } = require('stream');

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

// Reuse robust download logic
async function downloadImage(source, filePath) {
    if (typeof source === 'string') {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(filePath);
            https.get(source, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download image: ${response.statusCode} ${response.statusMessage}`));
                    return;
                }
                response.pipe(file);
                file.on('finish', () => file.close(resolve));
            }).on('error', (err) => {
                fs.unlink(filePath, () => { });
                reject(err);
            });
        });
    } else if (source && typeof source.getReader === 'function') {
        const file = fs.createWriteStream(filePath);
        await pipeline(Readable.fromWeb(source), file);
    } else if (source && typeof source.pipe === 'function') {
        const file = fs.createWriteStream(filePath);
        await pipeline(source, file);
    } else {
        throw new Error(`Unknown image source type`);
    }
}

// Convert file to base64
function fileToBase64(filePath) {
    const bitmap = fs.readFileSync(filePath);
    return `data:image/png;base64,${bitmap.toString('base64')}`;
}

const styles = [
    {
        name: 'cheek',
        prompt: "cheek nail design with soft coral pink gradient radiating from center like blushed cheeks, glossy finish, cute, high quality, 8k, photorealistic",
        filename: 'hero-after-cheek-inpainted.png'
    },
    {
        name: 'glass',
        // CORRECTED PROMPT: Shattered glass / holographic flakes
        prompt: "Glass French manicure, sheer milky pink base, tips are densely covered in silver holographic shattered glass flakes and chunky glitter, sharp french smile line, highly reflective and sparkly, cut-glass texture on tips, elegant Japanese nail art, 8k quality, photorealistic",
        // Using "correct" filename to match page.tsx update
        filename: 'hero-after-glass-french-correct.png'
    },
    {
        name: 'nuance',
        prompt: "nuance nail design with soft muted colors mixed in watercolor marble effect, pale beige and dusty mauve, artistic, high quality, 8k, photorealistic",
        filename: 'hero-after-nuance-inpainted.png'
    },
    {
        name: 'ribbon',
        prompt: "ribbon nail design with sheer pink base and delicate 3D white ribbon charms, cute kawaii style, high quality, 8k, photorealistic",
        filename: 'hero-after-ribbon-inpainted.png'
    }
];

async function generateInpainting() {
    console.log('🚀 Starting True Inpainting Generation (Full Hand Composition)...');

    const basePath = path.join(process.cwd(), 'public', 'hero-base-natural-3-4.png');
    const maskPath = path.join(process.cwd(), 'public', 'hero-mask.png');

    if (!fs.existsSync(basePath) || !fs.existsSync(maskPath)) {
        console.error('❌ Missing base image or mask!');
        return;
    }

    const imageBase64 = fileToBase64(basePath);
    const maskBase64 = fileToBase64(maskPath);

    for (const style of styles) {
        console.log(`\n💅 Generating: ${style.name}...`);
        try {
            // Attempting to use Seedream 4.5
            const output = await replicate.run(
                "bytedance/seedream-4.5",
                {
                    input: {
                        prompt: style.prompt,
                        image: imageBase64,
                        mask: maskBase64,
                        num_inference_steps: 40,
                        guidance_scale: 7.5,
                        negative_prompt: "bad anatomy, ugly, deformed, extra fingers, missing fingers, smooth chrome, matte, low quality",
                        width: 1024,
                        height: 1360
                    }
                }
            );

            console.log('Output received.');
            const imageUrl = Array.isArray(output) ? output[0] : output;

            const outputPath = path.join(process.cwd(), 'public', style.filename);
            console.log('⬇️  Downloading...');
            await downloadImage(imageUrl, outputPath);
            console.log(`✅ Saved: public/${style.filename}`);

        } catch (error) {
            console.error(`❌ Failed ${style.name}:`, error);
        }
    }
}

generateInpainting();
