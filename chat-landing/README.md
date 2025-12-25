# JustTalk AI Landing Page

A comprehensive, responsive landing page for JustTalk AI - an English learning platform that uses natural voice conversations.

## Features Implemented

### Design System
- **Custom Design Tokens**: All colors, typography, spacing, and radius values from the Figma design
- **Inter Tight Font**: Loaded from local assets with variable font support
- **Consistent Styling**: Using `just_` prefix for all custom design tokens

### Sections

1. **Header**
   - Sticky navigation bar
   - Logo and navigation links (About, Features, Pricing)
   - Login and Sign up CTA buttons
   - Responsive mobile menu ready

2. **Hero Section**
   - Large heading: "Get better at speaking by speaking"
   - Descriptive subtitle
   - Two CTA buttons: "Start now" and "Learn about JustTalk AI platform"
   - Hero image placeholder (gradient)
   - Fully responsive layout

3. **Platform Showcase**
   - Section title
   - Large platform screenshot placeholder
   - Centered content with proper spacing

4. **Features Section**
   - Three feature cards
   - Each with description and "Learn more" link
   - Feature 1: Search the web
   - Features 2-3: Tutor card grids with profile cards
   - Responsive grid layouts

5. **Pricing Section**
   - Two pricing plans: Free and Plus
   - Feature lists with checkmarks
   - Pricing with monthly rates
   - CTA buttons for each plan
   - "View pricing plans" button with arrow

6. **CTA Overlay**
   - Gray background banner
   - "Join first and try JustTalk today" heading
   - Two action buttons

7. **Footer**
   - Three-column link layout
   - Large brand text "JustTalk"
   - "Try now" CTA with arrow
   - Bottom bar with copyright, social links, and language selector

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Flexible grid layouts
- Stack-to-row transitions
- Optimized typography scaling

### Styling Approach
- Tailwind CSS v4 with custom theme
- CSS custom properties for design tokens
- Hover states and transitions
- Consistent spacing system
- Accessible color contrast

## Image Placeholders

The following image placeholders need to be replaced with actual assets:
- Hero image (419x503px)
- Platform screenshot
- Feature demonstration images
- Tutor profile pictures (for the card grid)

Replace the gradient placeholders with actual images in the `/public/images` directory.

## Running the Project

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

## Customization

### Colors
Edit color tokens in `/app/globals.css` under the `:root` section.

### Typography
The Inter Tight font is loaded from `/app/assets/inter_tight-var.ttf`. Font sizes and weights can be adjusted in the CSS custom properties.

### Content
All text content can be edited directly in `/app/page.tsx`.

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Android Chrome 80+

## Notes
- The design closely follows the Figma mockup
- All spacing, colors, and typography match the design specifications
- Icons are SVG-based for scalability
- The layout is fully responsive and accessible
