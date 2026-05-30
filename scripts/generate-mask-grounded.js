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

async function generateGroundedMask() {
    console.log('🚀 Generating Accurate Nail Mask using Grounded SAM...');

    const imagePath = path.join(process.cwd(), 'public', 'hero-base-natural-3-4.png');

    if (!fs.existsSync(imagePath)) {
        console.error('❌ Base image not found!');
        return;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    try {
        console.log('Sending request to Grounded-Segment-Anything...');
        // Using a reliable Grounded SAM model on Replicate
        // "idea-research/grounded-segment-anything" or similar
        // Since strict versioning often fails, I'll try to let SDK resolve or use a known one if found.
        // Let's try "idea-research/grounded-segment-anything" first (no version).

        const output = await replicate.run(
            "idea-research/grounded-segment-anything",
            {
                input: {
                    image: imageBase64,
                    text_prompt: "fingernails", // The magic of Grounded SAM
                    mask_threshold: 0.3,
                }
            }
        );

        console.log('Output received from Grounded SAM');
        console.log(output);

        // Grounded SAM typically returns: [ { mask: 'url', label: 'fingernails', ... } ] or similar JSON
        // Or sometimes just a mask image if simplified.
        // Let's inspect structure on failure if needed, but usually we look for the mask.

        // If output is an array of objects, we need to extract masks and combine them?
        // Or maybe it returns a single combined mask?

        // In many Replicate implementations, it returns a list of masks.
        // We'll assume for now we want the first mask or need to handle output.
        // Actually, for inpainting we need a SINGLE black/white mask.

        // If "idea-research/grounded-segment-anything" is complex, let's try a simpler wrapper if exists.
        // Fallback: Use `cjwbw/clipseg` again? It failed before.

        // Let's stick to Grounded SAM but handle array output.
        // If it returns multiple masks, we might need to merge them locally or pick one.
        // For simplicity, let's assume it returns a combined mask or check output type.

        let maskUrl;
        if (Array.isArray(output) && output.length > 0 && output[0].mask) {
            // Array of detection objects
            console.log("Received detection objects. Using first mask (might need merging if separate fingers).");
            maskUrl = output[0].mask;
            // Note: ideally we merge all masks labeled 'fingernails'. 
            // But let's see if it returns a single merged image first.
        } else if (typeof output === 'string') {
            maskUrl = output;
        } else if (Array.isArray(output) && typeof output[0] === 'string') {
            maskUrl = output[0];
        } else {
            console.log("Unknown output format:", output);
            // Fallback attempt
            maskUrl = output.mask || output;
        }

        const maskPath = path.join(process.cwd(), 'public', 'hero-mask.png');
        console.log('⬇️  Downloading Mask...');
        await downloadImage(maskUrl, maskPath);
        console.log('✅ Saved: public/hero-mask.png');

    } catch (error) {
        console.error('❌ Failed:', error);
        // Fallback: Generate Dummy Mask
        console.log('⚠️ Falling back to Dummy Mask...');
        const { createDummyMask } = require('./generate-dummy-mask'); // We'll need to export this
        // Actually, easier to just spawn the dummy script
        const { exec } = require('child_process');
        exec('node scripts/generate-dummy-mask.js', (err, stdout, stderr) => {
            if (err) console.error(err);
            console.log(stdout);
        });
    }
}

generateGroundedMask();
