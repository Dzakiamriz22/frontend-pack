# Landing Command Example

```
/landing
```

The plugin loads: design, tailwind, tailwind-animation, responsive.

## Generated Files

```
app/page.tsx            — Landing page
app/loading.tsx         — Loading skeleton
components/landing/
  navbar.tsx            — Sticky navigation
  hero.tsx              — Hero section
  features.tsx          — Features with staggered cards
  testimonials.tsx      — Testimonial carousel
  cta.tsx               — Call to action
  footer.tsx            — Site footer
```

## Design Decisions

- Asymmetric hero layout (text left, mockup right)
- Features: 3 cards in varied layouts (not identical)
- Subtle scroll-triggered animations (Framer Motion useInView)
- No full-page gradients
- Bold typography: text-5xl hero heading
- Single CTA button per section
- Dark mode: all sections have dark variants
