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

async function testInstruct() {
    console.log('🚀 Testing InstructPix2Pix for Cheek Nails...');

    // Use the 3:4 base image
    const imagePath = path.join(process.cwd(), 'public', 'hero-base-natural-3-4.png');

    if (!fs.existsSync(imagePath)) {
        console.error('❌ Base image not found!');
        return;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    try {
        // InstructPix2Pix: "timbrooks/instruct-pix2pix"
        // Omitting version hash to let SDK resolve
        console.log('Sending request to InstructPix2Pix...');

        const output = await replicate.run(
            "timbrooks/instruct-pix2pix",
            {
                input: {
                    image: imageBase64,
                    prompt: "paint the fingernails with a cheek nail design, soft pink gradient like blush",
                    image_guidance_scale: 1.5,
                    guidance_scale: 7.5
                }
            }
        );

        console.log('Output received from InstructPix2Pix');
        console.log('Output:', output);
        const imageUrl = Array.isArray(output) ? output[0] : output;

        const outputPath = path.join(process.cwd(), 'public', 'hero-after-cheek-instruct.png');
        console.log('⬇️  Downloading...');
        await downloadImage(imageUrl, outputPath);
        console.log('✅ Saved: public/hero-after-cheek-instruct.png');

    } catch (error) {
        console.error('❌ Failed:', error);
    }
}

testInstruct();
