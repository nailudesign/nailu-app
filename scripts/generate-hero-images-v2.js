const { generateBatch } = require('./generate-nail-images');

// ============================================================
// HYPER-REALISTIC HERO BEFORE/AFTER IMAGES
// Strategy: Generate base image first, then use explicit prompts
// to maintain consistency across all nail style variations
// ============================================================

// Common reference description for consistency
const baseReference = `Hyper-realistic close-up photograph of elegant Japanese woman's hands resting naturally on a white marble desk surface, almond shaped nails, fingers gracefully curved with thumb slightly visible, soft natural window lighting from the left side creating gentle shadows, shallow depth of field with creamy bokeh background, realistic skin texture with visible pores and natural skin tone, professional studio photography, 8K quality, ultra detailed, photorealistic`;

// PHASE 1: Base Image (Natural Nails)
const baseImage = {
    prompt: `${baseReference}, completely natural bare nails with no polish no manicure no decoration, clean healthy nail beds, short to medium length natural nails`,
    outputPath: "public/hero-base-natural-v2.png",
    options: { width: 1024, height: 1024 }
};

// PHASE 2: Nail Style Images
// Each prompt explicitly states to keep EVERYTHING the same except nails
const styleImages = [
    // Cheek Nails
    {
        prompt: `${baseReference}, cheek nail design with soft coral pink gradient radiating from the center of each nail like blushed cheeks, sheer translucent base with concentrated color in the middle, glossy reflective finish, cute feminine aesthetic. IMPORTANT: Keep the EXACT same hand position, EXACT same camera angle, EXACT same lighting, EXACT same marble background. ONLY the nail design is different.`,
        outputPath: "public/hero-after-cheek-v2.png",
        options: { width: 1024, height: 1024 }
    },

    // Glass French (Corrected: silver shiny tips like glass/mirror)
    {
        prompt: `${baseReference}, glass French manicure with transparent pink base and silver metallic chrome tips that reflect light like glass mirror, shiny reflective finish on nail edges only, French manicure style with mirror-like chrome tips. IMPORTANT: Keep the EXACT same hand position, EXACT same camera angle, EXACT same lighting, EXACT same marble background. ONLY the nail design is different.`,
        outputPath: "public/hero-after-glass-french-v2.png",
        options: { width: 1024, height: 1024 }
    },

    // Nuance (Corrected: soft muted mixed colors, not strong)
    {
        prompt: `${baseReference}, nuance nail design with multiple soft muted colors gently blending together - pale beige dusty mauve and light gray mixed in watercolor marble effect, subtle pastel tones not strong colors, artistic understated aesthetic like watercolor painting. IMPORTANT: Keep the EXACT same hand position, EXACT same camera angle, EXACT same lighting, EXACT same marble background. ONLY the nail design is different.`,
        outputPath: "public/hero-after-nuance-v2.png",
        options: { width: 1024, height: 1024 }
    },

    // Ribbon
    {
        prompt: `${baseReference}, ribbon nail design with sheer baby pink base and delicate 3D white ribbon charms as accents on some nails, tiny pearl decorations, gentle pastel pink colors, kawaii cute girly aesthetic. IMPORTANT: Keep the EXACT same hand position, EXACT same camera angle, EXACT same lighting, EXACT same marble background. ONLY the nail design is different.`,
        outputPath: "public/hero-after-ribbon-v2.png",
        options: { width: 1024, height: 1024 }
    }
];

// Generate all images
const allImages = [baseImage, ...styleImages];

console.log('🎨 HYPER-REALISTIC HERO BEFORE/AFTER IMAGE GENERATION');
console.log('======================================================');
console.log('');
console.log('Strategy:');
console.log('1. Generate hyper-realistic base image (natural nails)');
console.log('2. Generate 4 nail style images with explicit consistency prompts');
console.log('3. Each prompt says: "Keep EXACT same hand/angle/lighting, ONLY change nails"');
console.log('');
console.log(`Total images to generate: ${allImages.length}`);
console.log('');
console.log('Starting generation...');
console.log('');

generateBatch(allImages)
    .then(results => {
        console.log('\n✅ GENERATION COMPLETE!');
        console.log(`\n📋 Successfully generated ${results.length}/${allImages.length} images:`);

        console.log('\n📸 BASE IMAGE (Before):');
        console.log('  • hero-base-natural-v2.png');

        console.log('\n💅 AFTER IMAGES (4 styles):');
        console.log('  • hero-after-cheek-v2.png (coral pink gradient)');
        console.log('  • hero-after-glass-french-v2.png (silver mirror tips)');
        console.log('  • hero-after-nuance-v2.png (soft mixed colors)');
        console.log('  • hero-after-ribbon-v2.png (pink with ribbon charms)');

        console.log('\n🔄 Next steps:');
        console.log('  1. Check public/ folder for new v2 images');
        console.log('  2. Compare images for consistency');
        console.log('  3. Update page.tsx to use new images');
    })
    .catch(error => {
        console.error('\n❌ Generation failed:', error);
        process.exit(1);
    });
