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

async function generateMask() {
    console.log('🚀 Generating Nail Mask using Segment Anything...');

    const imagePath = path.join(process.cwd(), 'public', 'hero-base-natural-3-4.png');

    if (!fs.existsSync(imagePath)) {
        console.error('❌ Base image not found!');
        return;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    try {
        console.log('Sending request to Segment Anything (pbe/segment-anything)...');

        const output = await replicate.run(
            "pbe/segment-anything",
            {
                input: {
                    image: imageBase64,
                }
            }
        );

        console.log('Output received from SAM');
        console.log('Output:', output);
        // SAM might return an array of mask URLs or a single URL
        const maskUrl = Array.isArray(output) ? output[0] : output;

        const maskPath = path.join(process.cwd(), 'public', 'hero-mask.png');
        console.log('⬇️  Downloading Mask...');
        await downloadImage(maskUrl, maskPath);
        console.log('✅ Saved: public/hero-mask.png');

    } catch (error) {
        console.error('❌ Failed:', error);
    }
}

generateMask();
