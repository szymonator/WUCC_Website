import os
import glob
import re

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"

# 1. Create archives/index.html based on tripsandtours/index.html
with open(os.path.join(base_dir, "adventures/tripsandtours/index.html"), "r") as f:
    trips_content = f.read()

# Make changes for Archives
archives_content = trips_content.replace(
    "<title>Trips and Tours | Warwick University Climbing Club</title>",
    "<title>Archives | Warwick University Climbing Club</title>"
)
archives_content = archives_content.replace(
    '<meta name="description" content="WUCC outdoor trips and tours. Explore our adventures climbing across the UK and Europe.">',
    '<meta name="description" content="WUCC archives. Explore images found in the archives, where the only known attribute is the location.">'
)
archives_content = archives_content.replace(
    '<h1 class="page-banner-title">Trips and Tours</h1>',
    '<h1 class="page-banner-title">Archives</h1>'
)
archives_content = archives_content.replace(
    '<li class="active">Trips and Tours</li>',
    '<li class="active">Archives</li>'
)

# Replace the gallery area
gallery_start = archives_content.find('        <!-- Gallery Area Start -->')
gallery_end = archives_content.find('    <!-- Gallery Area End -->') + len('    <!-- Gallery Area End -->')

new_gallery_content = """        <!-- Gallery Area Start -->
    <div class="gallery-section section-padding clearfix">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <h2>Archives</h2>
                    <p>This page contains images found in the archives, where the only known attribute is the location.</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Gallery Area End -->"""

archives_content = archives_content[:gallery_start] + new_gallery_content + archives_content[gallery_end:]

# Add Archives to the dropdown in the new file too
archives_content = archives_content.replace(
    '<a class="dropdown-item" href="/adventures/climboftheweek/">Climb of the Week</a>\n              </div>',
    '<a class="dropdown-item" href="/adventures/climboftheweek/">Climb of the Week</a>\n                <a class="dropdown-item" href="/adventures/archives/">Archives</a>\n              </div>'
)

os.makedirs(os.path.join(base_dir, "adventures/archives"), exist_ok=True)
with open(os.path.join(base_dir, "adventures/archives/index.html"), "w") as f:
    f.write(archives_content)

print("Created archives/index.html")

# 2. Update navigation in all HTML files
html_files = glob.glob(os.path.join(base_dir, "**/*.html"), recursive=True)
modified_count = 0
for filepath in html_files:
    if "adventures/archives/index.html" in filepath:
        continue # Already handled
    with open(filepath, "r") as f:
        content = f.read()
    
    if '<a class="dropdown-item" href="/adventures/archives/">Archives</a>' in content:
        continue
        
    new_content = content.replace(
        '<a class="dropdown-item" href="/adventures/climboftheweek/">Climb of the Week</a>\n              </div>',
        '<a class="dropdown-item" href="/adventures/climboftheweek/">Climb of the Week</a>\n                <a class="dropdown-item" href="/adventures/archives/">Archives</a>\n              </div>'
    )
    
    if new_content != content:
        with open(filepath, "w") as f:
            f.write(new_content)
        modified_count += 1

print(f"Updated navigation in {modified_count} HTML files.")

# 3. Update sitemap.xml
with open(os.path.join(base_dir, "sitemap.xml"), "r") as f:
    sitemap_content = f.read()

if "<loc>https://warwickclimbing.com/adventures/archives/</loc>" not in sitemap_content:
    sitemap_addition = """  <url>
    <loc>https://warwickclimbing.com/adventures/archives/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>"""
    sitemap_content = sitemap_content.replace("</urlset>", sitemap_addition)
    with open(os.path.join(base_dir, "sitemap.xml"), "w") as f:
        f.write(sitemap_content)
    print("Updated sitemap.xml")
else:
    print("sitemap.xml already updated")

