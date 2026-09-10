import os
import glob

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
archives_dir = os.path.join(base_dir, "adventures/archives")
crag_pages = glob.glob(os.path.join(archives_dir, "*", "index.html"))

for filepath in crag_pages:
    with open(filepath, "r") as f:
        content = f.read()
        
    new_content = content.replace('about-us-content mb-80', 'about-us-content mb-30')
    
    if new_content != content:
        with open(filepath, "w") as f:
            f.write(new_content)
