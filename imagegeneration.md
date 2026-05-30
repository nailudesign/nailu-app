# Nail Design Image Generation Guide (Replicate AI Models)

## Overview

All nail design images for NAIL AI are generated using **Replicate AI models**. We use three models depending on quality requirements:

### Standard Quality
- **Flux Schnell** (`black-forest-labs/flux-schnell`) - Fast, cost-effective generation for blog posts and thumbnail content

### High Quality
- **Google Nano Banana** (`google/nano-banana`) - High-quality images for gallery sections and marketing materials

### Super High Quality (Recommended for Nail Designs)
- **Seedream 4.5** (`bytedance/seedream-4.5`) - **Best choice for hyperrealistic nail images**. Creates stunning, photorealistic nail designs that look like real photos or selfies taken by users showing off their new manicure.

This ensures consistent, high-quality nail design visuals that look authentic and shareable on social media.

**Target Audience:** Japanese girls and women who love trendy, kawaii, and sophisticated nail designs popular in Japan.

## Environment Setup

```bash
# Required environment variable in .env.local
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

Get your API token from: https://replicate.com/account/api-tokens
 |

## API Configuration

### Flux Schnell (Standard Quality)

| Setting | Value |
|---------|-------|
| **Model** | `black-forest-labs/flux-schnell` |
| **Output Format** | WebP (optimized for web) |
| **Aspect Ratio** | 16:9 (blog headers), 1:1 (social), 4:3 (before/after) |
| **Output Quality** | 90 |
| **Num Outputs** | 1 |

### Google Nano Banana (High Quality)

| Setting | Value |
|---------|-------|
| **Model** | `google/nano-banana` |
| **Output Format** | WebP or PNG (for maximum quality) |
| **Aspect Ratio** | 16:9, 1:1, 4:3 |
| **Width/Height** | Up to 2048x2048 |
| **Guidance Scale** | 7.5 (recommended for photorealism) |
| **Num Inference Steps** | 50 (higher = better quality) |

### Seedream 4.5 (Super High Quality - Best for Nail Designs)

| Setting | Value |
|---------|-------|
| **Model** | `bytedance/seedream-4.5` |
| **Output Format** | WebP or PNG |
| **Aspect Ratio** | 1:1 (Instagram), 4:5 (portrait selfie), 9:16 (stories) |
| **Width/Height** | Up to 1024x1024 (recommended) |
| **Guidance Scale** | 3.5-5.0 (recommended for photorealism) |
| **Num Inference Steps** | 30-50 |

## Quick Start: Generate an Image

### Using cURL (Flux Schnell - Standard Quality)

```bash
curl -s -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d '{
    "input": {
      "prompt": "Close-up photo of elegant manicured nails with soft sakura pink gel polish, delicate feminine hands, natural lighting, Japanese nail salon quality, clean and kawaii aesthetic",
      "aspect_ratio": "1:1",
      "output_format": "webp",
      "output_quality": 90,
      "num_outputs": 1
    }
  }' \
  https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions
```

### Using cURL (Google Nano Banana - High Quality)

```bash
curl -s -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d '{
    "input": {
      "prompt": "Photorealistic close-up of beautiful almond-shaped nails with milky pink nuance design and tiny pearl accents, young Japanese woman holding matcha latte, natural soft lighting, Instagram selfie style, professional gel manicure, high detail, Japanese beauty magazine quality",
      "width": 1024,
      "height": 1024,
      "guidance_scale": 7.5,
      "num_inference_steps": 50,
      "output_format": "webp"
    }
  }' \
  https://api.replicate.com/v1/models/google/nano-banana/predictions
```

### Using cURL (Seedream 4.5 - Super High Quality / Hyperrealistic)

```bash
curl -s -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d '{
    "input": {
      "prompt": "Hyperrealistic iPhone selfie photo of a cute young Japanese woman showing off her fresh gel manicure, almond shaped nails with sheer milky pink ombre and tiny Swarovski crystal accents, delicate hands gracefully posed near face, natural daylight from window, trendy Tokyo cafe background with soft bokeh, social media style, authentic and candid, 8K quality, ultra detailed nail art, Japanese beauty aesthetic",
      "width": 1024,
      "height": 1024,
      "guidance_scale": 4.0,
      "num_inference_steps": 40
    }
  }' \
  https://api.replicate.com/v1/models/bytedance/seedream-4.5/predictions
```

## Node.js Generation Script

Create `scripts/generate-nail-images.js`:

```javascript
const fs = require('fs');
const path = require('path');

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  console.error('Error: REPLICATE_API_TOKEN not found in environment variables');
  process.exit(1);
}

// Quality levels for nail design images
const QUALITY_LEVELS = {
  standard: 'flux-schnell',      // Fast, good for thumbnails
  high: 'nano-banana',           // High quality for galleries
  ultra: 'seedream'              // Best for hyperrealistic nail selfies
};

/**
 * Generate a nail design image using Replicate AI models
 * @param {string} prompt - The image generation prompt
 * @param {string} outputPath - Where to save the image (relative to project root)
 * @param {object} options - Additional generation options
 * @param {string} options.quality - Quality level: 'standard', 'high', or 'ultra' (default: 'ultra')
 * @param {string} options.aspectRatio - Aspect ratio for Flux Schnell (default: '1:1')
 * @param {number} options.width - Width for high/ultra quality images (default: 1024)
 * @param {number} options.height - Height for high/ultra quality images (default: 1024)
 * @param {string} options.outputFormat - Output format (default: 'webp')
 * @param {number} options.outputQuality - Quality for Flux Schnell (default: 90)
 * @param {number} options.guidanceScale - Guidance scale (default: 4.0 for ultra, 7.5 for high)
 * @param {number} options.numInferenceSteps - Steps (default: 40 for ultra, 50 for high)
 * @returns {Promise<string>} Path to saved image
 */
async function generateNailImage(prompt, outputPath, options = {}) {
  const {
    quality = 'ultra',
    aspectRatio = '1:1',
    width = 1024,
    height = 1024,
    outputFormat = 'webp',
    outputQuality = 90,
    numOutputs = 1,
    guidanceScale = quality === 'ultra' ? 4.0 : 7.5,
    numInferenceSteps = quality === 'ultra' ? 40 : 50
  } = options;

  const modelNames = {
    standard: 'Flux Schnell',
    high: 'Google Nano Banana',
    ultra: 'Seedream 4.5'
  };

  console.log(`💅 Generating nail image with ${modelNames[quality]}: ${path.basename(outputPath)}`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);

  try {
    let apiUrl, requestBody;

    if (quality === 'ultra') {
      // Use Seedream 4.5 for hyperrealistic nail selfies
      apiUrl = 'https://api.replicate.com/v1/models/bytedance/seedream-4.5/predictions';
      requestBody = {
        input: {
          prompt: prompt,
          width: width,
          height: height,
          guidance_scale: guidanceScale,
          num_inference_steps: numInferenceSteps
        }
      };
    } else if (quality === 'high') {
      // Use Google Nano Banana for high quality
      apiUrl = 'https://api.replicate.com/v1/models/google/nano-banana/predictions';
      requestBody = {
        input: {
          prompt: prompt,
          width: width,
          height: height,
          guidance_scale: guidanceScale,
          num_inference_steps: numInferenceSteps,
          output_format: outputFormat
        }
      };
    } else {
      // Use Flux Schnell for standard quality
      apiUrl = 'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions';
      requestBody = {
        input: {
          prompt: prompt,
          aspect_ratio: aspectRatio,
          output_format: outputFormat,
          output_quality: outputQuality,
          num_outputs: numOutputs
        }
      };
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle different response formats
    let imageUrl;
    if (data.output) {
      imageUrl = Array.isArray(data.output) ? data.output[0] : data.output;
    }

    if (imageUrl) {
      console.log(`⬇️  Downloading from: ${imageUrl}`);

      const imageResponse = await fetch(imageUrl);
      const buffer = await imageResponse.arrayBuffer();

      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(outputPath, Buffer.from(buffer));
      console.log(`✅ Saved: ${outputPath}`);
      return outputPath;
    }

    throw new Error(`Generation failed: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error(`❌ Error generating image: ${error.message}`);
    throw error;
  }
}

/**
 * Generate multiple nail images in batch
 * @param {Array<{prompt: string, outputPath: string, options?: object}>} imageConfigs
 * @returns {Promise<string[]>} Paths to all saved images
 */
async function generateBatch(imageConfigs) {
  console.log(`🚀 Starting batch generation of ${imageConfigs.length} nail images\n`);

  const results = [];
  for (let i = 0; i < imageConfigs.length; i++) {
    const { prompt, outputPath, options } = imageConfigs[i];
    console.log(`[${i + 1}/${imageConfigs.length}]`);

    try {
      const result = await generateNailImage(prompt, outputPath, options);
      results.push(result);
      console.log('');
    } catch (error) {
      console.error(`Failed to generate ${outputPath}:`, error.message);
      console.log('');
    }
  }

  console.log(`\n✨ Batch complete: ${results.length}/${imageConfigs.length} nail images generated`);
  return results;
}

module.exports = { generateNailImage, generateBatch, QUALITY_LEVELS };

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(`
Usage:
  Standard:    node scripts/generate-nail-images.js <prompt> <output-path>
  High:        node scripts/generate-nail-images.js <prompt> <output-path> --high
  Ultra (HQ):  node scripts/generate-nail-images.js <prompt> <output-path> --ultra

Examples:
  # Standard quality (Flux Schnell) - thumbnails, blog posts
  node scripts/generate-nail-images.js "pink gel nails closeup" public/nails/pink-gel.webp

  # High quality (Google Nano Banana) - galleries
  node scripts/generate-nail-images.js "french manicure elegant hands" public/nails/french.webp --high

  # Ultra quality (Seedream 4.5) - hero images, hyperrealistic selfies
  node scripts/generate-nail-images.js "woman taking selfie showing off ombre nails" public/nails/ombre-selfie.webp --ultra
    `);
    process.exit(1);
  }

  const [prompt, outputPath, ...rest] = args;

  let quality = 'ultra'; // Default to best quality for nail designs
  if (rest.includes('--standard')) quality = 'standard';
  if (rest.includes('--high')) quality = 'high';
  if (rest.includes('--ultra')) quality = 'ultra';

  generateNailImage(prompt, outputPath, { quality })
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
```


## Aspect Ratio Guide for Nail Images

| Use Case | Aspect Ratio | Image Size | Best Model |
|----------|--------------|------------|------------|
| Instagram Feed | 1:1 | 1024×1024 | Seedream 4.5 |
| Instagram Stories/Reels | 9:16 | 1024×1820 | Seedream 4.5 |
| Nail Selfie (Portrait) | 4:5 | 1024×1280 | Seedream 4.5 |
| Blog Thumbnails | 16:9 | 1920×1080 | Flux Schnell |
| Gallery Grid | 1:1 | 1024×1024 | Nano Banana |
| Before/After | 1:1 | 1024×1024 | Seedream 4.5 |

## Nail Design Prompt Templates (Japanese Audience)

### Hyperrealistic Nail Selfie (Seedream 4.5)
```
Hyperrealistic iPhone selfie photo of a cute young Japanese woman showing off her fresh {NAIL_STYLE} manicure,
{NAIL_SHAPE} nails with {COLOR/DESIGN}, delicate hands gracefully posed {POSE},
natural daylight, trendy Tokyo cafe/bedroom background with soft bokeh,
social media style, authentic and candid, 8K quality, ultra detailed nail art, Japanese beauty aesthetic
```

### Close-up Nail Shot (All Models)
```
Professional close-up photograph of {NAIL_SHAPE} shaped nails with {COLOR/DESIGN},
delicate feminine Japanese hands, soft natural lighting, shallow depth of field,
Japanese nail salon quality, Instagram worthy, high detail, kawaii aesthetic
```

### Lifestyle Nail Photo (Seedream 4.5)
```
Hyperrealistic photo of young Japanese woman's hands with {NAIL_STYLE}, {COLOR} nails,
{ACTIVITY - holding matcha latte/holding boba tea/using iPhone/touching hair},
lifestyle photography, natural lighting, candid moment, 8K quality, Japanese beauty style
```

### Kawaii/Cute Style (Seedream 4.5)
```
Hyperrealistic selfie of cute Japanese girl showing off kawaii nail art,
{NAIL_SHAPE} nails with {CUTE_DESIGN - tiny hearts/ribbons/stars/3D charms},
soft pastel colors, delicate hands, purikura style lighting,
sweet and girly aesthetic, ultra detailed, 8K quality
```

### Korean-Japanese Trend Style (Seedream 4.5)
```
Hyperrealistic photo of young Japanese woman with trendy Korean-style nails,
{NAIL_SHAPE} shaped nails with {DESIGN - aurora finish/cat eye/magnetic/glass nails},
minimalist elegant design, natural soft lighting, beauty influencer style,
8K quality, ultra detailed, clean aesthetic
```

## Example: Generate Nail Design Gallery (Japanese Style)

Create `scripts/generate-nail-gallery.js`:

```javascript
const { generateBatch } = require('./generate-nail-images');

const nailDesigns = [
  {
    prompt: "Hyperrealistic selfie of cute young Japanese woman showing off fresh nuance nail design, almond shaped nails with sheer milky pink and subtle aurora shimmer, delicate hands near face, natural daylight, Tokyo cafe background, Instagram style, 8K quality, Japanese beauty aesthetic",
    outputPath: "public/nails/nuance-aurora-selfie.webp",
    options: { quality: 'ultra' }
  },
  {
    prompt: "Professional close-up of elegant almond nails with Korean-Japanese style magnetic cat eye design in champagne gold, delicate feminine Japanese hands, soft studio lighting, nail art detail shot, trendy and sophisticated",
    outputPath: "public/nails/cat-eye-champagne.webp",
    options: { quality: 'ultra' }
  },
  {
    prompt: "Hyperrealistic photo of young Japanese woman holding matcha latte showing off kawaii nail art with tiny 3D hearts and ribbon charms on soft pink base, lifestyle photography, natural light, cute aesthetic",
    outputPath: "public/nails/kawaii-3d-hearts.webp",
    options: { quality: 'ultra' }
  },
  {
    prompt: "Close-up of ballerina shaped nails with sheer nude ombre and delicate dried flower embeds, elegant Japanese hands, soft natural lighting, minimalist Japanese nail salon quality",
    outputPath: "public/nails/dried-flower-ombre.webp",
    options: { quality: 'ultra' }
  },
  {
    prompt: "Hyperrealistic selfie of Japanese girl showing off glass nails with holographic unicorn finish, almond shape, hands holding boba tea, Harajuku style background, trendy and girly, 8K quality",
    outputPath: "public/nails/glass-unicorn-boba.webp",
    options: { quality: 'ultra' }
  }
];

generateBatch(nailDesigns)
  .then(results => {
    console.log('\n💅 Japanese nail gallery images generated:');
    results.forEach(path => console.log(`  - ${path}`));
  })
  .catch(error => {
    console.error('Gallery generation failed:', error);
    process.exit(1);
  });
```

Run with:
```bash
node scripts/generate-nail-gallery.js
```

## Example: Generate Hero Nail Selfies (Japanese Girls)

Create `scripts/generate-hero-nails.js`:

```javascript
const { generateBatch } = require('./generate-nail-images');

const heroNails = [
  {
    prompt: "Stunning hyperrealistic iPhone selfie of cute young Japanese woman with perfect porcelain skin showing off her fresh gel manicure, soft sakura pink almond nails with subtle pearl shimmer and tiny crystal accent, delicate hands gracefully framing her smiling face, golden hour natural lighting through window, cozy Tokyo apartment background with soft bokeh, authentic social media style, ultra realistic skin texture, 8K quality, Japanese beauty magazine worthy",
    outputPath: "public/hero/nail-selfie-sakura.webp",
    options: { quality: 'ultra', width: 1024, height: 1280 }
  },
  {
    prompt: "Hyperrealistic close-up of young Japanese woman's hands with trendy Korean-Japanese style nails, ballerina shape with sheer milky white and aurora chrome finish, hands holding iPhone taking mirror selfie, natural daylight, beauty influencer style, ultra detailed, photorealistic, clean aesthetic",
    outputPath: "public/hero/aurora-mirror-selfie.webp",
    options: { quality: 'ultra' }
  },
  {
    prompt: "Hyperrealistic selfie of adorable Japanese girl showing off kawaii nail art, oval shaped nails with pastel lavender base and tiny 3D teddy bear charms, sweet smile, purikura style soft lighting, Sanrio aesthetic, cute and girly, 8K quality",
    outputPath: "public/hero/kawaii-teddy-nails.webp",
    options: { quality: 'ultra', width: 1024, height: 1280 }
  }
];

generateBatch(heroNails)
  .then(results => {
    console.log('\n✨ Hero nail images generated:');
    results.forEach(path => console.log(`  - ${path}`));
  })
  .catch(error => {
    console.error('Hero generation failed:', error);
    process.exit(1);
  });
```

Run with:
```bash
node scripts/generate-hero-nails.js
```

## Image Optimization Tips

1. **WebP Format**: Always use WebP for ~30% smaller file sizes vs PNG/JPG
2. **Quality Setting**: 90 is optimal balance between quality and file size
3. **Lazy Loading**: Use Next.js `<Image>` component with `loading="lazy"`
4. **Alt Text**: Always include descriptive alt text with nail design keywords
5. **Responsive Images**: Next.js Image component handles srcset automatically
6. **Square Images**: Use 1:1 ratio for most nail photos (Instagram-ready)

## SEO Optimization for Nail Images (Japanese Market)

### File Naming Convention
```
{color}-{style}-{shape}-nails.webp

Examples:
- sakura-pink-nuance-almond-nails.webp
- aurora-cat-eye-oval-nails.webp
- milky-white-glass-ballerina-nails.webp
- kawaii-3d-heart-almond-nails.webp
- sheer-nude-ombre-oval-nails.webp
- pastel-lavender-pearl-nails.webp
```

### Alt Text Template
```
"AI generated {color} {style} nail design on {shape} shaped nails - {additional details}"

Examples:
- "AI generated sakura pink nuance nail design on almond shaped nails - Japanese gel manicure"
- "AI generated aurora cat eye nail design on oval shaped nails - Korean-Japanese trend"
- "AI generated kawaii 3D heart nail art on almond nails - cute Japanese style with crystals"
- "AI generated milky white glass nail design on ballerina nails - sheer holographic finish"
- "AI generated sheer nude ombre nail design on oval nails - minimalist Japanese aesthetic"
```

### Japanese SEO Keywords to Include
- ネイルデザイン (nail design)
- ジェルネイル (gel nail)
- ニュアンスネイル (nuance nail)
- 韓国ネイル (Korean nail)
- かわいいネイル (kawaii/cute nail)

## When to Use Each Quality Level

| Quality Level | Model | Best For | Speed | Cost |
|--------------|-------|----------|-------|------|
| **Ultra** | Seedream 4.5 | Hero images, nail selfies, landing pages, premium content | Slowest (30-60s) | Highest |
| **High** | Nano Banana | Gallery images, blog posts, social media | Medium (15-30s) | Medium |
| **Standard** | Flux Schnell | Thumbnails, placeholders, bulk content | Fastest (3-8s) | Lowest |

### Recommended Usage

**Always use Seedream 4.5 (Ultra) for:**
- Landing page hero images
- Nail design showcase/gallery (main images)
- Social media feature posts
- Any image where the nail needs to look like a real photo
- Selfie-style nail photos

**Use Nano Banana (High) for:**
- Blog post featured images
- Category page thumbnails
- Secondary gallery images

**Use Flux Schnell (Standard) for:**
- Blog post inline images
- Quick mockups and testing
- High-volume batch generation where speed matters

### Quality Comparison Example


## Troubleshooting

### Common Issues

**Error: `REPLICATE_API_TOKEN not found`**
- Solution: Add token to `.env.local` and restart your development server

**Error: `Generation failed: insufficient credits`**
- Solution: Add credits to your Replicate account at https://replicate.com/billing

**Error: `Invalid aspect ratio` (Flux Schnell)**
- Solution: Use one of: `1:1`, `16:9`, `21:9`, `2:3`, `3:2`, `4:5`, `5:4`, `9:16`, `9:21`

**Error: `Invalid dimensions` (Nano Banana/Seedream)**
- Solution: Keep width and height between 512 and 1024 pixels for best results

**Nails look unrealistic or artificial**
- Solution: Use Seedream 4.5 with prompts that include "hyperrealistic", "iPhone selfie", "authentic", "candid"
- Add Japanese lifestyle context: "holding matcha latte", "holding boba tea", "using iPhone"
- Include lighting details: "natural daylight", "purikura style lighting", "soft window light"
- Specify "Japanese beauty aesthetic" for more natural, softer look

**Hands look distorted or wrong**
- Solution: Keep prompts focused on the nails, use "delicate feminine Japanese hands", "elegant fingers"
- Avoid complex hand poses in the prompt
- Use Seedream 4.5 which handles anatomy better

**Model doesn't look Japanese**
- Solution: Always include "young Japanese woman" or "Japanese girl" explicitly in prompt
- Add Japanese context: "Tokyo cafe", "Harajuku style", "Japanese beauty aesthetic"
- Use Japanese lifestyle elements: matcha, boba tea, purikura

**Nail style doesn't match Japanese trends**
- Solution: Use Japan-specific trends: nuance nails, aurora, cat eye, glass nails
- Favor softer colors: sakura pink, milky white, sheer nude, soft pastels
- Use almond or oval shapes (most popular in Japan)
- Avoid overly bold or dramatic Western styles

**Nail shape not matching prompt**
- Solution: Be explicit: "stiletto shaped nails", "coffin/ballerina shaped nails", "almond shaped nails", "square shaped nails"

**High quality images taking too long**
- Seedream 4.5: 30-60 seconds (normal)
- Nano Banana: 15-30 seconds (normal)
- For faster results during testing, use Flux Schnell first

**Inconsistent nail design style**
- Solution: Use consistent prompt templates
- Include specific color names: "dusty rose", "cherry red", "nude beige"
- Specify finish: "glossy gel", "matte", "chrome mirror", "shimmer"


## Resources

- **Replicate Documentation**: https://replicate.com/docs
- **Flux Schnell Model**: https://replicate.com/black-forest-labs/flux-schnell
- **Google Nano Banana Model**: https://replicate.com/google/nano-banana
- **Seedream 4.5 Model**: https://replicate.com/bytedance/seedream-4.5
- **Prompt Engineering Guide**: https://replicate.com/docs/guides/prompt-engineering
- **API Reference**: https://replicate.com/docs/reference/http

## Nail Design Prompt Keywords (Japanese Market)

### Nail Shapes (Popular in Japan)
- Almond (most popular), Oval, Ballerina/Coffin, Round, Squoval
- Note: Japanese nail trends favor softer, more natural shapes like almond and oval

### Nail Finishes
- Glossy gel, Sheer/translucent, Matte, Chrome mirror, Aurora/unicorn, Cat eye/magnetic, Glass nails, Velvet, Pearl shimmer, Holographic

### Japanese Nail Trends & Styles
- **Nuance nails** (ニュアンスネイル) - Subtle, watercolor-like designs with soft gradients
- **Aurora nails** - Iridescent, holographic finish popular in Japan
- **Cat eye/Magnetic nails** - Magnetic polish creating 3D light effects
- **Glass nails** - Ultra shiny, transparent, mirror-like finish
- **Korean-Japanese style** - Minimalist, clean, sophisticated designs
- **Kawaii nails** - Cute designs with 3D charms, ribbons, hearts, characters
- **Dried flower nails** - Real dried flowers embedded in clear gel
- **Marble/stone nails** - Natural stone patterns
- **French variations** - Thin French tips, gradient French, colored French
- **One-color with accent** - Simple base with one decorated nail
- **Syrup nails** - Sheer, jelly-like translucent colors

### Colors Popular with Japanese Girls
- **Pinks**: Sakura pink, milky pink, dusty rose, baby pink, mauve pink
- **Nudes**: Sheer nude, milky beige, champagne, soft peach
- **Whites**: Milky white, sheer white, pearl white, opal white
- **Pastels**: Lavender, mint green, soft blue, peach, butter yellow
- **Trendy**: Terracotta, dusty mauve, sage green, muted coral
- **Bold accents**: Burgundy, navy, forest green (usually as accent only)

### 3D Nail Art Elements (Kawaii Style)
- Tiny hearts, ribbons, bows, stars, moons
- Swarovski crystals, pearls, rhinestones
- 3D flowers, butterflies, teddy bears
- Sanrio-inspired charms (subtle, not branded)
- Gold/silver line art, foil accents

### Lifestyle Contexts (Japanese Settings)
- Holding matcha latte, holding boba/tapioca tea
- Using iPhone/smartphone, taking purikura
- At Tokyo cafe, in trendy Harajuku area
- Touching hair, adjusting earring
- Holding cute stationery, holding shopping bag
- Cherry blossom season setting, autumn leaves background

### Japanese Beauty Descriptors
- "Japanese beauty aesthetic", "Japanese nail salon quality"
- "Kawaii aesthetic", "cute and girly"
- "Korean-Japanese style", "K-beauty inspired"
- "Purikura style lighting" (soft, flattering)
- "Tokyo trendy", "Harajuku style"
- "Clean aesthetic", "minimalist Japanese"

## Best Practices Summary (Japanese Audience)

✅ **DO**
- Use Seedream 4.5 for all hero nail images and main gallery photos
- Always specify "young Japanese woman" or "Japanese girl" in prompts
- Write prompts that describe authentic selfies Japanese girls would take
- Include "hyperrealistic", "iPhone selfie", "authentic" for best realism
- Use Japanese nail trends: nuance nails, aurora, cat eye, glass nails, kawaii
- Specify nail shape (almond and oval are most popular in Japan)
- Use Japan-specific colors: sakura pink, milky pink, sheer nude, soft pastels
- Add Japanese lifestyle context: matcha latte, boba tea, Tokyo cafe, purikura
- Include "Japanese beauty aesthetic" or "Japanese nail salon quality"
- End prompts with "8K quality, ultra detailed nail art"
- Use soft, flattering lighting like "purikura style" or "natural daylight"
- Use 1:1 aspect ratio for Instagram-ready images
- Use 4:5 or 9:16 for portrait/story style selfies
- For kawaii style, include 3D elements: tiny hearts, ribbons, crystals, charms
- Test prompts with Flux Schnell before using Seedream 4.5
- Batch generate similar nail styles together
- Use WebP format for web images

❌ **DON'T**
- Use vague prompts like "pretty nails" or "nice manicure"
- Use Western-centric styles without adapting to Japanese trends
- Forget to specify the model is Japanese
- Use overly bold/dramatic nail styles (Japanese trends favor softer aesthetics)
- Forget to specify nail shape (almond is safest default)
- Use complex hand poses that may cause distortion
- Generate hero images with Flux Schnell (use Seedream 4.5)
- Forget alt text with nail design keywords for SEO
- Use PNG/JPG when WebP is available
- Skip color specificity (say "sakura pink" not just "pink")
- Ignore the lighting and context in prompts
- Use ultra quality for every single image (test with standard first)
- Use stiletto or extreme nail shapes (less popular in Japan)
