const { generateNailImage } = require('./generate-nail-images');

async function regenerateNuanceImages() {
    console.log('🚀 Regenerating Nuance Nail Images with HYPER-REALISM focus...');

    // UPDATED COMPOSITION: Strict realism constraints
    // Focus on "Photograph", "Japanese Model", "Real Skin", removing "Artistic" keywords from the general composition.
    const comp = "photographed on the hands of a young Japanese female model, hyper realistic skin texture, intricate hand details, soft natural window light, shot on Sony A7R IV, 85mm macro lens, depth of field, neutral blurred background, 8k resolution, raw photo style, absolutely photorealistic";

    const tasks = [
        {
            // Amber/Tortoise
            prompt: "Nuance nail art design, glossy amber and brown tortoise shell pattern (Bekko) on finger nails, translucent ink layer effect with gold metallic rim",
            output: "public/situation-nuance-1.png"
        },
        {
            // Pink/Shell
            prompt: "Nuance nail art design, pale pink and milky beige marble pattern on finger nails, crushed white shell parts and gold wire accents, elegant kami-nail style",
            output: "public/situation-nuance-2.png"
        },
        {
            // Blue/Orange Ink
            prompt: "Nuance nail art design, sheer watercolor ink bleed art on finger nails, dusty blue and orange blend with grey wisps, gold metallic irregular lining on tips",
            output: "public/situation-nuance-3.png"
        },
        {
            // Mauve/Mirror
            prompt: "Nuance nail art design, sheer dusty mauve and pink jelly base on finger nails, irregular liquid gold mirror powder on tips, translucent finish",
            output: "public/situation-nuance-4.png"
        },
        {
            // Greige/Sand
            prompt: "Nuance nail art design, sophisticated greige and sand texture on finger nails, mixture of matte and glossy finishes, gold foil flakes",
            output: "public/situation-nuance-5.png"
        }
    ];

    console.log(`Prepared ${tasks.length} regeneration tasks.`);

    for (const task of tasks) {
        console.log(`Generating: ${task.output}`);
        try {
            await generateNailImage(`${task.prompt}, ${comp}`, task.output, { width: 1024, height: 1360 });
        } catch (error) {
            console.error(`Failed to generate ${task.output}:`, error.message);
        }
    }

    console.log('✅ Nuance images regenerated with REALISM focus!');
}

regenerateNuanceImages();
