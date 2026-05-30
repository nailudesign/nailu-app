const { generateNailImage } = require('./generate-nail-images');

async function regenerateSubcultureImages() {
    console.log('🚀 Regenerating Subculture (Jirai-kei) Images to match reference...');

    // Refined prompt based on user's "like this image" request
    // Focus: Black ribbons, cross/lace-up patterns, heart parts, glittery black/grey base, flashy stones.
    const basePrompt = "Jirai-kei (Landmine) nail design, long pointed oval shape, black 3D ribbon charms, large clear heart parts with silver chains, glittery dark grey and black base, cross lace-up art on ring finger, gothic cute aesthetic, rhinestone encrusted, highly detailed, photorealistic, 8k, Japanese trend";

    const comp = "medium shot showing both hands, entire hands visible resting on lace fabric or fluffy texture, elegant pose";

    const tasks = [];
    for (let i = 1; i <= 5; i++) {
        let variation = "";
        if (i === 1) variation = "heavily decorated with black ribbons and hearts";
        if (i === 2) variation = "focus on cross lace-up pattern and silver chains";
        if (i === 3) variation = "pink and black mix with large bling parts";
        if (i === 4) variation = "dark grey glitter base with big ribbon";
        if (i === 5) variation = "holding a black lace accessory, detailed thumb art";

        tasks.push({
            prompt: `${basePrompt}, ${variation}, ${comp}`,
            output: `public/situation-subculture-${i}.png`
        });
    }

    console.log(`Prepared ${tasks.length} regeneration tasks.`);

    for (const task of tasks) {
        console.log(`Generating: ${task.output}`);
        try {
            await generateNailImage(task.prompt, task.output, { width: 1024, height: 1360 });
        } catch (error) {
            console.error(`Failed to generate ${task.output}:`, error.message);
        }
    }

    console.log('✅ Subculture images regenerated!');
}

regenerateSubcultureImages();
