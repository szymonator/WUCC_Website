import os
import glob
import re

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
crags_dir = os.path.join(base_dir, "img/crags")
archives_dir = os.path.join(base_dir, "adventures/archives")

crag_folders = [f for f in os.listdir(crags_dir) if os.path.isdir(os.path.join(crags_dir, f)) and f != "bg-img"]
crag_folders.sort()

# Format function for names
def format_name(folder_name):
    # 'burton_dassett_hills' -> 'Burton Dassett Hills'
    return folder_name.replace('_', ' ').title()

# 1. Update archives/index.html
with open(os.path.join(archives_dir, "index.html"), "r") as f:
    archives_html = f.read()

# Generate the grid cards
grid_cards = []
for f in crag_folders:
    name = format_name(f)
    img_path = f"/img/crags/{f}/preview.webp"
    # if preview.webp doesn't exist, try preview.jpg
    if not os.path.exists(os.path.join(crags_dir, f, "preview.webp")):
        img_path = f"/img/crags/{f}/preview.jpg"
        
    card = f"""                <div class="adventure-card">
                    <div class="adventure-card-image">
                        <img loading="lazy" src="{img_path}" alt="{name}">
                    </div>
                    <div class="adventure-card-info">
                        <h3><a href="/adventures/archives/{f}/">{name}</a></h3>
                    </div>
                </div>"""
    grid_cards.append(card)

grid_html = '\n'.join(grid_cards)

new_gallery_content = f"""        <!-- Gallery Area Start -->
    <div class="gallery-section section-padding clearfix">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="about-us-content mb-80">
                        <h3 class="wow fadeInUp" data-wow-delay="100ms">Archives</h3>
                        <div class="line wow fadeInUp" data-wow-delay="200ms"></div>
                        <p class="wow fadeInUp" data-wow-delay="300ms">This page contains images found in the archives, where the only known attribute is the location.</p>
                    </div>
                </div>
            </div>

            <div class="adventure-grid">
{grid_html}
            </div>
        </div>
    </div>
    <!-- Gallery Area End -->"""

# Replace in archives_html
start_tag = '        <!-- Gallery Area Start -->'
end_tag = '    <!-- Gallery Area End -->'
start_idx = archives_html.find(start_tag)
end_idx = archives_html.find(end_tag) + len(end_tag)
if start_idx != -1 and end_idx != -1:
    archives_html = archives_html[:start_idx] + new_gallery_content + archives_html[end_idx:]

with open(os.path.join(archives_dir, "index.html"), "w") as f:
    f.write(archives_html)

# 2. Generate individual crag pages
with open(os.path.join(base_dir, "adventures/tripsandtours/freshers25/index.html"), "r") as f:
    template_html = f.read()

# We also need to add Archives to the template dropdown in case it doesn't have it (we already added it, but just to be sure we use the one from archives)
# Let's just copy the navbar from archives_html
nav_start = archives_html.find('    <header class="site-header')
nav_end = archives_html.find('    <!-- Header Area End -->') + len('    <!-- Header Area End -->')
header_html = archives_html[nav_start:nav_end]

# Extract template parts
templ_head_start = 0
templ_head_end = template_html.find('    <!-- Header Area Start -->')

templ_banner_start = template_html.find('    <!-- Breadcrumb Area Start -->')
templ_banner_end = template_html.find('    <!-- Breadcrumb Area End -->') + len('    <!-- Breadcrumb Area End -->')

templ_footer_start = template_html.find('    <div style="height:100px;"></div>')
# Use footer from archives_html as it's cleaner
foot_start = archives_html.find('                    <!-- Footer Area Start -->')
if foot_start == -1:
    foot_start = archives_html.find('    <!-- Footer Area Start -->')

footer_html = archives_html[foot_start:]

# New pages to add to sitemap
new_urls = []

for folder in crag_folders:
    name = format_name(folder)
    folder_path = os.path.join(archives_dir, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    # 1. Head
    head = template_html[:templ_head_end]
    head = head.replace("<title>Fresher's Trip - 2025 | Warwick University Climbing Club</title>", f"<title>{name} | Warwick University Climbing Club</title>")
    head = re.sub(r'<meta name="description" content="[^"]+">', f'<meta name="description" content="WUCC archives - {name} gallery.">', head)
    
    # 2. Header
    header = header_html
    
    # 3. Banner
    banner = template_html[templ_banner_start:templ_banner_end]
    cover_path = f"/img/crags/{folder}/cover.webp"
    if not os.path.exists(os.path.join(crags_dir, folder, "cover.webp")):
        cover_path = f"/img/crags/{folder}/cover.jpg"
    
    banner = re.sub(r'<source type="image/webp" srcset="[^"]+">', f'<source type="image/webp" srcset="{cover_path}">', banner)
    banner = re.sub(r'<img src="[^"]+" alt="WUCC page banner"', f'<img src="{cover_path.replace(".webp", ".jpg")}" alt="WUCC page banner"', banner)
    banner = re.sub(r'<h1 class="page-banner-title">[^<]+</h1>', f'<h1 class="page-banner-title">{name}</h1>', banner)
    
    # Update breadcrumbs
    # <li><a href="/adventures/tripsandtours/">Trips and Tours</a></li>
    # <li class="active">Fresher's Trip - 2025</li>
    banner = banner.replace('<li><a href="/adventures/tripsandtours/">Trips and Tours</a></li>', '<li><a href="/adventures/archives/">Archives</a></li>')
    banner = banner.replace('<li class="active">Fresher\'s Trip - 2025</li>', f'<li class="active">{name}</li>')
    
    # 4. Content
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
    # Find images
    images = glob.glob(os.path.join(crags_dir, folder, "*.[jJ][pP][gG]")) + glob.glob(os.path.join(crags_dir, folder, "*.webp"))
    # Filter out cover and preview
    images = [img for img in images if "cover" not in os.path.basename(img).lower() and "preview" not in os.path.basename(img).lower()]
    
    # Sort images by name if possible (1.jpg, 2.jpg)
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

    page_html = head + header + "\n" + banner + "\n" + content + footer_html
    
    with open(os.path.join(folder_path, "index.html"), "w") as f:
        f.write(page_html)
        
    new_urls.append(f"https://wucc.containers.uwcs.co.uk/adventures/archives/{folder}/")

print(f"Generated {len(crag_folders)} crag pages.")

# 3. Update sitemap.xml
with open(os.path.join(base_dir, "sitemap.xml"), "r") as f:
    sitemap_content = f.read()

sitemap_additions = ""
for url in new_urls:
    if f"<loc>{url}</loc>" not in sitemap_content:
        sitemap_additions += f"""  <url>
    <loc>{url}</loc>
    <priority>0.5</priority>
  </url>
"""

if sitemap_additions:
    sitemap_content = sitemap_content.replace("</urlset>", sitemap_additions + "</urlset>")
    with open(os.path.join(base_dir, "sitemap.xml"), "w") as f:
        f.write(sitemap_content)
    print("Updated sitemap.xml with new crag pages.")

