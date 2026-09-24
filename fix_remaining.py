import os
import glob
import re

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
html_files = glob.glob(os.path.join(base_dir, "adventures/**/*.html"), recursive=True)

exclude_files = {"cover.jpg", "cover.jpeg", "cover.png", "preview.jpg", "preview.jpeg", "preview.png"}

def make_item(img_path_rel):
    return f"""                <div class="col-12 col-sm-6 col-lg-4 single_gallery_item mb-30 wow fadeInUp" data-wow-delay="300ms">
                    <div class="gallery-card">
                        <img loading="lazy" src="{img_path_rel}" alt="WUCC climbing photo">
                        <div class="gallery-overlay">
                            <a href="{img_path_rel}" class="gallery-zoom-btn">+</a>
                        </div>
                    </div>
                </div>\n"""

rebuilt = 0
for html_path in html_files:
    if html_path.endswith("index.html") and html_path.count("/") <= 6:
        # Avoid main index pages, just process trip/comp pages
        pass
        
    with open(html_path, "r") as f:
        html = f.read()
        
    # See if it has single_gallery_item. If not, it means it was deleted by my previous script.
    if 'single_gallery_item' in html:
        # This one wasn't completely emptied, but we can still rebuild it to be safe,
        # actually let's rebuild everything to be perfectly consistent.
        pass
        
    match = re.search(r'(/img/(?:trips|tour|competitions|crags)/[^/]+/)', html)
    if not match:
        continue
        
    img_dir_rel = match.group(1)
    img_dir_abs = os.path.join(base_dir, img_dir_rel.strip("/"))
    
    if not os.path.isdir(img_dir_abs):
        continue
        
    valid_images = []
    for ext in ["*.jpg", "*.jpeg", "*.png", "*.webp"]:
        valid_images.extend(glob.glob(os.path.join(img_dir_abs, ext)))
        
    def sort_key(filepath):
        name = os.path.basename(filepath)
        name_no_ext = os.path.splitext(name)[0]
        if name_no_ext.isdigit():
            return (0, int(name_no_ext))
        return (1, name)
        
    valid_images.sort(key=sort_key)
    
    gallery_items_html = ""
    for img_path in valid_images:
        filename = os.path.basename(img_path)
        if filename.lower() not in exclude_files:
            gallery_items_html += make_item(img_dir_rel + filename)
            
    # Clean it
    clean_html = re.sub(r'\s*<div class="col-12[^>]*single_gallery_item[^>]*>[\s\S]*?</div>\s*</div>\s*</div>', '', html)
    # Also clean the previous manual injection of cover/preview in elchorro
    clean_html = re.sub(r'<!-- Gallery Items -->', '', clean_html)
    
    # Inject after the about-us-content div
    # It looks like:
    #                 </div>
    #             </div>
    # (Here is where gallery items go)
    # 
    # Let's find the about-us-content block end
    pattern = re.compile(r'(<div class="about-us-content[^>]*>[\s\S]*?</div>\s*</div>)')
    
    # Find the FIRST about-us-content in the container row
    match2 = pattern.search(clean_html)
    if match2:
        parts = [clean_html[:match2.end()], clean_html[match2.end():]]
        new_html = parts[0] + "\n                <!-- Gallery Items -->\n" + gallery_items_html + parts[1]
        with open(html_path, "w") as f:
            f.write(new_html)
        rebuilt += 1
    else:
        print(f"Failed to find injection point for {html_path}")

print(f"Rebuilt {rebuilt} galleries")
