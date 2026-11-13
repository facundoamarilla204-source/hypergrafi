# Frame Design Spec: PlayComun Online

## Canvas & Viewport
- **Width:** 1080px
- **Height:** 1920px
- **Aspect Ratio:** 9:16 (Vertical / Mobile format)
- **Safe Zone:**
  - Top: 180px
  - Bottom: 280px
  - Left / Right: 80px

## Color System
- **Background Deep:** `#1a053d` (Deep Violet)
- **Background Accent:** `#3d1083` (Royal Violet)
- **Brand Primary:** `#7C3AED` (PlayComun Violet)
- **Brand Glow:** `#8249F1` / `#9b5cff`
- **Surface Clean:** `#FFFFFF`
- **Surface Subtle:** `#F8FAFC`
- **Surface Lavender:** `#F5F3FF`
- **Border Default:** `rgba(226, 232, 240, 0.9)` / `#E2E8F0`
- **Border Highlight:** `rgba(124, 58, 237, 0.35)`
- **Text Primary (on dark):** `#FFFFFF`
- **Text Primary (on light):** `#0F172A`
- **Text Secondary (on dark):** `rgba(255, 255, 255, 0.8)`
- **Text Secondary (on light):** `#64748B`
- **Accent Success:** `#10B981` (Emerald Green for savings / margins)

## Typography
- **Headings & Accents:** Sora / Fugaz One / Work Sans (Google Fonts)
- **Body & Data:** Sora / Work Sans
- **Minimum Font Size:** 28px for readability on mobile screens

## Motion Doctrine
- GSAP 3 Timelines with ease: `power2.out` for snappy entrances, `power2.inOut` for transitions.
- Staggered reveals (0.08s - 0.15s between items).
- Subtle 3D card tilt and soft hover glow breathing.
