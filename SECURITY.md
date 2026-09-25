# Security Policy

## Supported Versions

Security fixes are applied to the latest code on the `main` branch. There are no tagged releases; always use the most recent commit of `main`.

## Reporting a Vulnerability

Please do **not** open a public GitHub issue for an exploitable vulnerability.

Report it privately using GitHub's vulnerability reporting for this repository:

1. Open the repository on GitHub → **Security** tab → **Report a vulnerability**.
2. Include a description, reproduction steps, and the potential impact.

If the private reporting form is not available on this repository, open a normal issue asking to establish a private channel first, without including exploit details.

> Note: this project does not have a dedicated security email. GitHub's private vulnerability reporting is the supported channel.

## Scope

**In scope**

- Authentication and session handling (Supabase Auth)
- Broken access control or missing Row Level Security policies in `supabase/migrations`
- XSS, injection, or CSRF affecting the dashboard
- Secrets or credentials leaked into source, build output, or git history

**Out of scope**

- Vulnerabilities in third-party dependencies (report upstream)
- Denial of service against demo deployments
- Issues that require physical or privileged access to a user's machine

## Security Practices for Contributors

- Never commit `.env`, `.env.local`, or real credentials — only the placeholders in `.env.example`.
- Never log or expose `VITE_SUPABASE_URL` service-role or secret keys; only anon/publishable keys belong in client code.
- Every new table in `supabase/migrations` must have RLS policies enabled.
