# Design Command Examples

## Generate a Landing Page

```
/design landing
```

The plugin loads: design, typography, color-system, spacing skills.

AI generates:
- `app/page.tsx` — Landing page with hero, features, testimonials, CTA
- `app/loading.tsx` — Skeleton loader
- `components/landing/hero.tsx` — Hero component
- `components/landing/features.tsx` — Features grid
- `components/landing/testimonials.tsx` — Testimonial section

## Generate a Login Page

```
/auth login
```

The plugin loads: design, react, nextjs, shadcn, forms, accessibility skills.

AI generates:
- `app/login/page.tsx` — Login page
- `app/login/loading.tsx` — Loading state
- `app/login/error.tsx` — Error state
- `components/auth/login-form.tsx` — Login form with RHF + Zod

## Generate a Settings Page

```
/settings
```

The plugin loads: design, react, shadcn, forms, server-actions skills.

AI generates:
- `app/settings/page.tsx` — Settings page with tabs
- `app/settings/loading.tsx`
- Sections: General, Notifications, Security, Billing
