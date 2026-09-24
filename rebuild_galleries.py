import os
import glob
import re

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
html_files = glob.glob(os.path.join(base_dir, "adventures/**/*.html"), recursive=True)

def make_item(img_path_rel):
    return f"""                <div class="col-12 col-sm-6 col-lg-4 single_gallery_item mb-30 wow fadeInUp" data-wow-delay="300ms">
                    <div class="gallery-card">
                        <img loading="lazy" src="{img_path_rel}" alt="WUCC climbing photo">
                        <div class="gallery-overlay">
                            <a href="{img_path_rel}" class="gallery-zoom-btn">+</a>
                        </div>
                    </div>
                </div>\n"""

exclude_files = {"cover.jpg", "cover.jpeg", "cover.png", "preview.jpg", "preview.jpeg", "preview.png"}

rebuilt = 0
for html_path in html_files:
    # skip index pages
    if html_path.endswith("adventures/tripsandtours/index.html") or html_path.endswith("adventures/comps/index.html") or html_path.endswith("adventures/archives/index.html"):
        continue
        
    with open(html_path, "r") as f:
        html = f.read()
        
    # Determine image directory
    # Try to find from banner or existing images
    match = re.search(r'(/img/(?:trips|tour|comps|crags)/[^/]+/)', html)
    
    if not match:
        # Fallback for crags if they used the default cover
        if "/archives/" in html_path:
            folder = os.path.basename(os.path.dirname(html_path))
            img_dir_rel = f"/img/crags/{folder}/"
        else:
            print(f"Could not find img dir for {html_path}")
            continue
    else:
        img_dir_rel = match.group(1)
        # Avoid the bg-img fallback
        if "bg-img" in img_dir_rel and "/archives/" in html_path:
            folder = os.path.basename(os.path.dirname(html_path))
            img_dir_rel = f"/img/crags/{folder}/"
            
    img_dir_abs = os.path.join(base_dir, img_dir_rel.strip("/"))
    
    if not os.path.isdir(img_dir_abs):
        print(f"Img dir not found: {img_dir_abs}")
        continue
        
    # Gather all valid images
    valid_images = []
    for ext in ["*.jpg", "*.jpeg", "*.png", "*.webp"]:
        valid_images.extend(glob.glob(os.path.join(img_dir_abs, ext)))
        
    gallery_items_html = ""
    
    # Sort files to ensure nice order (1.jpg, 2.jpg etc.)
    def sort_key(filepath):
        name = os.path.basename(filepath)
        name_no_ext = os.path.splitext(name)[0]
        if name_no_ext.isdigit():
            return (0, int(name_no_ext))
        return (1, name)
        
    valid_images.sort(key=sort_key)
    
    for img_path in valid_images:
        filename = os.path.basename(img_path)
        if filename.lower() not in exclude_files:
            gallery_items_html += make_item(img_dir_rel + filename)
            
    # Now remove ALL existing gallery items from the HTML
    clean_html = re.sub(r'\s*<div class="col-12[^>]*single_gallery_item[^>]*>[\s\S]*?</div>\s*</div>\s*</div>', '', html)
    
    # Inject new gallery items
    inj1 = '<div class="col-12">\n                    <div class="about-us-content" style="text-align:center;">'
    inj2 = '            </div>\n        </div>\n    </div>\n    \n    <div style="height:100px;"></div>'
    
    if inj1 in clean_html:
        parts = clean_html.split(inj1)
        new_html = parts[0] + "\n" + gallery_items_html + "                " + inj1 + parts[1]
    elif inj2 in clean_html:
        parts = clean_html.split(inj2)
        new_html = parts[0] + "\n" + gallery_items_html + inj2 + parts[1]
    else:
        # Some comps might have a different ending
        inj3 = '<!-- About Us Area End -->'
        if inj3 in clean_html:
            # this is a bit risky but we can inject before it
            # Let's find the closing tags of the container row
            inj3_full = '            </div>\n        </div>\n    </div>\n    <!-- About Us Area End -->'
            if inj3_full in clean_html:
                parts = clean_html.split(inj3_full)
                new_html = parts[0] + "\n" + gallery_items_html + inj3_full + parts[1]
            else:
                print(f"Could not find injection point for {html_path}")
                continue
        else:
            print(f"Could not find injection point for {html_path}")
            continue
            
    with open(html_path, "w") as f:
        f.write(new_html)
    rebuilt += 1

print(f"Rebuilt {rebuilt} galleries")
