const Replicate = require('replicate');
const fs = require('fs');
const https = require('https');
const path = require('path');
const { pipeline } = require('stream/promises');
const { Readable } = require('stream');

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

async function downloadImage(source, filePath) {
    // Check if source is a URL string
    if (typeof source === 'string') {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(filePath);
            https.get(source, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download image: ${response.statusCode} ${response.statusMessage}`));
                    return;
                }
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            }).on('error', (err) => {
                fs.unlink(filePath, () => { });
                reject(err);
            });
        });
    }
    // Check if source is a ReadableStream (Web Streams API)
    else if (source && typeof source.getReader === 'function') {
        const file = fs.createWriteStream(filePath);
        // Create a Node.js readable stream from the Web Stream
        const nodeStream = Readable.fromWeb(source);
        await pipeline(nodeStream, file);
    }
    // Check if source is a Node Readable stream
    else if (source && typeof source.pipe === 'function') {
        const file = fs.createWriteStream(filePath);
        await pipeline(source, file);
    }
    else {
        console.log('Unknown source:', source);
        throw new Error(`Unknown image source type: ${typeof source} - ${Object.prototype.toString.call(source)}`);
    }
}

// STEP 1: Generate Base Image (3:4 Ratio)
async function generateBase() {
    console.log('🚀 Generating 3:4 Base Image...');

    // 1024x1360 for approx 3:4 ratio
    const width = 1024;
    const height = 1360;

    const prompt = `Hyper-realistic vertical photograph of elegant Japanese woman's two hands resting naturally on a white marble desk surface, medium distance shot showing all 10 fingers and wrists of both hands, almond shaped natural nails, soft natural window lighting, realistic skin texture, 8K ultra detailed, photorealistic, professional beauty photography, vertical portrait composition, looking down at hands from above`;

    try {
        const output = await replicate.run(
            "bytedance/seedream-4.5",
            {
                input: {
                    prompt: prompt,
                    width: width,
                    height: height,
                    num_inference_steps: 40,
                    guidance_scale: 4
                }
            }
        );

        console.log('Output received from Replicate');
        const imageSource = Array.isArray(output) ? output[0] : output;

        const filePath = path.join(process.cwd(), 'public', 'hero-base-natural-3-4.png');

        console.log('⬇️  Downloading...');
        await downloadImage(imageSource, filePath);
        console.log('✅ Saved: public/hero-base-natural-3-4.png');
        console.log(`Resolution: ${width}x${height}`);

    } catch (error) {
        console.error('❌ Failed:', error);
    }
}

generateBase();
