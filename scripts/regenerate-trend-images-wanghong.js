const { generateNailImage } = require('./generate-nail-images');

async function regenerateTrendWanghongImages() {
    console.log('🚀 Regenerating Trend Images to WANGHONG / KOREAN Style (Removing Cat Eye)...');

    // Composition: Hyper-realistic, young Japanese hands, no face
    const comp = "photographed on the hands of a young Japanese female model, hyper realistic skin texture, intricate hand details, soft natural window light, shot on Sony A7R IV, 85mm macro lens, depth of field, neutral blurred background, 8k resolution, raw photo style, absolutely photorealistic, medium shot showing both hands resting on table, elegant hand pose, no face visible";

    const tasks = [
        {
            // Wanghong Classic: Sheer Pink + Butterfly
            prompt: "Wanghong nail design (Korean Trend), sheer translucent pink base color, large crystal butterfly charm on ring finger, glossy 'churun' finish, high quality glass stones, diamond accent",
            output: "public/situation-trend-1.png"
        },
        {
            // Wanghong Blue: Ice Blue + Chain
            prompt: "Wanghong nail design, icy blue gradient (ombre), silver chain hanging charms, large heart crystal part, cool and transparent look, K-pop idol style",
            output: "public/situation-trend-2.png"
        },
        {
            // Wanghong Cheek: Peach + Aurora
            prompt: "Wanghong nail design, peach cheek nail (blush nails), aurora powder overlay, glowing iridescent finish, simple but flashy, ururu water texture",
            output: "public/situation-trend-3.png"
        },
        {
            // Wanghong White: Milky + Pearls
            prompt: "Wanghong nail design, milky white sheer base, pearl rim accents, quilted texture art (matelasse), coquette aesthetic, elegant and cute",
            output: "public/situation-trend-4.png"
        },
        {
            // Wanghong Black: Sheer Black + Cross
            prompt: "Wanghong nail design, sheer black tint (stocking color), silver cross parts, rhinestone encrusted tip, gothic but cute, korean darker style",
            output: "public/situation-trend-5.png"
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

    console.log('✅ Trend images regenerated to Wanghong style!');
}

regenerateTrendWanghongImages();
