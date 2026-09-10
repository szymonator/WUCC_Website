import os
import glob
import re

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
archives_dir = os.path.join(base_dir, "adventures/archives")
crags_dir = os.path.join(base_dir, "img/crags")

# We will regenerate napton/index.html to include .png files
folder = "napton"
name = "Napton"
folder_path = os.path.join(archives_dir, folder)

with open(os.path.join(archives_dir, "index.html"), "r") as f:
    archives_html = f.read()

# Get header/footer
nav_start = archives_html.find('    <header class="site-header')
nav_end = archives_html.find('    <!-- Header Area End -->') + len('    <!-- Header Area End -->')
header_html = archives_html[nav_start:nav_end]

foot_start = archives_html.find('                    <!-- Footer Area Start -->')
if foot_start == -1:
    foot_start = archives_html.find('    <!-- Footer Area Start -->')
footer_html = archives_html[foot_start:]

# Template
with open(os.path.join(base_dir, "adventures/tripsandtours/freshers25/index.html"), "r") as f:
    template_html = f.read()

templ_head_start = 0
templ_head_end = template_html.find('    <!-- Header Area Start -->')
templ_banner_start = template_html.find('    <!-- Breadcrumb Area Start -->')
templ_banner_end = template_html.find('    <!-- Breadcrumb Area End -->') + len('    <!-- Breadcrumb Area End -->')

head = template_html[:templ_head_end]
head = head.replace("<title>Fresher's Trip - 2025 | Warwick University Climbing Club</title>", f"<title>{name} | Warwick University Climbing Club</title>")
head = re.sub(r'<meta name="description" content="[^"]+">', f'<meta name="description" content="WUCC archives - {name} gallery.">', head)

banner = template_html[templ_banner_start:templ_banner_end]
cover_path = f"/img/crags/{folder}/cover.webp"
if not os.path.exists(os.path.join(crags_dir, folder, "cover.webp")):
    cover_path = f"/img/crags/{folder}/cover.jpg"
if not os.path.exists(os.path.join(crags_dir, folder, "cover.jpg")) and not os.path.exists(os.path.join(crags_dir, folder, "cover.webp")):
    # No cover image, just use preview.webp or something else? Wait, there is no cover for napton? Let's check:
    # "windmill.jpg" might be it? 
    pass

banner = re.sub(r'<source type="image/webp" srcset="[^"]+">', f'<source type="image/webp" srcset="{cover_path}">', banner)
banner = re.sub(r'<img src="[^"]+" alt="WUCC page banner"', f'<img src="{cover_path.replace(".webp", ".jpg")}" alt="WUCC page banner"', banner)
banner = re.sub(r'<h1 class="page-banner-title">[^<]+</h1>', f'<h1 class="page-banner-title">{name}</h1>', banner)

banner = banner.replace('<li><a href="/adventures/tripsandtours/">Trips and Tours</a></li>', '<li><a href="/adventures/archives/">Archives</a></li>')
banner = banner.replace('<li class="active">Fresher\'s Trip - 2025</li>', f'<li class="active">{name}</li>')

content = f"""    <!-- About Us Area Start -->
    <div class="about-us-area section-padding-80-0 clearfix">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="about-us-content mb-80">
                        <h3 class="wow fadeInUp" data-wow-delay="100ms">{name}</h3>
                        <div class="line wow fadeInUp" data-wow-delay="200ms"></div>
                        <p class="wow fadeInUp" data-wow-delay="250ms" style="color:#A7A7A7">Location</p>
                    </div>
                </div>

                <!-- Gallery Items -->
"""

images = glob.glob(os.path.join(crags_dir, folder, "*.[jJ][pP][gG]")) + glob.glob(os.path.join(crags_dir, folder, "*.webp")) + glob.glob(os.path.join(crags_dir, folder, "*.png"))
images = [img for img in images if "cover" not in os.path.basename(img).lower() and "preview" not in os.path.basename(img).lower()]

def sort_key(x):
    base = os.path.basename(x).split('.')[0]
    if base.isdigit():
        return int(base)
    return float('inf')
images.sort(key=sort_key)

for i, img in enumerate(images):
    img_rel = f"/img/crags/{folder}/{os.path.basename(img)}"
    col_class = "col-12" if i == 0 else "col-12 col-sm-6 col-lg-4"
    content += f"""                <div class="{col_class} single_gallery_item mb-30 wow fadeInUp" data-wow-delay="300ms">
                    <div class="gallery-card">
                        <img loading="lazy" src="{img_rel}" alt="WUCC climbing photo">
                        <div class="gallery-overlay">
                            <a href="{img_rel}" class="gallery-zoom-btn">+</a>
                        </div>
                    </div>
                </div>\n"""
            
content += """            </div>
        </div>
    </div>
    
    <div style="height:100px;"></div>
    <!-- About Us Area End -->\n\n"""

page_html = head + header_html + "\n" + banner + "\n" + content + footer_html

with open(os.path.join(folder_path, "index.html"), "w") as f:
    f.write(page_html)

print("Regenerated napton")

