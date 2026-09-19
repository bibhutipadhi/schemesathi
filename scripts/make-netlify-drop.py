import os
import zipfile

def main():
    zip_path = 'public/netlify-drop.zip'
    root_zip_path = 'netlify-drop.zip'
    
    os.makedirs('public', exist_ok=True)
    
    for target in [zip_path, root_zip_path]:
        with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as z:
            if os.path.exists('dist/index.html'):
                z.write('dist/index.html', 'index.html')
            if os.path.exists('dist/_redirects'):
                z.write('dist/_redirects', '_redirects')
            elif os.path.exists('public/_redirects'):
                z.write('public/_redirects', '_redirects')
            if os.path.exists('netlify.toml'):
                z.write('netlify.toml', 'netlify.toml')
                
            if os.path.exists('dist/assets'):
                for root, dirs, files in os.walk('dist/assets'):
                    for f in files:
                        full_path = os.path.join(root, f)
                        arc_name = os.path.relpath(full_path, 'dist')
                        z.write(full_path, arc_name)
                        
        print(f"Created {target} ({os.path.getsize(target)} bytes)")

if __name__ == '__main__':
    main()
