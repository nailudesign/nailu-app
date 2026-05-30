const { generateNailImage } = require('./generate-nail-images');

async function regenerateAdultImages() {
    console.log('🚀 Regenerating Coming of Age (Seijin-shiki) Images to match references...');

    // Common composition
    const comp = "medium shot showing both hands, entire hands visible resting on traditional japanese fabric or soft fur, elegant pose, 8k quality, photorealistic";

    const tasks = [
        {
            // Reference 3: Red/White/Gold, 3D flowers, Mizuhiki
            prompt: "Coming of Age (Seijin-shiki) nail design, traditional Japanese Kimono style, bright red and white base, large 3D white flower charms, gold mizuhiki knot art, gold leaf flakes, luxurious and festive, glossy finish, variation 1",
            output: "public/situation-adult-1.png"
        },
        {
            // Reference 1: Navy Blue/White/Silver, Cool tone
            prompt: "Coming of Age (Seijin-shiki) nail design, dark navy blue and white base, large hand-painted blue flowers, silver foil accents, cool and sophisticated, silver wire art, variation 2",
            output: "public/situation-adult-2.png"
        },
        {
            // Reference 2: Purple/Red/Pink, Gold wire ribbons
            prompt: "Coming of Age (Seijin-shiki) nail design, purple and magenta base, Japanese floral pattern (Wagara), gold wire ribbon charms, pearl accents, cute and traditional mix, variation 3",
            output: "public/situation-adult-3.png"
        },
        {
            // Variation: Green/Gold (Classic popular color)
            prompt: "Coming of Age (Seijin-shiki) nail design, deep matcha green and gold base, golden cherry blossoms (Sakura) art, traditional lacquerware style, elegant and mature, variation 4",
            output: "public/situation-adult-4.png"
        },
        {
            // Variation: Modern Black/Gold
            prompt: "Coming of Age (Seijin-shiki) nail design, modern chic style, black and gold gradient, geometric traditional patterns (Asanoha), gold studs, edgy but formal, variation 5",
            output: "public/situation-adult-5.png"
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

    console.log('✅ Coming of Age images regenerated!');
}

regenerateAdultImages();
