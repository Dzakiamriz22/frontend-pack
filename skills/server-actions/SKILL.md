---
name: server-actions
description: Next.js Server Actions patterns. Form handling, mutations, revalidation, error handling, and progressive enhancement with zero client JS for forms.
argument-hint: "[action|form|mutation]"
---

# Server Actions

## Purpose

Use Next.js Server Actions for form handling and data mutations. Zero client-side JavaScript for basic forms. Built-in progressive enhancement, revalidation, and error handling.

## When to Activate

- User is building forms or mutation operations in Next.js
- User types `/next` or `/server-actions`
- User asks about form handling or data mutations
- User needs form validation with server + client

## When NOT to Activate

- User is not using Next.js 15+ with App Router
- User needs real-time form updates with complex client-side interactions

## System Prompt

You are a Server Actions expert. You know that Server Actions are the simplest way to handle forms in Next.js. You always combine them with Zod for validation and revalidatePath/revalidateTag for cache invalidation.

## Basic Patterns

### 1. Server Action with Form

```tsx
// app/actions.ts
'use server';

import { z } from 'zod';

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

  const { email, password } = validated.data;
  // Authenticate user
  // ...

  revalidatePath('/dashboard');
  return { success: true };
}
```

### 2. Client Component Form

```tsx
'use client';

import { useFormState } from 'react-dom';
import { login } from '@/app/actions';

const initialState = { error: null, success: false };

export function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
        {state.error?.email && (
          <p className="text-sm text-destructive">{state.error.email[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
        {state.error?.password && (
          <p className="text-sm text-destructive">{state.error.password[0]}</p>
        )}
      </div>

      <Button type="submit">Log in</Button>

      {state.success && (
        <p className="text-sm text-green-600">Logged in successfully</p>
      )}
    </form>
  );
}
```

### 3. Progressive Enhancement (No JS)

Server Actions work without JavaScript. The form submits via HTTP POST, the page re-renders on the server. Add interactivity with `useFormState` as progressive enhancement.

## Revalidation Patterns

```tsx
'use server';

import { revalidatePath } from 'next/cache';
import { revalidateTag } from 'next/cache';

// Revalidate a path
export async function createPost(formData: FormData) {
  // ... create post
  revalidatePath('/posts'); // Revalidate the posts list
  revalidatePath(`/posts/${slug}`); // Revalidate the single post
}

// Revalidate by tag
export async function updateUser(formData: FormData) {
  // ... update user
  revalidateTag(`user-${userId}`); // Revalidate tagged data
}

// Redirect after action
import { redirect } from 'next/navigation';

export async function deletePost(formData: FormData) {
  // ... delete post
  revalidatePath('/posts');
  redirect('/posts'); // Navigate after mutation
}
```

## Error Handling

```tsx
'use server';

export async function createUser(prevState: unknown, formData: FormData) {
  try {
    const user = await db.user.create({
      data: { name: formData.get('name') },
    });
    revalidatePath('/users');
    return { user };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to create user' };
  }
}
```

## Rules

1. **Server Actions for all mutations.** No API routes for simple CRUD.
2. **Always validate input with Zod.** Never trust `formData.get()` values directly.
3. **Use `useFormState` for client-side feedback** while the action runs.
4. **`revalidatePath` or `revalidateTag` after every mutation** that changes data.
5. **`redirect` after success** to navigate the user (must be called outside try/catch).
6. **Actions can be defined inline** in the component file or in a separate `actions.ts`.
7. **Use `useTransition` for non-form mutations** (button clicks that mutate data).
8. **Actions run on the server only.** Form data is submitted as the request body.

## Output Format

```tsx
// app/<resource>/actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const schema = z.object({ /* ... */ });

export async function action(prevState: unknown, formData: FormData) {
  // 1. Validate
  // 2. Mutate
  // 3. Revalidate
  // 4. Return result or redirect
}
```

## Related Skills

- nextjs — Next.js integration
- forms — Form validation patterns
- app-router — Route structure
- accessibility — Accessible form patterns

## Follow-up Skills

- forms — Complex form patterns with server actions
- ui-review — Review form UX and error handling
