import os
import base64
from PIL import Image

def make_hd_svg():
    input_path = os.path.join("frontend", "public", "images", "solutions", "wrapped-pallets-warehouse.jpg")
    output_svg = os.path.join("frontend", "public", "images", "regional_hubs", "pallet_wrap_hd.svg")

    with Image.open(input_path) as img:
        w, h = img.size

    with open(input_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {w} {h}" width="100%" height="100%">
  <image width="{w}" height="{h}" xlink:href="data:image/jpeg;base64,{encoded}"/>
</svg>'''

    with open(output_svg, "w", encoding="utf-8") as f:
        f.write(svg_content)

    print(f"Successfully created {output_svg} ({w}x{h})")

if __name__ == "__main__":
    make_hd_svg()
