import os
import glob

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
archives_dir = os.path.join(base_dir, "adventures/archives")
crags_dir = os.path.join(base_dir, "img/crags")

# Fix archives/index.html
with open(os.path.join(archives_dir, "index.html"), "r") as f:
    html = f.read()
    
# Replace napton preview
html = html.replace('/img/crags/napton/preview.jpg', '/img/crags/napton/preview.png')

with open(os.path.join(archives_dir, "index.html"), "w") as f:
    f.write(html)
    
# Re-generate napton/index.html to include the PNG image
folder = "napton"
name = "Napton"
folder_path = os.path.join(archives_dir, folder)

with open(os.path.join(folder_path, "index.html"), "r") as f:
    page_html = f.read()

# We need to insert the png image. The image is "Niamh_on_The_Dog's_Bollocks_f4_(V0).png"
# Let's find where to insert it. We'll append it before `</div>\n        </div>\n    </div>\n    \n    <div style="height:100px;"></div>`
img_rel = f"/img/crags/{folder}/Niamh_on_The_Dog's_Bollocks_f4_(V0).png"

# Since it's only one image in that folder ? Let's check how many images were in napton
# The existing one might have no images if only pngs exist.
