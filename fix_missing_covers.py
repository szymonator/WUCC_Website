import os
import re

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
archives_dir = os.path.join(base_dir, "adventures/archives")

missing_covers = ["cademan3", "castle_rock", "malvern_hills", "napton", "stable_pit", "warp_pipe"]

for folder in missing_covers:
    folder_path = os.path.join(archives_dir, folder)
    if os.path.exists(os.path.join(folder_path, "index.html")):
        with open(os.path.join(folder_path, "index.html"), "r") as f:
            content = f.read()
            
        # Replace the cover.webp and cover.jpg with crags_cover.jpg
        # The generated HTML has:
        # <source type="image/webp" srcset="/img/crags/FOLDER/cover.webp">
        # <img src="/img/crags/FOLDER/cover.jpg" alt="WUCC page banner" class="page-banner-img" fetchpriority="high">
        
        content = re.sub(r'<source type="image/webp" srcset="/img/crags/[^/]+/cover\.webp">', '<source type="image/jpeg" srcset="/img/crags/bg-img/crags_cover.jpg">', content)
        content = re.sub(r'<img src="/img/crags/[^/]+/cover\.jpg" alt="WUCC page banner"', '<img src="/img/crags/bg-img/crags_cover.jpg" alt="WUCC page banner"', content)
        
        with open(os.path.join(folder_path, "index.html"), "w") as f:
            f.write(content)

print("Fixed missing covers")
