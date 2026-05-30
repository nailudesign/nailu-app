const { generateNailImage } = require('./generate-nail-images');

async function generateCheekGallery() {
    console.log('🚀 Generating Corrected Cheek Nail Gallery Images...');

    // Base prompt for the correct style (Jelly Blush + Skinny French, Full Hands)
    const baseStyle = "Cheek nail design (Chiikuneiru), translucent sheer syrup gel texture, soft concentrated coral-pink blush gradient in the center of the nail, glossy jelly finish, delicate silver glitter skinny french tip line at the very edge, elegant Japanese nail art, 8k quality, photorealistic, medium shot showing both hands, entire hands visible resting on table";

    const images = [
        {
            prompt: `${baseStyle}, full view of two hands, elegant pose highlighting the nails`,
            output: "public/gallery-cheek-skinny-french.png",
        },
        {
            prompt: `${baseStyle}, with a tiny white pearl accent on the blush center, minimalist and cute`,
            output: "public/gallery-cheek-pearl.png",
        },
        {
            prompt: `${baseStyle}, with a small holographic heart sequin on the ring finger, kawaii style`,
            output: "public/gallery-cheek-heart.png",
        },
        {
            prompt: `${baseStyle}, hand holding a glass of peach soda, soft lighting, lifestyle shot`,
            output: "public/gallery-cheek-lifestyle.png",
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

    console.log('✅ Cheek Gallery generation complete!');
}

generateCheekGallery();
