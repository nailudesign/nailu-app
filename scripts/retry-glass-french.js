const Replicate = require('replicate');
const fs = require('fs');
const https = require('https');
const path = require('path');

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

async function downloadImage(url, filePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
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

async function generate() {
    console.log('🔄 Retrying Glass French with simplified prompt...');

    const prompt = `Hyper-realistic close-up photograph of elegant Japanese woman's hands resting on white marble desk, almond shaped nails with elegant French manicure, sheer pink base with shiny silver tips, glossy reflective edge finish, soft natural lighting, shallow depth of field, 8K quality, photorealistic studio photography`;

    try {
        const output = await replicate.run(
            "bytedance/seedream-4.5",
            {
                input: {
                    prompt: prompt,
                    width: 1024,
                    height: 1024,
                    num_inference_steps: 40,
                    guidance_scale: 4
                }
            }
        );

        const imageUrl = output[0];
        const filePath = path.join(process.cwd(), 'public', 'hero-after-glass-french-v2.png');

        console.log('⬇️  Downloading...');
        await downloadImage(imageUrl, filePath);
        console.log('✅ Saved: hero-after-glass-french-v2.png');

    } catch (error) {
        console.error('❌ Failed:', error.message);
    }
}

generate();
