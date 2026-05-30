# 🎨 Before/After Image Generation Guide
## Perfect Hero Section Images

---

## 📐 Base Composition (Consistent Across All Images)

**Hand Position:**
- Close-up of elegant Japanese woman's hands
- Resting on clean white marble desk surface
- Almond shaped nails
- Fingers slightly curved, natural relaxed pose
- Both hands visible, positioned symmetrically

**Lighting:**
- Soft natural window lighting from the left
- No harsh shadows
- Even, diffused light
- Warm, inviting tone

**Background:**
- Clean white marble desk surface
- Minimalist aesthetic
- Shallow depth of field (blurred background)
- No distracting elements

**Quality:**
- 8K quality
- Ultra detailed
- Photorealistic
- Professional photography style

---

## 🖼️ Image Prompts

### BEFORE Image

```
Professional close-up photograph of elegant Japanese woman's hands resting on a clean white marble desk surface, almond shaped nails, hands positioned naturally with fingers slightly curved, soft natural window lighting from the left, minimalist aesthetic, shallow depth of field, 8K quality, ultra detailed, photorealistic, completely natural bare nails with no polish or decoration, clean and well-manicured natural nails, healthy nail beds, realistic skin texture
```

**Key Points:**
- ❌ NO polish
- ❌ NO decoration
- ❌ NO manicure designs
- ✅ Natural bare nails only
- ✅ Clean, healthy appearance

**Output filename:** `hero-before-natural.png`

---

### AFTER Image 1: Cheek Nails

```
Professional close-up photograph of elegant Japanese woman's hands resting on a clean white marble desk surface, almond shaped nails, hands positioned naturally with fingers slightly curved, soft natural window lighting from the left, minimalist aesthetic, shallow depth of field, 8K quality, ultra detailed, photorealistic, cheek nail design with sheer pink base and soft coral gradient at the center like blushed cheeks, glossy finish, cute and feminine aesthetic, trendy Japanese nail salon style
```

**Style Details:**
- 🎨 Sheer pink base color
- 💗 Soft coral gradient at nail center
- ✨ Glossy, reflective finish
- 🌸 Blush-like effect (like makeup cheeks)
- 💕 Cute and feminine vibe

**Output filename:** `hero-after-cheek-nails.png`

---

### AFTER Image 2: Glass French

```
Professional close-up photograph of elegant Japanese woman's hands resting on a clean white marble desk surface, almond shaped nails, hands positioned naturally with fingers slightly curved, soft natural window lighting from the left, minimalist aesthetic, shallow depth of field, 8K quality, ultra detailed, photorealistic, glass French manicure with sheer transparent nude pink base and glossy white tips with reflective glass-like finish, delicate minimalist design, ultra shiny and reflective, sophisticated Japanese style
```

**Style Details:**
- 🪟 Transparent nude pink base
- ⚪ Glossy white tips
- 💎 Glass-like reflective finish
- ✨ Ultra shiny surface
- 🎯 Minimalist, sophisticated
- 🇫🇷 Modern French manicure style

**Output filename:** `hero-after-glass-french.png`

---

### AFTER Image 3: Nuance

```
Professional close-up photograph of elegant Japanese woman's hands resting on a clean white marble desk surface, almond shaped nails, hands positioned naturally with fingers slightly curved, soft natural window lighting from the left, minimalist aesthetic, shallow depth of field, 8K quality, ultra detailed, photorealistic, nuance nail design with soft beige and cream marble swirls, subtle brown watercolor effect with tiny gold flakes, muted neutral colors, elegant and understated aesthetic, Korean-Japanese minimalist style
```

**Style Details:**
- 🤎 Soft beige and cream colors
- 🌊 Marble swirl patterns
- 🎨 Watercolor effect
- ✨ Tiny gold flakes
- 🎯 Muted, neutral palette
- 🇰🇷🇯🇵 Korean-Japanese minimalist aesthetic
- 💫 Elegant and understated

**Output filename:** `hero-after-nuance.png`

---

### AFTER Image 4: Ribbon

```
Professional close-up photograph of elegant Japanese woman's hands resting on a clean white marble desk surface, almond shaped nails, hands positioned naturally with fingers slightly curved, soft natural window lighting from the left, minimalist aesthetic, shallow depth of field, 8K quality, ultra detailed, photorealistic, ribbon nail design with sheer baby pink base and delicate 3D white ribbon charms on accent nails with tiny pearls, cute and playful aesthetic, gentle pastel colors, kawaii Japanese style
```

**Style Details:**
- 🎀 Sheer baby pink base
- 🎗️ 3D white ribbon charms
- 💎 Tiny pearl accents
- 🌸 Accent nails (not all nails)
- 🍬 Gentle pastel colors
- 🇯🇵 Kawaii Japanese aesthetic
- 💕 Cute and playful vibe

**Output filename:** `hero-after-ribbon.png`

---

## 🎯 Consistency Checklist

When generating images, ensure:

### ✅ Same Elements:
- [ ] Hand position identical
- [ ] White marble desk surface
- [ ] Natural window lighting from left
- [ ] Almond shaped nails
- [ ] Fingers slightly curved
- [ ] Shallow depth of field
- [ ] 8K quality, photorealistic

### ❌ Only This Changes:
- [ ] Nail design/polish
- [ ] Nail decoration
- [ ] Nail finish (matte/glossy)

### 🚫 Never Change:
- Hand pose
- Background
- Lighting direction
- Skin tone
- Hand size/shape
- Camera angle

---

## 🔧 For Inpainting/Editing

If using inpainting to modify existing images:

1. **Load Before image** as base
2. **Mask only the nails** (fingernails area)
3. **Keep everything else** (hands, background, lighting)
4. **Apply nail design prompt** from above
5. **Generate** with high detail settings

**Mask area:** Only fingernails (10 nails total)  
**Keep untouched:** Hands, skin, background, lighting

---

## 📊 Technical Specifications

| Parameter | Value |
|-----------|-------|
| Resolution | 1024x1024 |
| Aspect Ratio | 1:1 (square) |
| Format | PNG |
| Quality | 8K, ultra detailed |
| Style | Photorealistic |
| Lighting | Natural, soft |
| Focus | Close-up hands |

---

## 🎨 AI Tool Settings

### For Midjourney:
```
--ar 1:1 --q 2 --style raw --v 6
```

### For DALL-E 3:
```
Style: Natural, Photographic
Quality: HD
```

### For Stable Diffusion:
```
Steps: 50
CFG Scale: 7-9
Sampler: DPM++ 2M Karras
```

### For Seedream (Replicate):
```
width: 1024
height: 1024
num_inference_steps: 28
guidance_scale: 3.5
```

---

## 📝 Usage in Website

### Update page.tsx:

```typescript
// Before image
const beforeImage = "/hero-before-natural.png";

// After images for slider
const trendStyles = [
  { name: "Cheek Nails", img: "/hero-after-cheek-nails.png", label: "チークネイル" },
  { name: "Glass French", img: "/hero-after-glass-french.png", label: "ガラスフレンチ" },
  { name: "Nuance", img: "/hero-after-nuance.png", label: "ニュアンス" },
  { name: "Ribbon", img: "/hero-after-ribbon.png", label: "リボン" },
];
```

---

## 🎯 Expected Results

### Before Image:
- Natural, clean hands
- No nail polish
- Professional but approachable
- Inviting, warm feeling

### After Images:
- Same hands, transformed
- Professional nail art
- Instagram-worthy quality
- Clear visual difference from Before
- Maintains natural, realistic look

---

## 💡 Tips for Best Results

1. **Use the same seed** (if your AI tool supports it) for consistency
2. **Generate Before first**, then use it as reference for After images
3. **Keep prompts identical** except for nail design part
4. **Test multiple generations** and pick the most consistent set
5. **Check hand position** - fingers should be in same pose
6. **Verify lighting** - shadows should fall in same direction

---

**Created:** 2026-01-24  
**Purpose:** Hero section before/after slider  
**Total Images:** 5 (1 Before + 4 After styles)
