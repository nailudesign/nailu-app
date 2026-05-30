const { generateNailImage } = require('./generate-nail-images');

async function generateGlassGallery() {
    console.log('🚀 Generating Corrected Glass French Gallery Images...');

    // Base prompt for the correct style (Medium Shot, Two Hands)
    const baseStyle = "Glass French manicure nail design, sheer milky pink base, tips are densely covered in silver holographic shattered glass flakes and chunky glitter, sharpened french smile line, highly reflective, cut-glass texture, elegant Japanese nail art, 8k quality, photorealistic, medium shot showing both hands, entire hands visible resting on table";

    const images = [
        {
            prompt: `${baseStyle}, full view of both hands, clear focus on the fingernails`,
            output: "public/gallery-glass-french-1.png",
        },
        {
            prompt: `${baseStyle}, hand holding a clear perfume bottle, elegant pose, soft lighting, sparkly fingertips`,
            output: "public/gallery-glass-french-2.png",
        },
        {
            prompt: `${baseStyle}, with a delicate 3D silver ribbon charm on the ring finger, cute and elegant accent`,
            output: "public/gallery-glass-french-ribbon.png",
        },
        {
            prompt: `${baseStyle}, sunlight hitting the nails causing rainbow holographic reflections from the silver tips`,
            output: "public/gallery-glass-french-sunlight.png",
        },
        {
            prompt: `${baseStyle}, hand resting on white fur, soft and luxurious atmosphere`,
            output: "public/gallery-glass-french-fur.png",
        }
    ];

    console.log(`Generating ${images.length} images...`);

    for (const img of images) {
        try {
            await generateNailImage(img.prompt, img.output, { width: 1024, height: 1360 }); // Vertical for gallery
        } catch (e) {
            console.error(`Failed ${img.output}:`, e.message);
        }
    }

    console.log('✅ Gallery generation complete!');
}

generateGlassGallery();
