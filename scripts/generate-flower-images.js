const { generateNailImage } = require('./generate-nail-images');

async function generateFlowerImages() {
    console.log('🚀 Generating Botanical / Pressed Flower Nail Images...');

    // Composition: Hyper-realistic, young Japanese hands, no face
    const comp = "photographed on the hands of a young Japanese female model, hyper realistic skin texture, intricate hand details, soft natural window light, shot on Sony A7R IV, 85mm macro lens, depth of field, neutral blurred background, 8k resolution, raw photo style, absolutely photorealistic, medium shot showing both hands resting on natural linen or wood texture, elegant hand pose, no face visible";

    const tasks = [
        {
            // Reference: Clear/Beige with colorful small flowers
            prompt: "Pressed flower nail design (Oshibana), sheer milky beige base, delicate colorful small dried flowers (blue, pink, yellow) scattered on nails, gold wire stems, botanical garden style, natural and cute",
            output: "public/gallery-flower-1.png"
        },
        {
            // Variation: Pink Base + Wreath
            prompt: "Pressed flower nail design, sheer pink base, small flower wreath (circle) pattern on ring finger, tiny pearl accents, romantic spring style, soft and feminine",
            output: "public/gallery-flower-2.png"
        },
        {
            // Variation: Yellow/Mimosa
            prompt: "Pressed flower nail design, mimosa flower theme, yellow dry flowers and green leaves, clear gel base, fresh spring look, botanical art",
            output: "public/gallery-flower-3.png"
        },
        {
            // Variation: French + Flower
            prompt: "Pressed flower nail design, clear french tip with embedded dry flowers, nude pink base, gold glitter edge line, sophisticated botanical style",
            output: "public/gallery-flower-4.png"
        },
        {
            // Variation: Bouquet
            prompt: "Pressed flower nail design, small flower bouquet art tied with gold wire ribbon, sheer white base, antique botanical book aesthetic, detailed and delicate",
            output: "public/gallery-flower-5.png"
        }
    ];

    console.log(`Prepared ${tasks.length} generation tasks.`);

    for (const task of tasks) {
        console.log(`Generating: ${task.output}`);
        try {
            await generateNailImage(`${task.prompt}, ${comp}`, task.output, { width: 1024, height: 1360 });
        } catch (error) {
            console.error(`Failed to generate ${task.output}:`, error.message);
        }
    }

    console.log('✅ Flower/Botanical images generated!');
}

generateFlowerImages();
