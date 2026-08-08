---
name: web-code-review
description: Review web code for quality, accessibility, performance, and best practices. Use when the user wants a code review of their frontend/web code.
disable-model-invocation: true
argument-hint: [file-or-directory]
allowed-tools: Read, Glob, Grep, Agent
---

## Web Code Review

Review the specified files or recent changes for the following categories. If `$ARGUMENTS` is provided, review those specific files/directories. Otherwise, review all staged and unstaged changes via git diff.

### 1. Correctness & Bugs
- Logic errors, off-by-one, null/undefined access
- Missing error handling at system boundaries
- Race conditions or stale state in React components
- Incorrect TypeScript types or unsafe casts

### 2. Accessibility (a11y)
- Missing or incorrect ARIA attributes
- Interactive elements without keyboard support
- Missing alt text, labels, or roles
- Color contrast and focus indicators
- Semantic HTML usage (e.g., `<button>` vs `<div onClick>`)

### 3. Performance
- Unnecessary re-renders (missing memoization where it matters)
- Large bundle imports that could be tree-shaken or lazy-loaded
- Layout thrashing or expensive DOM operations
- Missing `key` props or unstable keys in lists
- Unoptimised images or assets

### 4. Responsive Design & CSS
- Broken layouts at common breakpoints (mobile, tablet, desktop)
- Hardcoded dimensions that should be relative
- Missing responsive utilities or media queries
- Overflow issues, scrollbar quirks, or z-index conflicts
- Inconsistent spacing or typography

### 5. Security
- XSS via dangerouslySetInnerHTML or unescaped user input
- Sensitive data exposed in client-side code
- Missing rel="noopener noreferrer" on external links
- Insecure external resource loading

### 6. Component Architecture
- Components doing too much — should be split into smaller, focused components
- Repeated JSX that should be extracted into a reusable component
- Business logic mixed into presentational components (separate concerns)
- Components that take too many props — consider composition or context instead
- Shared layout patterns not using a common wrapper component
- God components (>150 lines) that handle multiple responsibilities

### 7. React Best Practices
- State that should be derived rather than stored separately
- useEffect for things that should be event handlers or computed values
- State lifted too high or not high enough in the component tree
- Missing cleanup in useEffect (event listeners, subscriptions, timers)
- Direct DOM manipulation instead of using refs or React state
- Prop drilling through many levels — consider context or composition
- "use client" directive missing where hooks or browser APIs are used, or added unnecessarily
- Unstable references passed as props causing child re-renders (inline objects/arrays/functions in JSX)

### 8. Styling & Tailwind
- Inconsistent use of design tokens / Tailwind theme values vs hardcoded colours or sizes
- Conflicting or redundant Tailwind classes on the same element
- Inline styles used where Tailwind classes exist
- Missing dark mode or theme-aware classes where the rest of the codebase uses them
- Tailwind classes that could be simplified (e.g., `px-4 py-4` → `p-4`)
- Layout approaches that mix different systems (grid + absolute positioning when flex alone would work)

### 9. Code Quality
- Dead code, unused imports, or redundant logic
- Inconsistent naming or patterns vs the rest of the codebase
- Missing or misleading TypeScript types

## Output Format

For each issue found, report:

```
[SEVERITY] Category — file:line
Description of the issue.
Suggested fix (if not obvious).
```

Severity levels: `[CRITICAL]` `[WARNING]` `[INFO]`

End with a short summary: total issues by severity, and an overall assessment.
