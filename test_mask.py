from PIL import Image

try:
    img = Image.open('public/hero-mask.png')
    print("Mode:", img.mode)
    print("Size:", img.size)

    # Check if there's an alpha channel and if it has varying values
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA').split()[-1]
        extrema = alpha.getextrema()
        print("Alpha Extrema:", extrema)
    else:
        print("No alpha channel detected.")

    # Check colors
    colors = img.getcolors(maxcolors=10)
    print("Top colors:", colors)
except Exception as e:
    print("Error:", e)
