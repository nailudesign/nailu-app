const sharp = require('sharp');
const path = require('path');

async function createDummyMask() {
    console.log('🎨 Creating Dummy Nail Mask (Wider Composition)...');

    const width = 1024;
    const height = 1360;

    // For a "medium shot" of hands, the fingers will be smaller and more central/lower-central
    // Adjusting ellipses to be smaller and clustered in the center-bottom area
    const svgOverlay = `
    <svg width="${width}" height="${height}">
        <!-- General area where fingertips usually land in a medium shot on table -->
        
        <!-- Thumb -->
        <ellipse cx="300" cy="850" rx="40" ry="50" fill="white" />
        
        <!-- Index -->
        <ellipse cx="400" cy="750" rx="35" ry="45" fill="white" />
        
        <!-- Middle -->
        <ellipse cx="512" cy="720" rx="35" ry="45" fill="white" />
        
        <!-- Ring -->
        <ellipse cx="624" cy="750" rx="35" ry="45" fill="white" />
        
        <!-- Pinky -->
        <ellipse cx="724" cy="820" rx="30" ry="40" fill="white" />
        
        <!-- Second hand (if visible) or just general "nails area" coverage -->
        <!-- Since prompt said "hands" (plural), let's add a few more potential spots for the other hand -->
        <!-- Usually left hand is main, right might be resting nearby -->
        
        <ellipse cx="850" cy="900" rx="40" ry="50" fill="white" />
    </svg>
    `;

    try {
        await sharp({
            create: {
                width: width,
                height: height,
                channels: 3,
                background: { r: 0, g: 0, b: 0 }
            }
        })
            .composite([
                { input: Buffer.from(svgOverlay), top: 0, left: 0 }
            ])
            .png()
            .toFile(path.join(process.cwd(), 'public', 'hero-mask.png'));

        console.log('✅ Saved: public/hero-mask.png');

    } catch (error) {
        console.error('❌ Failed:', error);
    }
}

createDummyMask();
