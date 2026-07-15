---
name: forms
description: Form patterns with shadcn/ui, React Hook Form, and Zod. Validation, accessibility, error handling, complex form layouts, and server actions.
argument-hint: "[pattern|field|validation]"
---

# Forms

## Purpose

Build production-grade forms using React Hook Form, Zod, and shadcn/ui. Every form is accessible, validated on client and server, handles loading/error states, and provides clear user feedback.

## When to Activate

- User types `/form` or `/form <type>` (checkout, login, register, etc.)
- Auto-loaded with `/auth`, `/profile`, `/settings` commands
- User is building any form component
- User asks about form validation or patterns

## When NOT to Activate

- User is building a simple search input (single field, no validation)
- User is building a static display page

## System Prompt

You are a forms expert who has built complex multi-step forms for enterprise applications. You use React Hook Form for performance, Zod for type-safe validation, and shadcn/ui for consistent UI.

## Tech Stack

- **Form state:** React Hook Form
- **Validation:** Zod + `@hookform/resolvers/zod`
- **UI:** shadcn/ui components (Input, Select, Checkbox, Switch, etc.)
- **Server:** Next.js Server Actions (or TanStack Query mutations)

## Form Patterns

### 1. Basic Form

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof formSchema>;

export function ProfileForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '' },
  });

  const onSubmit = async (data: FormData) => {
    // Handle form submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register('name')} />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive" role="alert">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register('email')} />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive" role="alert">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}
```

### 2. Form with shadcn/ui Form Components

```tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  notifications: z.boolean().default(false),
});

export function SettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="your_username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Notifications</FormLabel>
                <FormDescription>
                  Receive email notifications.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
```

### 3. Server Action Form

```tsx
// app/actions.ts
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(prevState: unknown, formData: FormData) {
  const validated = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }
  // Authenticate...
  revalidatePath('/dashboard');
  return { success: true };
}

// app/login/page.tsx
'use client';
import { useFormState } from 'react-dom';
import { login } from '@/app/actions';

export function LoginForm() {
  const [state, formAction] = useFormState(login, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
        {state?.error?.email && (
          <p className="text-sm text-destructive">{state.error.email[0]}</p>
        )}
      </div>
      <Button type="submit">Log in</Button>
    </form>
  );
}
```

## Validation Patterns

### Zod Schema Best Practices

```tsx
const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter'),
  age: z.coerce.number().min(18, 'You must be at least 18'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  tags: z.array(z.string()).min(1, 'Select at least one tag'),
});
```

### Cross-field Validation

```tsx
const schema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
```

## Form Layout Patterns

### Single Column

```tsx
<form className="space-y-6 max-w-md">
  {/* Fields stack vertically */}
</form>
```

### Two Column (Desktop)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-2">
    <Label>First Name</Label>
    <Input />
  </div>
  <div className="space-y-2">
    <Label>Last Name</Label>
    <Input />
  </div>
</div>
```

### Sectioned Form

```tsx
<div className="space-y-12">
  <section className="space-y-6">
    <div>
      <h2 className="text-lg font-semibold">Personal Information</h2>
      <p className="text-sm text-muted-foreground">Update your personal details.</p>
    </div>
    {/* Fields */}
  </section>
  <section className="space-y-6">
    <div>
      <h2 className="text-lg font-semibold">Preferences</h2>
      <p className="text-sm text-muted-foreground">Manage your notification preferences.</p>
    </div>
    {/* Fields */}
  </section>
</div>
```

## Rules

1. **React Hook Form + Zod for all forms.** No manual form state.
2. **shadcn/ui Form components for consistent UI.** Use FormField, FormItem, FormLabel, FormMessage.
3. **Client + Server validation.** Zod on both sides.
4. **Labels above inputs.** Always. Never inline labels.
5. **Error messages below inputs.** With `role="alert"` for accessibility.
6. **Helper text between label and error.** Use FormDescription.
7. **Submit button shows loading state.** Disabled during submission.
8. **Forms are single column on mobile.** Side-by-side only on desktop.
9. **Tab order follows visual order.** Check keyboard navigation.
10. **Server actions for simple forms.** TanStack Query mutations for complex ones.

## Related Skills

- shadcn — shadcn/ui form components
- accessibility — Form accessibility
- server-actions — Server Action form handling
- react — React patterns

## Follow-up Skills

- ui-review — Review form UX
- accessibility — Audit form a11y
