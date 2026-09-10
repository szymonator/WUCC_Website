import os
import glob
import re

base_dir = "/Users/szymonator1625/Programming/climbing_soc_website"
html_files = glob.glob(os.path.join(base_dir, "**/*.html"), recursive=True)

modified_count = 0
for filepath in html_files:
    with open(filepath, "r") as f:
        content = f.read()
        
    # Replace all gallery item grid sizing classes with the standard lg-4 size
    new_content = re.sub(
        r'class="col-12(?: col-[a-z0-9-]+)* single_gallery_item', 
        'class="col-12 col-sm-6 col-lg-4 single_gallery_item', 
        content
    )
    
    if new_content != content:
        with open(filepath, "w") as f:
            f.write(new_content)
        modified_count += 1
        
print(f"Fixed gallery items in {modified_count} HTML files.")
