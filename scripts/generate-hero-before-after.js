const { generateBatch } = require('./generate-nail-images');

// Perfect Before/After Pairs - Same hand, same pose, only nails change
// These use consistent prompts to ensure matching composition

// Base prompt for consistent hand positioning
const baseHandPrompt = "Professional close-up photograph of elegant Japanese woman's hands resting on a clean white marble desk surface, almond shaped nails, hands positioned naturally with fingers slightly curved, soft natural window lighting from the left, minimalist aesthetic, shallow depth of field, 8K quality, ultra detailed, photorealistic";

// Before/After pairs for 4 nail styles
const beforeAfterPairs = [
    // ═══════════════════════════════════════════════════════
    // BEFORE Image (shared base for all styles)
    // ═══════════════════════════════════════════════════════
    {
        prompt: `${baseHandPrompt}, completely natural bare nails with no polish or decoration, clean and well-manicured natural nails, healthy nail beds, realistic skin texture`,
        outputPath: "public/hero-before-natural.png",
        options: { width: 1024, height: 1024 }
    },

    // ═══════════════════════════════════════════════════════
    // AFTER: Cheek Nails
    // ═══════════════════════════════════════════════════════
    {
        prompt: `${baseHandPrompt}, cheek nail design with sheer pink base and soft coral gradient at the center like blushed cheeks, glossy finish, cute and feminine aesthetic, trendy Japanese nail salon style`,
        outputPath: "public/hero-after-cheek-nails.png",
        options: { width: 1024, height: 1024 }
    },

    // ═══════════════════════════════════════════════════════
    // AFTER: Glass French
    // ═══════════════════════════════════════════════════════
    {
        prompt: `${baseHandPrompt}, glass French manicure with sheer transparent nude pink base and glossy white tips with reflective glass-like finish, delicate minimalist design, ultra shiny and reflective, sophisticated Japanese style`,
        outputPath: "public/hero-after-glass-french.png",
        options: { width: 1024, height: 1024 }
    },

    // ═══════════════════════════════════════════════════════
    // AFTER: Nuance
    // ═══════════════════════════════════════════════════════
    {
        prompt: `${baseHandPrompt}, nuance nail design with soft beige and cream marble swirls, subtle brown watercolor effect with tiny gold flakes, muted neutral colors, elegant and understated aesthetic, Korean-Japanese minimalist style`,
        outputPath: "public/hero-after-nuance.png",
        options: { width: 1024, height: 1024 }
    },

    // ═══════════════════════════════════════════════════════
    // AFTER: Ribbon
    // ═══════════════════════════════════════════════════════
    {
        prompt: `${baseHandPrompt}, ribbon nail design with sheer baby pink base and delicate 3D white ribbon charms on accent nails with tiny pearls, cute and playful aesthetic, gentle pastel colors, kawaii Japanese style`,
        outputPath: "public/hero-after-ribbon.png",
        options: { width: 1024, height: 1024 }
    }
];

generateBatch(beforeAfterPairs)
    .then(results => {
        console.log('\n💅 Perfect Before/After pairs generated successfully!');
        console.log(`\n📋 Generated ${results.length} images:`);

        console.log('\n📸 BEFORE (Base Image):');
        console.log('  ✓ hero-before-natural.png');

        console.log('\n✨ AFTER Images (4 styles):');
        console.log('  ✓ hero-after-cheek-nails.png');
        console.log('  ✓ hero-after-glass-french.png');
        console.log('  ✓ hero-after-nuance.png');
        console.log('  ✓ hero-after-ribbon.png');

        console.log('\n🎯 Key Features:');
        console.log('  • Same hand position and pose across all images');
        console.log('  • Same white marble desk background');
        console.log('  • Same natural window lighting from left');
        console.log('  • Only nail designs change');
        console.log('  • Perfect for before/after slider');

        console.log('\n🔄 Next steps:');
        console.log('  1. Check the public/ folder for new hero images');
        console.log('  2. Update page.tsx to use these images');
        console.log('  3. Test the before/after slider');
    })
    .catch(error => {
        console.error('\n❌ Before/After generation failed:', error);
        process.exit(1);
    });
