import os
import re

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
archives_dir = os.path.join(base_dir, "adventures/archives")

crags_dir = os.path.join(base_dir, "img/crags")
crag_folders = [f for f in os.listdir(crags_dir) if os.path.isdir(os.path.join(crags_dir, f)) and f != "bg-img"]

def format_name(folder_name):
    return folder_name.replace('_', ' ').title()

for folder in crag_folders:
    folder_path = os.path.join(archives_dir, folder)
    if os.path.exists(os.path.join(folder_path, "index.html")):
        with open(os.path.join(folder_path, "index.html"), "r") as f:
            content = f.read()
            
        name = format_name(folder)
        
        # Fix title (because original template had <br>)
        content = re.sub(r'<h1 class="page-banner-title">[^<]*(<br>[^<]*)?</h1>', f'<h1 class="page-banner-title">{name}</h1>', content)
        
        # Fix missing covers
        has_webp = os.path.exists(os.path.join(crags_dir, folder, "cover.webp"))
        has_jpg = os.path.exists(os.path.join(crags_dir, folder, "cover.jpg"))
        
        if not has_webp and not has_jpg:
            # Replaces anything like:
            # <source type="image/webp" srcset="/img/crags/napton/cover.webp">
            # <source type="image/webp" srcset="/img/crags/napton/cover.jpg">
            content = re.sub(r'<source type="image/webp" srcset="/img/crags/[^/]+/cover\.(webp|jpg)">', '<source type="image/jpeg" srcset="/img/crags/bg-img/crags_cover.jpg">', content)
            
            # Replaces img fallback
            content = re.sub(r'<img src="/img/crags/[^/]+/cover\.(webp|jpg)" alt="WUCC page banner"', '<img src="/img/crags/bg-img/crags_cover.jpg" alt="WUCC page banner"', content)
            
        with open(os.path.join(folder_path, "index.html"), "w") as f:
            f.write(content)

print("Fixed banners globally")
