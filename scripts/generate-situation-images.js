const { generateNailImage } = require('./generate-nail-images');

async function generateSituationImages() {
    console.log('🚀 Generating Situation Finder Images (30 Total)...');

    // Common suffix for composition - strictly avoiding podiums and pedestals
    const comp = "photorealistic medium shot of a real human woman's hands, hands resting gracefully on a soft textured surface, focus on nails, 8k quality, extremely detailed, absolutely NO podiums, NO pedestals, NO frames, NO circles";

    const categories = [
        {
            id: 'wedding',
            basePrompt: "Wedding nail design, classic white bridal nails, pearl accents, elegant lace lace layout, ring finger accent, holding bouquet or ring, soft white lighting",
        },
        {
            id: 'office',
            basePrompt: "Office nail design, natural milk beige or greige, clean short-medium oval nails, simple one-color or skinny french, professional office setting, clean and sophisticated",
        },
        {
            id: 'subculture',
            basePrompt: "Jirai-kei (Landmine) nail design, black and pink coloring, large 3D ribbon charms, heart stones, tweed pattern, gothic cute aesthetic, lace details, dolly style",
        },
        {
            id: 'adult',
            basePrompt: "Coming of Age (Seijin-shiki) nail design, Japanese Kimono style traditional patterns, gold foil, water mizuhiki knots, red and gold or purple colors, ornate and festive",
        },
        {
            id: 'trend',
            basePrompt: "Wanghong (Chinese trend) or Korean nail design, sheer pink beams, aurora powder, butterfly parts, diamond cut stones, flashy but translucent, trendy",
        },
        {
            id: 'nuance',
            basePrompt: "Nuance nail design, brown/terra-cotta/greige marble, gold flakes, uneven surface, artistic abstract painting style, adult subtle look",
        }
    ];

    const tasks = [];

    for (const cat of categories) {
        for (let i = 1; i <= 5; i++) {
            const prompt = `${cat.basePrompt}, variation ${i}, ${comp}`;
            const filename = `public/situation-${cat.id}-${i}.png`;

            // Add slight variation words to ensure diversity
            let variation = "";
            if (i === 2) variation = "close-up focus on texture";
            if (i === 3) variation = "holding a matching accessory";
            if (i === 4) variation = "soft sunlight lighting";
            if (i === 5) variation = "slightly different angle";

            tasks.push({
                prompt: `${prompt}, ${variation}`,
                output: filename
            });
        }
    }

    console.log(`Prepared ${tasks.length} generation tasks.`);

    // Run sequentially (or strictly limited parallel) to avoid rate limits
    // generateNailImage handles one at a time usually

    // We'll run them in chunks of 2 to speed up but be safe
    const chunkSize = 2;
    for (let i = 0; i < tasks.length; i += chunkSize) {
        const chunk = tasks.slice(i, i + chunkSize);
        await Promise.all(chunk.map(task => {
            console.log(`Generating: ${task.output}`);
            return generateNailImage(task.prompt, task.output, { width: 1024, height: 1360 })
                .catch(e => console.error(`Failed ${task.output}:`, e.message));
        }));
    }

    console.log('✅ All Situation images generated!');
}

generateSituationImages();
