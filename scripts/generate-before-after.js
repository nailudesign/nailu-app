const { generateBatch } = require('./generate-nail-images');

// BEFORE image - Base hand with natural/simple nails
const beforeImage = {
    prompt: "Professional photograph of elegant Japanese woman's hands with natural bare nails, no nail polish, clean and well-manicured, almond shaped natural nails, soft natural lighting from window, sitting at white desk with laptop and coffee cup, minimalist aesthetic, 8K quality, ultra detailed, photorealistic",
    outputPath: "public/before-natural-nails.png",
    options: { width: 1024, height: 1024 }
};

// AFTER images - Same hand composition but with different nail designs
// These should match the before image's hand position and setting
const afterDesigns = [
    {
        prompt: "Professional photograph of elegant Japanese woman's hands with sakura pink ombre gel nails and tiny pearl accents, almond shaped nails, soft natural lighting from window, sitting at white desk with laptop and coffee cup, minimalist aesthetic, same hand position as before, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/after-sakura-pink.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional photograph of elegant Japanese woman's hands with milky beige nuance marble gel nails with gold flakes, almond shaped nails, soft natural lighting from window, sitting at white desk with laptop and coffee cup, minimalist aesthetic, same hand position as before, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/after-milky-beige.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional photograph of elegant Japanese woman's hands with pearl ivory gel nails with subtle shimmer, almond shaped nails, soft natural lighting from window, sitting at white desk with laptop and coffee cup, minimalist aesthetic, same hand position as before, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/after-pearl-ivory.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional photograph of elegant Japanese woman's hands with sheer pink cheek nail design with soft gradient, almond shaped nails, soft natural lighting from window, sitting at white desk with laptop and coffee cup, minimalist aesthetic, same hand position as before, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/after-cheek-nail.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional photograph of elegant Japanese woman's hands with glass French manicure with sheer pink base and white tips, almond shaped nails, soft natural lighting from window, sitting at white desk with laptop and coffee cup, minimalist aesthetic, same hand position as before, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/after-glass-french.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional photograph of elegant Japanese woman's hands with soft brown nuance design with gold accents, almond shaped nails, soft natural lighting from window, sitting at white desk with laptop and coffee cup, minimalist aesthetic, same hand position as before, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/after-nuance.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional photograph of elegant Japanese woman's hands with delicate ribbon nail design, sheer pink base with 3D ribbon charms, almond shaped nails, soft natural lighting from window, sitting at white desk with laptop and coffee cup, minimalist aesthetic, same hand position as before, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/after-ribbon.png",
        options: { width: 1024, height: 1024 }
    }
];

// Generate all images
const allImages = [beforeImage, ...afterDesigns];

generateBatch(allImages)
    .then(results => {
        console.log('\n💅 Before/After images generated successfully!');
        console.log(`\n📋 Generated ${results.length} images:`);
        results.forEach(path => console.log(`  ✓ ${path}`));

        console.log('\n✨ Key features:');
        console.log('  • Same hand position and setting across all images');
        console.log('  • Only nail designs change (not the entire image)');
        console.log('  • Consistent lighting and composition');
        console.log('  • No faces - focus on hands and nails');

        console.log('\n🔄 Next steps:');
        console.log('  1. Check the public/ folder for new before/after images');
        console.log('  2. Run npm run dev to see the updated slider');
    })
    .catch(error => {
        console.error('\n❌ Before/After generation failed:', error);
        process.exit(1);
    });
