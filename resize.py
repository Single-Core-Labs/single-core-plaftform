# pyrefly: ignore [missing-import]
from PIL import Image
import sys

try:
    img = Image.open('public/logo.webp')
    img.thumbnail((256, 256))
    img.save('public/logo-small.webp', format='WEBP', quality=85)
    print("Successfully resized logo")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
