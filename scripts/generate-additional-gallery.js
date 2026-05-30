const { generateBatch } = require('./generate-nail-images');

// Additional Gallery Images - More variety for the gallery section
// Focus on trending styles, seasonal designs, and popular requests
const additionalGalleryImages = [
    // Spring/Summer Trends
    {
        prompt: "Professional close-up of almond shaped nails with sakura cherry blossom design, sheer pink base with delicate hand-painted white cherry blossoms and gold flakes, delicate feminine Japanese hands, soft natural lighting, spring aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-sakura-cherry-blossom.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with hydrangea nail design, sheer blue and purple gradient with tiny flower accents, delicate feminine hands holding a hydrangea flower, soft natural lighting, rainy season aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-hydrangea-blue-purple.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with seashell design, sheer peachy beige base with iridescent shell fragments and pearl accents, feminine hands on beach sand, soft summer lighting, coastal aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-seashell-beach-summer.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with watermelon nail design, sheer pink and green gradient with tiny black seed dots, delicate feminine hands holding a watermelon slice, bright summer lighting, kawaii aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-watermelon-summer-kawaii.png",
        options: { width: 1024, height: 1024 }
    },

    // Autumn/Winter Trends
    {
        prompt: "Professional close-up of almond shaped nails with autumn leaves design, warm terracotta and burnt orange gradient with gold foil leaf accents, elegant Japanese hands holding a pumpkin spice latte, cozy autumn lighting, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-autumn-leaves-terracotta.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with knit sweater texture design, matte beige base with 3D knit pattern effect, delicate feminine hands in cozy sweater, warm winter lighting, hygge aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-knit-sweater-winter.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with snowflake design, sheer icy blue base with delicate white snowflake art and silver glitter, feminine hands holding hot cocoa, winter aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-snowflake-icy-blue.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with Christmas design, deep burgundy base with tiny gold stars and red rhinestones, delicate feminine Japanese hands, festive holiday lighting, 8K quality, ultra detailed",
        outputPath: "public/gallery-christmas-burgundy-gold.png",
        options: { width: 1024, height: 1024 }
    },

    // Event & Occasion Nails
    {
        prompt: "Professional close-up of almond shaped nails with bridal wedding design, pure white base with delicate lace pattern and Swarovski crystals, elegant hands holding a bouquet, soft romantic lighting, luxury bridal aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-bridal-white-lace-crystal.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with graduation ceremony design, elegant navy blue base with gold line art and tiny pearl accents, delicate feminine hands holding a diploma, sophisticated lighting, 8K quality, ultra detailed",
        outputPath: "public/gallery-graduation-navy-gold.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with birthday party design, sheer pink base with holographic confetti and tiny balloon charms, feminine hands holding a birthday cake, festive lighting, kawaii aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-birthday-confetti-pink.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with Valentine's Day design, sheer red gradient with tiny heart charms and gold accents, delicate feminine Japanese hands, romantic soft lighting, 8K quality, ultra detailed",
        outputPath: "public/gallery-valentine-red-hearts.png",
        options: { width: 1024, height: 1024 }
    },

    // Trendy Techniques
    {
        prompt: "Professional close-up of almond shaped nails with ombre fade design, soft pink to white gradient with subtle shimmer, delicate feminine hands, natural daylight, clean and modern aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-ombre-pink-white.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with galaxy nail design, deep navy base with purple and blue nebula effect and tiny star glitter, delicate feminine hands, cosmic and dreamy lighting, 8K quality, ultra detailed",
        outputPath: "public/gallery-galaxy-navy-purple.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with tie-dye design, pastel rainbow swirls in pink, blue, and yellow, delicate feminine Japanese hands, soft natural lighting, Y2K aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-tie-dye-pastel-rainbow.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with stained glass design, sheer base with colorful geometric glass-like patterns and gold outlines, elegant hands, artistic lighting, 8K quality, ultra detailed",
        outputPath: "public/gallery-stained-glass-colorful.png",
        options: { width: 1024, height: 1024 }
    },

    // Color Variations
    {
        prompt: "Professional close-up of almond shaped nails with mint green design, soft pastel mint base with white cloud accents, delicate feminine hands holding a matcha drink, fresh and clean lighting, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-mint-green-cloud.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with coral orange design, vibrant coral base with gold foil accents, delicate feminine Japanese hands, warm summer lighting, tropical aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-coral-orange-gold.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with emerald green design, deep jewel-tone green with gold glitter gradient, elegant hands holding jewelry, luxury lighting, sophisticated aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-emerald-green-gold-glitter.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with lilac purple design, soft pastel lilac base with silver shimmer and tiny star accents, delicate feminine hands, dreamy soft lighting, 8K quality, ultra detailed",
        outputPath: "public/gallery-lilac-purple-silver-stars.png",
        options: { width: 1024, height: 1024 }
    },

    // Character & Themed Nails
    {
        prompt: "Professional close-up of almond shaped nails with anime-inspired design, pastel pink base with tiny kawaii character stickers and holographic accents, delicate feminine Japanese hands, otaku aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-anime-kawaii-character.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with Sanrio-inspired design, white base with pastel rainbow and tiny bow charms, delicate feminine hands holding a cute plushie, soft kawaii lighting, 8K quality, ultra detailed",
        outputPath: "public/gallery-sanrio-rainbow-bow.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with constellation design, deep midnight blue base with connected star patterns in gold, elegant hands, mystical lighting, celestial aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-constellation-midnight-gold.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with mermaid scales design, iridescent turquoise and purple with holographic shimmer, delicate feminine Japanese hands, underwater lighting effect, fantasy aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-mermaid-scales-turquoise.png",
        options: { width: 1024, height: 1024 }
    },

    // Texture & Finish Variations
    {
        prompt: "Professional close-up of almond shaped nails with sugar texture design, matte white base with granulated sugar-like texture and tiny crystals, delicate feminine hands, soft natural lighting, unique tactile aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-sugar-texture-white.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with glossy vinyl finish, ultra-shiny black base with perfect reflection, elegant Japanese hands against white background, high-contrast lighting, modern aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-glossy-vinyl-black.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Professional close-up of almond nails with satin finish, soft dusty rose with subtle sheen, delicate feminine hands, natural daylight, elegant and understated aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-satin-dusty-rose.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of ballerina shaped nails with jelly translucent finish, clear gel with suspended gold flakes and tiny flowers, delicate feminine Japanese hands, backlit lighting, ethereal aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-jelly-clear-gold-flowers.png",
        options: { width: 1024, height: 1024 }
    },

    // Oshi-katsu (Fan Activity) Nails
    {
        prompt: "Professional close-up of almond shaped nails with oshi-katsu design, member color gradient with tiny heart and star charms, delicate feminine hands holding a light stick, concert lighting, fan aesthetic, 8K quality, ultra detailed nail art",
        outputPath: "public/gallery-oshikatsu-member-color.png",
        options: { width: 1024, height: 1024 }
    },
    {
        prompt: "Close-up of oval nails with idol-inspired design, pastel pink and white with tiny crown charms and rhinestones, delicate feminine Japanese hands, kawaii idol aesthetic, 8K quality, ultra detailed",
        outputPath: "public/gallery-idol-pink-crown.png",
        options: { width: 1024, height: 1024 }
    }
];

generateBatch(additionalGalleryImages)
    .then(results => {
        console.log('\n💅 Additional gallery images generated successfully!');
        console.log(`\n📋 Generated ${results.length} new gallery images:`);

        console.log('\n🌸 Seasonal (8 images):');
        console.log('  • Spring/Summer: Sakura, Hydrangea, Seashell, Watermelon');
        console.log('  • Autumn/Winter: Leaves, Knit, Snowflake, Christmas');

        console.log('\n🎉 Events (4 images):');
        console.log('  • Bridal, Graduation, Birthday, Valentine');

        console.log('\n✨ Techniques (4 images):');
        console.log('  • Ombre, Galaxy, Tie-dye, Stained Glass');

        console.log('\n🎨 Colors (4 images):');
        console.log('  • Mint Green, Coral Orange, Emerald Green, Lilac Purple');

        console.log('\n🌟 Themed (4 images):');
        console.log('  • Anime, Sanrio, Constellation, Mermaid');

        console.log('\n💎 Textures (4 images):');
        console.log('  • Sugar, Glossy Vinyl, Satin, Jelly');

        console.log('\n💖 Oshi-katsu (2 images):');
        console.log('  • Member Color, Idol Crown');

        console.log('\n🔄 Next steps:');
        console.log('  1. Check the public/ folder for new images');
        console.log('  2. Add to gallery section in page.tsx');
        console.log('  3. Update alt text with SEO keywords');
    })
    .catch(error => {
        console.error('\n❌ Additional gallery generation failed:', error);
        process.exit(1);
    });
