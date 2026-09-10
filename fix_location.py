import os
import glob

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
archives_dir = os.path.join(base_dir, "adventures/archives")

# 1. Remove Location string from all archive crag pages
crag_pages = glob.glob(os.path.join(archives_dir, "*", "index.html"))

for filepath in crag_pages:
    with open(filepath, "r") as f:
        content = f.read()
        
    # Replace '<p class="wow fadeInUp" data-wow-delay="250ms" style="color:#A7A7A7">Location</p>' with ''
    new_content = content.replace('<p class="wow fadeInUp" data-wow-delay="250ms" style="color:#A7A7A7">Location</p>', '')
    
    if new_content != content:
        with open(filepath, "w") as f:
            f.write(new_content)

# 2. Shorten empty space in archives/index.html
archives_index = os.path.join(archives_dir, "index.html")
with open(archives_index, "r") as f:
    index_content = f.read()
    
# Replace 'about-us-content mb-80' with 'about-us-content mb-30'
index_content = index_content.replace('about-us-content mb-80', 'about-us-content mb-30')

with open(archives_index, "w") as f:
    f.write(index_content)
    
print("Fixed Location string and shortened margin")
