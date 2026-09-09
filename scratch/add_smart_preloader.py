import os
import re

root_dir = '/Users/szymonator1625/Programming/climbing_soc_website'

smart_preloader = """    <!-- Smart Preloader -->
    <div id="preloader" style="position: fixed; inset: 0; background: var(--bg-base, #121212); z-index: 9999999; display: flex; align-items: center; justify-content: center; transition: opacity 0.5s ease;">
        <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid var(--color-accent, #FF5A4B); border-radius: 50%; animation: preloader-spin 1s linear infinite;"></div>
    </div>
    <style>@keyframes preloader-spin { 100% { transform: rotate(360deg); } }</style>
    <script>
        (function() {
            function dismissPreloader() {
                var p = document.getElementById('preloader');
                if (p && p.style.opacity !== '0') {
                    p.style.opacity = '0';
                    setTimeout(function() { p.style.display = 'none'; }, 500);
                }
            }
            window.addEventListener('DOMContentLoaded', function() {
                var lcpImage = document.querySelector('.hero-slide-img, .page-banner-img');
                if (!lcpImage || lcpImage.complete) {
                    dismissPreloader();
                } else {
                    lcpImage.addEventListener('load', dismissPreloader);
                    lcpImage.addEventListener('error', dismissPreloader);
                }
                setTimeout(dismissPreloader, 3000); // 3s fallback
            });
            window.addEventListener('load', dismissPreloader); // Ultimate fallback
        })();
    </script>
    <!-- /Smart Preloader -->"""

count = 0
for root, dirs, files in os.walk(root_dir):
    if '.git' in root:
        continue
    for file in files:
        if file.endswith('.html') and file not in ('secret.html', 'login.html') and not file.startswith('google'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Ensure we don't add it twice
            if 'id="preloader"' not in content:
                # Find the <body> tag and insert right after it
                content = re.sub(r'(<body[^>]*>)', r'\1\n' + smart_preloader, content, count=1, flags=re.IGNORECASE)
                with open(filepath, 'w') as f:
                    f.write(content)
                count += 1

print(f"Added smart preloader to {count} files.")
