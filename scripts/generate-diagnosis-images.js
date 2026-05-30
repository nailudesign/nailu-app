const { generateBatch } = require('./generate-nail-images');

// Nail Diagnosis Images - 4 types × 4 images each = 16 total
const diagnosisImages = [
    // ═══════════════════════════════════════════════════════
    // Type A: Sheer & Soft Nails (シアー＆ソフトネイル)
    // ═══════════════════════════════════════════════════════
    {
        prompt: "Professional close-up photograph of elegant almond shaped nails with sheer milky beige gel polish and subtle pearl shimmer, delicate feminine Japanese hands holding a latte cup at a minimalist cafe, soft natural window lighting, warm and cozy atmosphere, shallow depth of field, Instagram aesthetic, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/diagnosis-sheer-hero.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with glass French manicure, sheer nude pink base with glossy white tips and aurora shimmer, delicate feminine hands on white marble table with dried flowers, soft natural lighting, minimalist Japanese aesthetic, Pinterest-worthy composition, 8K quality, ultra detailed",
        outputPath: "public/diagnosis-sheer-1.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond shaped nails with nuance design, soft beige and cream marble swirls with tiny gold flakes, elegant Japanese hands holding a book, warm afternoon sunlight, cozy and peaceful mood, lifestyle photography, 8K quality, ultra detailed nail art",
        outputPath: "public/diagnosis-sheer-2.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with pressed dried flower design, sheer ivory base with delicate real flowers embedded in clear gel, feminine hands on linen fabric, soft diffused lighting, botanical and romantic aesthetic, 8K quality, ultra detailed, dreamy atmosphere",
        outputPath: "public/diagnosis-sheer-3.png",
        options: { width: 1024, height: 1024 }
    },

    // ═══════════════════════════════════════════════════════
    // Type B: Yami-kawaii Nails (ヤミかわネイル)
    // ═══════════════════════════════════════════════════════
    {
        prompt: "Professional close-up photograph of almond shaped nails with yami-kawaii design, black base with holographic heart charms and tiny rhinestones, delicate feminine Japanese hands holding a gothic lolita accessory, moody purple and pink neon lighting, edgy kawaii aesthetic, Instagram-worthy, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/diagnosis-yamikawa-hero.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of almond nails with jirai-kei style, deep burgundy velvet matte finish with one accent nail featuring silver chains and black ribbon charm, feminine hands against dark purple background, dramatic lighting, emotional and mysterious mood, 8K quality, ultra detailed nail art",
        outputPath: "public/diagnosis-yamikawa-1.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of oval shaped nails with Y2K cyber design, holographic chrome finish with butterfly charms and star rhinestones, delicate hands holding a flip phone, Harajuku street style background blur, trendy Gen Z aesthetic, 8K quality, ultra detailed, vibrant colors",
        outputPath: "public/diagnosis-yamikawa-2.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of almond nails with dark romantic design, sheer black gradient with red glitter hearts and tiny pearls, feminine Japanese hands with lace sleeve detail, soft purple backlighting, yami-kawaii aesthetic, emotional and delicate mood, 8K quality, ultra detailed",
        outputPath: "public/diagnosis-yamikawa-3.png",
        options: { width: 1024, height: 1024 }
    },

    // ═══════════════════════════════════════════════════════
    // Type C: Cool & Minimal Nails (クール＆ミニマルネイル)
    // ═══════════════════════════════════════════════════════
    {
        prompt: "Professional close-up photograph of almond shaped nails with minimalist design, sophisticated greige matte finish with single thin gold line accent on one nail, elegant Japanese hands holding a designer coffee cup, modern office or cafe setting, clean natural lighting, sharp and sophisticated aesthetic, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/diagnosis-cool-hero.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with mirror chrome finish in rose gold, perfect reflective surface, elegant hands against white marble background, soft studio lighting, futuristic and sophisticated mood, high-end fashion aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/diagnosis-cool-1.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with magnetic cat eye design in deep charcoal gray, strong shimmer effect, delicate feminine hands holding a sleek smartphone, minimalist monochrome background, cool and modern lighting, Instagram aesthetic, 8K quality, ultra detailed",
        outputPath: "public/diagnosis-cool-2.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval shaped nails with nude beige one-color design and subtle matte finish, elegant Japanese hands on black leather surface, clean and sharp lighting, minimalist luxury aesthetic, Pinterest-worthy composition, 8K quality, ultra detailed, sophisticated mood",
        outputPath: "public/diagnosis-cool-3.png",
        options: { width: 1024, height: 1024 }
    },

    // ═══════════════════════════════════════════════════════
    // Type D: Girly & Sweet Nails (ガーリー＆スウィートネイル)
    // ═══════════════════════════════════════════════════════
    {
        prompt: "Professional close-up photograph of almond shaped nails with girly ribbon design, sheer baby pink base with delicate 3D white ribbon charms and tiny pearls, delicate feminine Japanese hands holding a pastel pink boba tea cup, soft dreamy lighting with bokeh background, sweet and romantic aesthetic, Instagram-worthy, 8K quality, ultra detailed, photorealistic",
        outputPath: "public/diagnosis-girly-hero.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with cheek nail design, sheer pink with soft coral gradient at center like blushed cheeks, delicate feminine hands holding a cute plushie, soft pastel background, warm and sweet lighting, kawaii aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/diagnosis-girly-1.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond shaped nails with syrup nail design in sheer lavender purple, jelly-like translucent finish with aurora shimmer, feminine hands with lace ribbon bracelet, soft pink and purple gradient background, dreamy and sweet mood, 8K quality, ultra detailed",
        outputPath: "public/diagnosis-girly-2.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with plump gel design, thick glossy pink gradient with pearl finish and 3D puffy effect, delicate Japanese hands holding a heart-shaped accessory, soft natural lighting, girly and romantic aesthetic, Pinterest-worthy, 8K quality, ultra detailed",
        outputPath: "public/diagnosis-girly-3.png",
        options: { width: 1024, height: 1024 }
    }
];

generateBatch(diagnosisImages)
    .then(results => {
        console.log('\n💅 Nail Diagnosis images generated successfully!');
        console.log(`\n📋 Generated ${results.length} images for 4 diagnosis types:`);

        console.log('\n【A】シアー＆ソフトネイル:');
        console.log('  ✓ diagnosis-sheer-hero.png');
        console.log('  ✓ diagnosis-sheer-1.png');
        console.log('  ✓ diagnosis-sheer-2.png');
        console.log('  ✓ diagnosis-sheer-3.png');

        console.log('\n【B】ヤミかわネイル:');
        console.log('  ✓ diagnosis-yamikawa-hero.png');
        console.log('  ✓ diagnosis-yamikawa-1.png');
        console.log('  ✓ diagnosis-yamikawa-2.png');
        console.log('  ✓ diagnosis-yamikawa-3.png');

        console.log('\n【C】クール＆ミニマルネイル:');
        console.log('  ✓ diagnosis-cool-hero.png');
        console.log('  ✓ diagnosis-cool-1.png');
        console.log('  ✓ diagnosis-cool-2.png');
        console.log('  ✓ diagnosis-cool-3.png');

        console.log('\n【D】ガーリー＆スウィートネイル:');
        console.log('  ✓ diagnosis-girly-hero.png');
        console.log('  ✓ diagnosis-girly-1.png');
        console.log('  ✓ diagnosis-girly-2.png');
        console.log('  ✓ diagnosis-girly-3.png');

        console.log('\n🔄 Next steps:');
        console.log('  1. Check the public/ folder for diagnosis images');
        console.log('  2. Implement diagnosis quiz in page.tsx');
        console.log('  3. Add images to gallery section');
    })
    .catch(error => {
        console.error('\n❌ Diagnosis image generation failed:', error);
        process.exit(1);
    });
