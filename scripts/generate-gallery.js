const { generateBatch } = require('./generate-nail-images');

// Gallery nail designs - Close-up shots WITHOUT faces
const galleryDesigns = [
    {
        prompt: "Professional close-up photograph of elegant almond shaped nails with sheer sakura pink ombre gel polish and tiny pearl accents, delicate feminine Japanese hands, soft natural lighting from window, shallow depth of field, Japanese nail salon quality, ultra detailed nail art, 8K quality",
        outputPath: "public/gallery-sakura-pink-ombre.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of almond nails with Korean-Japanese style nuance design, milky beige base with soft brown marble swirls and gold flakes, delicate feminine hands, soft studio lighting, nail art detail shot, trendy and sophisticated, 8K quality, ultra detailed",
        outputPath: "public/gallery-nuance-marble.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of oval shaped nails with glass nails aurora holographic finish, hands holding matcha latte cup, lifestyle photography, natural soft lighting, Tokyo cafe aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-aurora-glass.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up photograph of ballerina shaped nails with sheer milky white gel and delicate gold foil accents, elegant Japanese hands, soft studio lighting, minimalist Japanese nail salon quality, clean aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-milky-gold-foil.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with kawaii nail art, soft lavender base with tiny 3D heart charms and Swarovski crystals, delicate feminine hands, purikura style soft lighting, cute and girly aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-kawaii-hearts.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with magnetic cat eye design in champagne rose gold, delicate feminine Japanese hands, soft natural lighting, Korean-Japanese trend style, ultra detailed nail art, 8K quality",
        outputPath: "public/gallery-cat-eye-rose.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond shaped nails with trendy ribbon nail design, sheer pink base with delicate 3D ribbon charms and pearls, hands holding boba tea cup, lifestyle photography, natural lighting, 8K quality, ultra detailed",
        outputPath: "public/gallery-ribbon-pink.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of almond nails with sheer nude ombre and dried flower embeds in clear gel, elegant Japanese hands, soft natural lighting, minimalist Japanese aesthetic, nail art detail shot, 8K quality, ultra detailed",
        outputPath: "public/gallery-dried-flower.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with modern French manicure, sheer pink base with thin white tips and gold line accent, delicate feminine hands, natural daylight, trendy twist on classic, 8K quality, ultra detailed",
        outputPath: "public/gallery-modern-french.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with syrup nail design in sheer peachy coral, jelly-like translucent finish with subtle shimmer, delicate feminine Japanese hands, soft natural lighting, trendy Japanese style, 8K quality, ultra detailed",
        outputPath: "public/gallery-syrup-peach.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond shaped nails with magnetic nails deep burgundy cat eye effect, hands holding iPhone, lifestyle photography, natural light, sophisticated and trendy, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-burgundy-magnetic.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with sheer ivory gel and subtle aurora shimmer, elegant Japanese hands, soft studio lighting, minimalist clean aesthetic, Japanese nail salon quality, 8K quality, ultra detailed",
        outputPath: "public/gallery-ivory-aurora.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with Y2K cyber style holographic chrome finish and tiny star accents, delicate feminine hands, Harajuku style background blur, trendy and girly, 8K quality, ultra detailed",
        outputPath: "public/gallery-y2k-chrome.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with Korean-Japanese minimalist design, sheer nude with single delicate gold line art accent, delicate feminine Japanese hands, soft natural lighting, clean aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-minimalist-gold.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond shaped nails with plump gel nails soft pink gradient and pearl finish, hands holding matcha latte, lifestyle photography, Tokyo cafe background, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-plump-pink-pearl.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of almond nails with sheer terracotta nuance design and subtle gold flakes, elegant Japanese hands, soft natural lighting, trendy autumn style, nail art detail shot, 8K quality, ultra detailed",
        outputPath: "public/gallery-terracotta-nuance.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond shaped nails with velvet matte finish in dusty mauve, one accent nail featuring tiny crystals, delicate feminine hands, natural daylight, Instagram style, 8K quality, ultra detailed",
        outputPath: "public/gallery-velvet-mauve.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with mirror chrome finish in silver, delicate feminine Japanese hands, soft studio lighting, futuristic and trendy, ultra detailed reflection, 8K quality, professional nail art",
        outputPath: "public/gallery-mirror-chrome.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond shaped nails with trendy stone nail design, natural marble pattern in soft gray and white, hands holding boba tea, lifestyle photography, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-stone-marble.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with sheer baby blue gel and delicate silver glitter gradient, elegant Japanese hands, soft natural lighting, kawaii aesthetic, Japanese nail salon quality, 8K quality, ultra detailed",
        outputPath: "public/gallery-baby-blue-glitter.png",
        options: { width: 1024, height: 1024 }
    }
];

generateBatch(galleryDesigns)
    .then(results => {
        console.log('\n💅 Gallery images generated successfully!');
        console.log(`\n📋 Generated ${results.length} images:`);
        results.forEach(path => console.log(`  ✓ ${path}`));

        console.log('\n🔄 Next steps:');
        console.log('  1. Check the public/ folder for new images');
        console.log('  2. Images are now close-up shots without faces');
        console.log('  3. Run npm run dev to see the updated gallery');
    })
    .catch(error => {
        console.error('\n❌ Gallery generation failed:', error);
        process.exit(1);
    });
