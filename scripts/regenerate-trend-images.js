const { generateNailImage } = require('./generate-nail-images');

async function regenerateTrendImages() {
    console.log('🚀 Regenerating Trend (Magnet/Cat Eye) Images with HYPER-REALISM focus...');

    // UPDATED COMPOSITION: Strict realism, NO face, hands only
    const comp = "photographed on the hands of a young Japanese female model, hyper realistic skin texture, intricate hand details, soft natural window light, shot on Sony A7R IV, 85mm macro lens, depth of field, neutral blurred background, 8k resolution, raw photo style, absolutely photorealistic, medium shot showing both hands resting on table, elegant hand pose, no face visible";

    const tasks = [
        {
            // Reference 1: Brown/Bronze Magnet
            prompt: "Magnet nail design (Cat Eye Gel), deep bronze brown color, shifting magnetic shimmer effect, glossy wet look, square oval shape, simple one color but high depth",
            output: "public/situation-trend-1.png"
        },
        {
            // Reference 2: Pink/Beige Sheer Magnet
            prompt: "Magnet nail design, sheer pink beige color, soft silky velvet finish, magnetic particle shimmer, pointed almond shape, elegant and feminine",
            output: "public/situation-trend-2.png"
        },
        {
            // Variation: Greige/Silver (Popular Magnet)
            prompt: "Magnet nail design, silver textured cat eye effect on greige base, metallic shine, diagonal light reflection, cool tone, stylish adult look",
            output: "public/situation-trend-3.png"
        },
        {
            // Variation: Rose Gold/Pink (Wanghong style)
            prompt: "Magnet nail design, rose gold shimmer, 'ururu' wet look, butterfly parts accent, Korean/Chinese trend (Wanghong) style, glittering finish",
            output: "public/situation-trend-4.png"
        },
        {
            // Variation: Deep Purple/Galaxy
            prompt: "Magnet nail design, deep mystery purple, galaxy magnetic effect, starry shimmer, rich depth, evening luxury style",
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

    console.log('✅ Trend (Magnet) images regenerated with REALISM focus!');
}

regenerateTrendImages();
