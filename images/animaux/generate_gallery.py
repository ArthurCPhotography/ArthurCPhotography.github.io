from PIL import Image
import os

# Dossier avec tes images originales
input_folder = 'images/animaux'
# Dossier pour les miniatures
thumb_folder = os.path.join(input_folder, 'thumbs')

# Crée le dossier thumbs s'il n'existe pas
os.makedirs(thumb_folder, exist_ok=True)

# Taille maximale des miniatures
thumb_size = (300, 300)

# Liste pour stocker le code HTML
html_lines = []

for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        # Image originale
        input_path = os.path.join(input_folder, filename)
        
        # Crée la miniature
        img = Image.open(input_path)
        img.thumbnail(thumb_size)
        thumb_path = os.path.join(thumb_folder, filename)
        img.save(thumb_path)
        
        # Génère le code HTML pour la galerie
        line = f'<a href="{input_path}" data-fancybox="gallery-animaux">\n' \
               f'  <img src="{thumb_path}" alt="{os.path.splitext(filename)[0]}" loading="lazy">\n' \
               f'</a>'
        html_lines.append(line)

# Affiche le code HTML complet
html_code = "\n".join(html_lines)
print(html_code)
