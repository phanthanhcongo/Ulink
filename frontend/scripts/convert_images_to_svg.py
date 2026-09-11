import os
from PIL import Image
import vtracer
import base64

def convert_to_svg_vector(input_path, output_path):
    print(f"Vectorizing {input_path} -> {output_path}...")
    vtracer.convert_image_to_svg_py(
        input_path,
        output_path,
        colormode='color',
        hierarchical='stacked',
        mode='spline',
        filter_speckle=4,
        color_precision=6,
        layer_difference=16,
        corner_threshold=60,
        length_threshold=4.0,
        max_iterations=10,
        splice_threshold=45,
        path_precision=3
    )
    print(f"Done vectorizing: {output_path} ({os.path.getsize(output_path)} bytes)")

def convert_to_svg_embedded(input_path, output_path):
    print(f"Embedding SVG {input_path} -> {output_path}...")
    with Image.open(input_path) as img:
        width, height = img.size
        img_format = img.format.lower()
        if img_format == 'jpeg':
            img_format = 'jpg'
        mime_type = f"image/{'jpeg' if img_format == 'jpg' else img_format}"

    with open(input_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <image width="{width}" height="{height}" xlink:href="data:{mime_type};base64,{encoded}"/>
</svg>'''

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Done embedding: {output_path} ({os.path.getsize(output_path)} bytes)")

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # 1. Glove image
    glove_in = os.path.join(base_dir, "public", "images", "home", "section2", "glove_nitrile_ai.jpg")
    glove_svg = os.path.join(base_dir, "public", "images", "home", "section2", "glove_nitrile_ai.svg")
    glove_vector_svg = os.path.join(base_dir, "public", "images", "home", "section2", "glove_nitrile_ai_vector.svg")
    
    # 2. Pallet Frame image
    pallet_in = os.path.join(base_dir, "public", "images", "regional_hubs", "Frame 427318307.png")
    pallet_svg = os.path.join(base_dir, "public", "images", "regional_hubs", "Frame 427318307.svg")
    pallet_vector_svg = os.path.join(base_dir, "public", "images", "regional_hubs", "Frame_427318307_vector.svg")

    if os.path.exists(glove_in):
        convert_to_svg_embedded(glove_in, glove_svg)
        convert_to_svg_vector(glove_in, glove_vector_svg)

    if os.path.exists(pallet_in):
        convert_to_svg_embedded(pallet_in, pallet_svg)
        convert_to_svg_vector(pallet_in, pallet_vector_svg)
