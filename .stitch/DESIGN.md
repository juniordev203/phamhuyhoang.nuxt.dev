---
name: Monochrome Logic
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 160px
---

## Brand & Style

This design system is built for a high-end frontend developer portfolio that prioritizes clarity, precision, and technical rigor. The brand personality is "Architectural Minimalist"—it treats code as art and whitespace as a functional tool rather than a void. 

The aesthetic is heavily influenced by **Swiss Design** and **Modernist Architecture**, utilizing a strict black-and-white palette to ensure the developer's work (the screenshots and code snippets) remains the sole focus. By removing shadows and gradients, the UI relies entirely on typography, scale, and grid alignment to convey hierarchy. The emotional response should be one of extreme professional competence, attention to detail, and a "code-first" mentality.

## Colors

The palette is strictly monochromatic. 

- **Primary (#000000):** Used for all primary text, heavy borders, and CTA backgrounds.
- **Secondary (#666666):** Reserved for metadata, helper text, and inactive states.
- **Tertiary (#F5F5F5):** Used for code block backgrounds and subtle hover states.
- **Neutral (#FFFFFF):** The primary background color.

The background must feature a subtle light gray grid pattern (`grid_line_color`) to simulate engineering grid paper, reinforcing the "builder" persona. This grid should be non-intrusive, using 1px lines spaced at 24px intervals.

## Typography

Typography is the primary driver of the visual interest in this design system. 

- **Geist** is used for all interface elements and headings to provide a clean, technical, yet highly legible sans-serif feel.
- **JetBrains Mono** is utilized for labels, buttons, and code snippets to inject the developer persona into the navigation.

High contrast in scale is encouraged. Use `headline-xl` for project titles and major sections. Ensure all mono-spaced elements use a slightly reduced font size relative to body text to maintain visual balance, as monospaced characters often appear larger.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop, centered within the viewport. 

- **Grid:** A 12-column layout with 24px gutters.
- **Sectioning:** Vertical spacing is aggressive. Use `section-gap` (160px) between major portfolio pieces to allow each project to breathe.
- **Alignment:** All elements must snap to the 24px grid lines of the background pattern.
- **Mobile:** Transition to a 4-column layout. Reduce `section-gap` to 80px. Typography should reflow but maintain high contrast in scale.

## Elevation & Depth

This design system rejects all depth metaphors involving Z-axis shadows or blurs. 

- **Flat Layering:** Hierarchy is achieved through layering and borders. 
- **Borders:** Use solid 1px or 2px black borders to define containers (cards, inputs). 
- **Negative Space:** Depth is implied by the density of information. Areas with more whitespace are perceived as "base" level, while tightly framed border containers act as "interactive" components.
- **High Contrast:** To indicate a "raised" state (like a hover), invert the colors (black background, white text) rather than adding a shadow.

## Shapes

The shape language is strictly **Sharp**. 

All corners for buttons, input fields, cards, and images must have a 0px radius. This reinforces the technical, brutalist, and precise nature of the frontend architecture. There are no exceptions for "softening" the UI; the rigidity of the 90-degree angle is a core brand pillar.

## Components

- **Buttons:** Solid black background with white JetBrains Mono text for primary actions. Use a 1px black border with a white background for secondary actions. On hover, primary buttons invert to white background/black text.
- **Cards:** Defined by a 1px black border. No padding on image containers within cards—images should be flush with the top and side borders.
- **Input Fields:** 1px black bottom-border only (minimalist style) or full 1px box. Focus state is indicated by a 2px border.
- **Chips/Tags:** Small JetBrains Mono text inside a 1px border. No background fill unless active.
- **Code Blocks:** Tertiary (#F5F5F5) background with 1px border. Use JetBrains Mono for all content.
- **Navigation:** Simple text-based links. Use a "strike-through" or "underline" on hover to indicate interactivity without moving the text.
- **Project Grid:** Use a "window" metaphor—large, sharp-edged containers that act as viewports into the developer's work.