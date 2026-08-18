# 💍 Our Nikah Anniversary — Cinematic Surprise Gift Website

A luxury, romantic, fully responsive Nikah Anniversary website created as a surprise digital gift for your wife. Designed with a dark cinematic wedding film aesthetic, warm golden tones, glassmorphism cards, serif typography, ambient bokeh, interactive relationship timeline, expandable love notes, personal letter, and a multi-stage emotional surprise reveal.

---

## ✨ Features & Sections

1. **Cinematic Opening Experience**: 3–4 second dark screen fade sequence (*"For the person who makes my life beautiful..."* ➔ *"Our Story ❤️"*) with a skip option.
2. **Luxury Navigation**: Minimal glass navbar with custom couple initials badge, smooth scroll links, live audio equalizer, and animated mobile menu drawer.
3. **Cinematic Hero**: Full-screen viewport with slow Ken-Burns zoom, golden rim light, editorial serif headings, liquid glass button, and scroll indicator.
4. **Floating Ambient Bokeh**: Subtle warm golden particles and dust embers drifting softly in the background.
5. **Relationship Story Timeline**: Interactive horizontal desktop timeline with golden progress illumination and clean vertical mobile timeline covering key relationship chapters.
6. **Our Nikah Emotional Centerpiece**: High-impact spotlight on the sacred Nikah day with a large framed photo, ambient backlight, date badge, and personal vows.
7. **Luxury Memory Cards (01, 02, 03)**: Inspired by high-end editorial wedding film cards with number badges, diagonal arrows (`↗`), moody inset photos, and hover zoom.
8. **Editorial Photo Gallery & Lightbox**: Dynamic masonry layout with category filter pills (`All`, `Our Nikah`, `Adventures`, `Little Moments`), hover reveals, and full-screen lightbox navigation (keyboard & touch supported).
9. **Things I Love About You**: Interactive expandable cards with soft golden glow revealing heartfelt personal reasons.
10. **Love Quote Banner**: Full-width parallax quote section with blurred romantic couple background.
11. **Special Surprise Climax**: Multi-stage cinematic blackout with glowing golden star expanding into timed emotional text reveals and celebratory golden particle burst.
12. **Personal Letter**: Luxury dark parchment container with wax seal monogram stamp, romantic typography, and handwritten-style signature.
13. **Romantic Background Music**: Floating `♫` audio button with live equalizer. Powered by a built-in Web Audio romantic piano synthesizer that works 100% offline out-of-the-box, plus support for custom MP3 files.
14. **Romantic Micro-Interactions**: Delicate golden/rose hearts floating gently upwards on button taps.

---

## 🎨 How to Customize Content (Easy 1-File Setup)

All names, dates, photos, messages, quotes, and the letter are managed in a single, clean file:

👉 **[`src/data/anniversaryData.js`](file:///home/ajmal/.gemini/antigravity/scratch/nikah-anniversary/src/data/anniversaryData.js)**

### Key Customization Options:
- **`wifeName`**: Your wife's name or pet name
- **`husbandName`**: Your name
- **`initials`**: e.g., `"A & S"` (shown on navbar, stamps, and seals)
- **`nikahDate`**: e.g., `"OCTOBER 24, 2022"`
- **`anniversaryYear`**: e.g., `"2nd Anniversary"`
- **`timeline.events`**: Dates, photos, and descriptions for each milestone
- **`nikahSection`**: Personal vows and story about your Nikah day
- **`loveCards.items`**: Personal reasons why you love her
- **`letter`**: Your personal anniversary letter
- **`surprise.stagedMessages`**: Custom messages for the final surprise reveal
- **`music.customAudioUrl`**: Optional URL or path to your own MP3 song (e.g., `"/photos/your-song.mp3"` placed in `public/photos/`)

---

## 📸 How to Replace Photos

You can replace any photo by placing your own wedding/couple photos into:
`public/photos/`

Default image names:
- `hero.jpg`: Hero background photo
- `nikah.jpg`: Our Nikah centerpiece photo
- `card_moments.jpg`: Memory Card 01
- `card_memories.jpg`: Memory Card 02
- `card_journey.jpg`: Memory Card 03
- `timeline_01.jpg` to `timeline_06.jpg`: Milestone photos
- `gallery_01.jpg` to `gallery_08.jpg`: Editorial gallery photos
- `quote_bg.jpg`: Quote section background
- `surprise_bg.jpg`: Surprise reveal background photo

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## ☁️ Deploying to Vercel (Instant & Free)

This project is a 100% static React + Vite application and deploys seamlessly to Vercel:

1. Push this repository to **GitHub** (or drag and drop into Vercel).
2. Go to **[vercel.com](https://vercel.com)** ➔ Click **Add New Project** ➔ Import repository.
3. Keep default settings (Framework Preset: `Vite`, Build Command: `npm run build`, Output Directory: `dist`).
4. Click **Deploy**.
5. Share the live URL with your wife as her special anniversary surprise! ❤️
