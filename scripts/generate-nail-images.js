const fs = require('fs');
const path = require('path');

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
    console.error('Error: REPLICATE_API_TOKEN not found in environment variables');
    console.error('Please set it in your .env.local file or export it:');
    console.error('export REPLICATE_API_TOKEN=your_token_here');
    process.exit(1);
}

/**
 * Generate a nail design image using Seedream 4.5
 */
async function generateNailImage(prompt, outputPath, options = {}) {
    const {
        width = 1024,
        height = 1024,
        guidanceScale = 4.0,
        numInferenceSteps = 40
    } = options;

    console.log(`💅 Generating: ${path.basename(outputPath)}`);
    console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);

    try {
        const apiUrl = 'https://api.replicate.com/v1/models/bytedance/seedream-4.5/predictions';
        const requestBody = {
            input: {
                prompt: prompt,
                width: width,
                height: height,
                guidance_scale: guidanceScale,
                num_inference_steps: numInferenceSteps
            }
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Prefer': 'wait'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        let imageUrl = Array.isArray(data.output) ? data.output[0] : data.output;

        if (imageUrl) {
            console.log(`⬇️  Downloading...`);
            const imageResponse = await fetch(imageUrl);
            const buffer = await imageResponse.arrayBuffer();

            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(outputPath, Buffer.from(buffer));
            console.log(`✅ Saved: ${outputPath}\n`);
            return outputPath;
        }

        throw new Error(`Generation failed: ${JSON.stringify(data)}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}\n`);
        throw error;
    }
}

/**
 * Generate batch of images
 */
async function generateBatch(imageConfigs) {
    console.log(`🚀 Starting batch generation of ${imageConfigs.length} nail images\n`);

    const results = [];
    for (let i = 0; i < imageConfigs.length; i++) {
        const { prompt, outputPath, options } = imageConfigs[i];
        console.log(`[${i + 1}/${imageConfigs.length}]`);

        try {
            const result = await generateNailImage(prompt, outputPath, options);
            results.push(result);
        } catch (error) {
            console.error(`Failed to generate ${outputPath}`);
        }
    }

    console.log(`\n✨ Complete: ${results.length}/${imageConfigs.length} images generated`);
    return results;
}

module.exports = { generateNailImage, generateBatch };
