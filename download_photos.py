import urllib.request
import os

photos = {
    # 1. Hero Image: Luxury couple at golden hour cliffside / sunset
    "hero.jpg": "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    
    # 2. Nikah Section: Intimate couple holding hands / vows / ring
    "nikah.jpg": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1887&auto=format&fit=crop",
    
    # 3. Card 01 - The Moments: Rainy umbrella / sparkling lights
    "card_moments.jpg": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
    
    # 4. Card 02 - The Memories: Elegant bride & candid smiles
    "card_memories.jpg": "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop",
    
    # 5. Card 03 - The Journey: Candlelit coastal dinner / sunset scenery
    "card_journey.jpg": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",

    # 6. Timeline Milestone Photos
    "timeline_01.jpg": "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
    "timeline_02.jpg": "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
    "timeline_03.jpg": "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200&auto=format&fit=crop",
    "timeline_04.jpg": "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
    "timeline_05.jpg": "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
    "timeline_06.jpg": "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",

    # 7. Gallery Editorial Photos
    "gallery_01.jpg": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop",
    "gallery_02.jpg": "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    "gallery_03.jpg": "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1600&auto=format&fit=crop",
    "gallery_04.jpg": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop",
    "gallery_05.jpg": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
    "gallery_06.jpg": "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1600&auto=format&fit=crop",
    "gallery_07.jpg": "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1600&auto=format&fit=crop",
    "gallery_08.jpg": "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1600&auto=format&fit=crop",
    
    # 8. Surprise & Quote Backgrounds
    "quote_bg.jpg": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1888&auto=format&fit=crop",
    "surprise_bg.jpg": "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1800&auto=format&fit=crop",
}

target_dir = "/home/ajmal/.gemini/antigravity/scratch/nikah-anniversary/public/photos"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, url in photos.items():
    dest = os.path.join(target_dir, name)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {name} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")

