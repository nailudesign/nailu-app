# Gallery Image Generation Guide

## Quick Start

### 1. Set up your Replicate API token

```bash
# Get your token from: https://replicate.com/account/api-tokens
export REPLICATE_API_TOKEN=your_token_here
```

Or add it to `.env.local`:
```
REPLICATE_API_TOKEN=your_token_here
```

### 2. Generate all gallery images

```bash
node scripts/generate-gallery.js
```

This will generate 20 high-quality nail design images using Seedream 4.5:
- Sakura pink ombre
- Nuance marble
- Aurora glass
- Milky gold foil
- Kawaii hearts
- Cat eye rose
- Ribbon pink
- Dried flower
- Modern French
- Syrup peach
- Burgundy magnetic
- Ivory aurora
- Y2K chrome
- Minimalist gold
- Plump pink pearl
- Terracotta nuance
- Velvet mauve
- Mirror chrome
- Stone marble
- Baby blue glitter

### 3. Images will be saved to

```
public/gallery-*.png
```

### 4. Expected generation time

- Each image: ~30-60 seconds
- Total for 20 images: ~15-20 minutes

### 5. Cost estimate

- Seedream 4.5: ~$0.05 per image
- Total for 20 images: ~$1.00

## What the script does

1. Connects to Replicate API using Seedream 4.5 model
2. Generates hyperrealistic Japanese nail design images
3. Downloads and saves them to the public folder
4. All images are 1024x1024px, perfect for the gallery

## Troubleshooting

**Error: REPLICATE_API_TOKEN not found**
- Make sure you've exported the token or added it to .env.local

**Error: insufficient credits**
- Add credits at https://replicate.com/billing

**Generation is slow**
- This is normal! Seedream 4.5 creates ultra-high quality images
- Each image takes 30-60 seconds

## After generation

The gallery images will automatically be ready to use. The filenames follow this pattern:
- `gallery-sakura-pink-ombre.png`
- `gallery-nuance-marble.png`
- etc.

You can then update the gallery array in `src/app/page.tsx` to use these new images!
