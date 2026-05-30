const { generateBatch } = require('./generate-nail-images');

// STRATEGY: Generate Before image first, then use extremely detailed prompts
// for After images to match as closely as possible

// BEFORE Image - This will be our reference
const beforeImage = {
    prompt: "Professional close-up photograph of elegant Japanese woman's hands, almond shaped natural bare nails with no polish or decoration, hands resting naturally on white marble desk surface, fingers slightly curved in relaxed pose, soft natural window lighting from left side creating gentle shadows, minimalist aesthetic, shallow depth of field with blurred background, realistic skin texture with visible pores and natural skin tone, 8K quality, ultra detailed, photorealistic, studio photography",
    outputPath: "public/hero-before-reference.png",
    options: { width: 1024, height: 1024 }
};

// AFTER Images - Matching the Before image exactly but with nail designs
// Using seed consistency and detailed matching descriptions
const afterImages = [
    // Cheek Nails
    {
        prompt: "Professional close-up photograph of elegant Japanese woman's hands, almond shaped nails with cheek nail design (sheer pink base with soft coral gradient at center like blushed cheeks, glossy finish), hands resting naturally on white marble desk surface in exact same position, fingers slightly curved in relaxed pose, soft natural window lighting from left side creating gentle shadows, minimalist aesthetic, shallow depth of field with blurred background, realistic skin texture with visible pores and natural skin tone, same lighting and composition as reference, 8K quality, ultra detailed, photorealistic, studio photography",
        outputPath: "public/hero-after-cheek-perfect.png",
        options: { width: 1024, height: 1024 }
    },

    // Glass French
    {
        prompt: "Professional close-up photograph of elegant Japanese woman's hands, almond shaped nails with glass French manicure (sheer transparent nude pink base with glossy white tips, reflective glass-like finish), hands resting naturally on white marble desk surface in exact same position, fingers slightly curved in relaxed pose, soft natural window lighting from left side creating gentle shadows, minimalist aesthetic, shallow depth of field with blurred background, realistic skin texture with visible pores and natural skin tone, same lighting and composition as reference, 8K quality, ultra detailed, photorealistic, studio photography",
        outputPath: "public/hero-after-glass-french-perfect.png",
        options: { width: 1024, height: 1024 }
    },

    // Nuance
    {
        prompt: "Professional close-up photograph of elegant Japanese woman's hands, almond shaped nails with nuance design (soft beige and cream marble swirls, subtle brown watercolor effect with tiny gold flakes, muted neutral colors), hands resting naturally on white marble desk surface in exact same position, fingers slightly curved in relaxed pose, soft natural window lighting from left side creating gentle shadows, minimalist aesthetic, shallow depth of field with blurred background, realistic skin texture with visible pores and natural skin tone, same lighting and composition as reference, 8K quality, ultra detailed, photorealistic, studio photography",
        outputPath: "public/hero-after-nuance-perfect.png",
        options: { width: 1024, height: 1024 }
    },

    // Ribbon
    {
        prompt: "Professional close-up photograph of elegant Japanese woman's hands, almond shaped nails with ribbon nail design (sheer baby pink base with delicate 3D white ribbon charms on accent nails, tiny pearls, gentle pastel colors), hands resting naturally on white marble desk surface in exact same position, fingers slightly curved in relaxed pose, soft natural window lighting from left side creating gentle shadows, minimalist aesthetic, shallow depth of field with blurred background, realistic skin texture with visible pores and natural skin tone, same lighting and composition as reference, 8K quality, ultra detailed, photorealistic, studio photography",
        outputPath: "public/hero-after-ribbon-perfect.png",
        options: { width: 1024, height: 1024 }
    }
];

// Generate all images
const allImages = [beforeImage, ...afterImages];

console.log('🎨 IMPORTANT NOTES FOR PERFECT BEFORE/AFTER:');
console.log('');
console.log('Since true inpainting is not available, we are using:');
console.log('1. Extremely detailed prompts to ensure consistency');
console.log('2. Same composition, lighting, and pose descriptions');
console.log('3. Only nail design differs between images');
console.log('');
console.log('For TRUE inpainting (if needed):');
console.log('- Use tools like Photoshop Generative Fill');
console.log('- Use Stable Diffusion with ControlNet + Inpainting');
console.log('- Use ClipDrop or Runway ML inpainting features');
console.log('- Manually mask only the nail areas');
console.log('');
console.log('Starting generation...');
console.log('');

generateBatch(allImages)
    .then(results => {
        console.log('\n💅 Hero Before/After images generated!');
        console.log(`\n📋 Generated ${results.length} images:`);

        console.log('\n📸 BEFORE (Reference):');
        console.log('  ✓ hero-before-reference.png');

        console.log('\n✨ AFTER Images (4 styles):');
        console.log('  ✓ hero-after-cheek-perfect.png');
        console.log('  ✓ hero-after-glass-french-perfect.png');
        console.log('  ✓ hero-after-nuance-perfect.png');
        console.log('  ✓ hero-after-ribbon-perfect.png');

        console.log('\n⚠️  MANUAL EDITING RECOMMENDED:');
        console.log('For pixel-perfect matching, consider:');
        console.log('1. Use hero-before-reference.png as base');
        console.log('2. Use Photoshop/GIMP to manually paint nails');
        console.log('3. Or use AI inpainting tools with mask');
        console.log('4. This ensures 100% identical hands/background');

        console.log('\n🔄 Next steps:');
        console.log('  1. Check the public/ folder for new images');
        console.log('  2. Compare Before vs After for consistency');
        console.log('  3. If needed, use manual editing for perfection');
    })
    .catch(error => {
        console.error('\n❌ Generation failed:', error);
        process.exit(1);
    });
