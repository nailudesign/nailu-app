const { generateBatch } = require('./generate-nail-images');

// SEO-optimized gallery with Japanese trend keywords
// These target high-search-volume terms for Japanese nail trends
const seoGalleryDesigns = [
    // マグネットネイル (Magnetic Nails) - High search volume
    {
        prompt: "Professional close-up photograph of almond shaped nails with magnetic cat eye gel polish in deep burgundy wine red, strong cat eye effect with shimmer, delicate feminine Japanese hands, soft natural lighting, trendy magnetic nail art, 8K quality, ultra detailed",
        outputPath: "public/gallery-magnetic-burgundy-cat-eye.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with magnetic aurora gel polish in champagne gold, holographic cat eye effect, delicate feminine hands holding iPhone, lifestyle photography, Korean-Japanese trend style, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-magnetic-aurora-gold.png",
        options: { width: 1024, height: 1024 }
    },

    // ガラスフレンチ (Glass French) - Trending
    {
        prompt: "Professional close-up of almond shaped nails with glass French manicure, sheer milky pink base with glossy white tips and subtle shimmer, delicate feminine Japanese hands, soft natural lighting, trendy Japanese nail salon style, 8K quality, ultra detailed",
        outputPath: "public/gallery-glass-french-milky-pink.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with glass French design, sheer nude beige base with white tips and aurora shimmer, elegant Japanese hands, minimalist aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-glass-french-nude-aurora.png",
        options: { width: 1024, height: 1024 }
    },

    // ニュアンスネイル (Nuance Nails) - Very popular
    {
        prompt: "Professional close-up of almond nails with Korean-Japanese nuance design, soft terracotta and cream marble swirls with gold foil accents, delicate feminine hands, natural lighting, trendy autumn style, 8K quality, ultra detailed",
        outputPath: "public/gallery-nuance-terracotta-cream.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with minimalist nuance design, sheer greige base with soft brown watercolor effect and tiny gold flakes, elegant Japanese hands, soft studio lighting, sophisticated aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-nuance-greige-watercolor.png",
        options: { width: 1024, height: 1024 }
    },

    // ぷっくりネイル (Plump Gel Nails) - Trending
    {
        prompt: "Professional close-up of almond shaped nails with plump gel design, thick glossy clear gel with embedded dried flowers and gold flakes, 3D puffy effect, delicate feminine hands, natural lighting, trendy Japanese style, 8K quality, ultra detailed",
        outputPath: "public/gallery-plump-gel-dried-flowers.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with plump gel nails, thick glossy pink gradient with pearl finish and 3D effect, delicate feminine Japanese hands, soft natural lighting, kawaii aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-plump-pink-gradient-pearl.png",
        options: { width: 1024, height: 1024 }
    },

    // ミラーネイル (Mirror Chrome Nails) - High search
    {
        prompt: "Professional close-up of almond shaped nails with mirror chrome finish in rose gold, perfect reflective surface, delicate feminine hands holding matcha latte, lifestyle photography, Tokyo cafe aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-mirror-chrome-rose-gold.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina nails with mirror chrome finish in holographic silver, futuristic reflective effect, elegant Japanese hands, soft studio lighting, trendy and sophisticated, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-mirror-chrome-holographic.png",
        options: { width: 1024, height: 1024 }
    },

    // シロップネイル (Syrup Nails) - Trending
    {
        prompt: "Professional close-up of almond shaped nails with syrup nail design in sheer cherry red, jelly-like translucent finish with subtle shimmer, delicate feminine Japanese hands, natural lighting, trendy Japanese style, 8K quality, ultra detailed",
        outputPath: "public/gallery-syrup-cherry-red.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with syrup nail design in sheer lavender purple, translucent jelly finish with aurora shimmer, delicate feminine hands, soft natural lighting, kawaii aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-syrup-lavender-aurora.png",
        options: { width: 1024, height: 1024 }
    },

    // オーロラネイル (Aurora Nails) - Popular
    {
        prompt: "Professional close-up of almond nails with aurora holographic finish on sheer pink base, rainbow shimmer effect, delicate feminine Japanese hands, natural daylight, trendy and magical, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-aurora-holographic-pink.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with aurora glass nails, sheer milky white base with rainbow holographic shimmer, elegant Japanese hands, soft studio lighting, ethereal aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-aurora-glass-milky-white.png",
        options: { width: 1024, height: 1024 }
    },

    // リボンネイル (Ribbon Nails) - Kawaii trend
    {
        prompt: "Professional close-up of almond shaped nails with 3D ribbon nail design, sheer baby pink base with delicate white ribbon charms and tiny pearls, delicate feminine hands holding boba tea, lifestyle photography, kawaii aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-ribbon-baby-pink-pearls.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with ribbon nail art, sheer lavender base with 3D ribbon charms and Swarovski crystals, delicate feminine Japanese hands, soft natural lighting, girly and cute, 8K quality, ultra detailed",
        outputPath: "public/gallery-ribbon-lavender-crystals.png",
        options: { width: 1024, height: 1024 }
    },

    // チークネイル (Cheek Nails) - Trending
    {
        prompt: "Professional close-up of almond shaped nails with cheek nail design, sheer pink with soft coral gradient at center like blushed cheeks, delicate feminine Japanese hands, natural lighting, trendy and cute, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-cheek-nail-pink-coral.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with cheek nail design, sheer nude beige with soft peachy pink gradient at center, delicate feminine hands, soft natural lighting, minimalist Japanese aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-cheek-nail-nude-peach.png",
        options: { width: 1024, height: 1024 }
    },

    // ストーンネイル (Stone/Gem Nails) - Popular for events
    {
        prompt: "Professional close-up of almond shaped nails with luxury stone nail design, sheer nude base with Swarovski crystal arrangement on accent nail, delicate feminine Japanese hands, natural lighting, bridal and event style, 8K quality, ultra detailed",
        outputPath: "public/gallery-stone-swarovski-bridal.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina nails with stone nail art, sheer pink base with holographic gems and crystals, delicate feminine hands, soft studio lighting, glamorous and elegant, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-stone-holographic-gems.png",
        options: { width: 1024, height: 1024 }
    },

    // ベルベットネイル (Velvet Matte Nails) - Autumn/Winter trend
    {
        prompt: "Professional close-up of almond shaped nails with velvet matte finish in deep burgundy, soft fuzzy texture effect, one accent nail with gold foil, delicate feminine Japanese hands, natural lighting, autumn winter style, 8K quality, ultra detailed",
        outputPath: "public/gallery-velvet-matte-burgundy-gold.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with velvet matte finish in dusty rose, soft texture with one accent nail featuring tiny crystals, elegant Japanese hands, soft natural lighting, sophisticated aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-velvet-matte-dusty-rose.png",
        options: { width: 1024, height: 1024 }
    },

    // Y2K・地雷系ネイル (Y2K/Jirai-kei Nails) - Gen Z trend
    {
        prompt: "Professional close-up of almond shaped nails with Y2K jirai-kei style, black base with holographic hearts and star charms, edgy kawaii aesthetic, delicate feminine hands, Harajuku style background, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-y2k-jirai-black-hearts.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of almond nails with Y2K cyber nail design, holographic chrome finish with tiny butterfly charms and rhinestones, delicate feminine Japanese hands, soft lighting, trendy Gen Z style, 8K quality, ultra detailed",
        outputPath: "public/gallery-y2k-cyber-butterfly-chrome.png",
        options: { width: 1024, height: 1024 }
    },

    // 押し花ネイル (Pressed Flower Nails) - Classic popular
    {
        prompt: "Professional close-up of almond shaped nails with pressed dried flower design, sheer nude base with delicate real dried flowers embedded in clear gel, elegant Japanese hands, natural lighting, botanical aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-pressed-flower-nude-botanical.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with pressed flower nail art, sheer pink base with tiny dried flowers and gold flakes in clear gel, delicate feminine hands, soft natural lighting, romantic aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-pressed-flower-pink-gold.png",
        options: { width: 1024, height: 1024 }
    }
];

generateBatch(seoGalleryDesigns)
    .then(results => {
        console.log('\n💅 SEO-optimized gallery images generated successfully!');
        console.log(`\n📋 Generated ${results.length} images with trending keywords:`);
        results.forEach(path => console.log(`  ✓ ${path}`));

        console.log('\n🔍 SEO Keywords Covered:');
        console.log('  • マグネットネイル (Magnetic Nails)');
        console.log('  • ガラスフレンチ (Glass French)');
        console.log('  • ニュアンスネイル (Nuance Nails)');
        console.log('  • ぷっくりネイル (Plump Gel)');
        console.log('  • ミラーネイル (Mirror Chrome)');
        console.log('  • シロップネイル (Syrup Nails)');
        console.log('  • オーロラネイル (Aurora Nails)');
        console.log('  • リボンネイル (Ribbon Nails)');
        console.log('  • チークネイル (Cheek Nails)');
        console.log('  • ストーンネイル (Stone/Gem Nails)');
        console.log('  • ベルベットネイル (Velvet Matte)');
        console.log('  • Y2K・地雷系ネイル (Y2K/Jirai-kei)');
        console.log('  • 押し花ネイル (Pressed Flower)');

        console.log('\n🔄 Next steps:');
        console.log('  1. Check the public/ folder for new SEO images');
        console.log('  2. Update page.tsx gallery with these images');
        console.log('  3. Run npm run dev to see the updated gallery');
    })
    .catch(error => {
        console.error('\n❌ SEO gallery generation failed:', error);
        process.exit(1);
    });
