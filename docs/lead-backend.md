# Lead backend operations

## What is implemented

- Contact, dealer and Hydra TDS submissions commit to SQLite before success is returned.
- Atomic idempotency keys preserve the same reference on retries for 24 hours. Identical content is coalesced for one hour, including concurrent requests.
- Bounded request-body reads, input validation, consent checks, same-origin checks and hidden bot fields.
- Database-backed global, client and phone submission limits; persistent login limits. Restarting the application does not reset limits.
- Individual administrator accounts with salted scrypt password hashes, random server-side sessions, eight-hour expiry and server-side logout revocation. Password resets and account disabling revoke existing sessions.
- Search, 25-record pagination, assignment, follow-up dates, status and notes. Version checks prevent one administrator silently overwriting another's edits.
- Activity records track creation, updates, login and exports. CSV export includes all filtered records and escapes spreadsheet formulas.
- Structured error logs contain an event, reference and error class without submitted details or credentials.
- Online SQLite backups use Node's backup API, integrity checks and SHA-256 manifests. Restore refuses to overwrite an existing database. Restored backups contain no active admin sessions.

## Local access

Requires Node.js 22.13+; tested with Node 24. Open `/admin/leads`.

Development automatically provisions username `admin` from `.data/admin-password` when no accounts exist. Existing local passwords continue working. Production never creates a default account and no longer reads `LEADS_ADMIN_PASSWORD`.

Data defaults to `.data/leads.sqlite`; this directory and the test database build output are excluded from Git. Database permissions are 0600 and newly created private directories use 0700.

## Provision or reset an account

Run `npm run leads:admin -- set-password USERNAME` with a 16 to 200 character password on stdin. Do not place the password in command arguments or shell history. Example in zsh/bash:

```sh
read -rs 'lead_password?New admin password: '
printf '%s' "$lead_password" | npm run leads:admin -- set-password alex
unset lead_password
```

Use `npm run leads:admin -- disable alex` to revoke access. The command refuses to disable the last active account. Provisioned accounts have equal inbox access. MFA and role-based permissions are not implemented; put the admin path behind an identity-aware access gateway with MFA for internet deployment.

## Production configuration

Use one persistent Node server. This SQLite design does not support ephemeral/serverless disks or separate replicas. For that hosting model, migrate storage and rate limits to managed services first.

Set:

```dotenv
LEADS_DB_PATH=/srv/bondtite-private/leads.sqlite
LEADS_BACKUP_DIR=/srv/bondtite-backups
LEADS_PUBLIC_ORIGIN=https://your-domain.example
LEADS_TRUST_PROXY=true
```

Configure HTTPS. Only set `LEADS_TRUST_PROXY=true` when the reverse proxy **overwrites X-Real-IP with the real connecting client address**, strips inbound spoofed values, and prevents direct public access to Node. Otherwise limits use a conservative shared bucket, not untrusted forwarded addresses. Apply edge rate limits too. Phone limits are eight submissions per hour; per-client limits are fifteen per minute when proxy trust is enabled.

Provision a named admin using the command above with the same `LEADS_DB_PATH` as the application. The previous `LEADS_ADMIN_PASSWORD` environment variable is obsolete. Keep the private storage outside the served directory, restrict host access, and encrypt the hosting volume and offsite backups.

## Automated backup service

- One verified snapshot: `npm run leads:backup`
- Immediate snapshot, then every six hours: `npm run leads:backup:watch`
- Keep the watcher under the hosting platform's process supervisor with restart-on-failure, using the same database and backup environment variables as the app.
- Latest 28 verified snapshots are retained (seven days at six-hour intervals).
- Ship snapshots and matching `.sha256` manifests to encrypted offsite storage. Same-disk backups alone do not cover loss of the server.
- Alert on `backup_failed` in worker logs and missing `backup_verified` for more than seven hours. No external alert destination is configured in this repository.

Do not copy a live `.sqlite` file directly; committed data may be in its WAL file. The backup command handles that correctly.

## Restore procedure

1. Stop the app and backup worker.
2. Run `npm run leads:restore -- /backup/leads-TIMESTAMP.sqlite /private/new-leads.sqlite`.
3. The script verifies the checksum and SQLite integrity and restores to a new path.
4. Point `LEADS_DB_PATH` to that new file and restart services.
5. Sign in again and check recent leads and counts. The old database remains untouched.

## Checks and monitoring

`npm run test:leads` starts an isolated local server on port 3104 with a disposable database. It checks validation, cross-origin rejection, bot fields, oversized requests, concurrent retries, conflict handling, TDS, auth, history, stale updates, safe CSV, database failure, throttling, backup/restore and logout revocation. It leaves customer records untouched.

`/api/admin/health` is authenticated and checks database availability; it does not prove disk capacity, backup freshness or end-to-end delivery. Use host monitoring for disk space, process uptime, error rates and backup freshness. Wire JSON error logs to the hosting provider's alert service.

The inbox is the lead destination. Email/CRM notifications, MFA gateway, offsite backup storage, alert delivery and a data retention policy need deployment configuration; they are not silently assumed to exist.

## Lead origin

Each new lead records the server receipt timestamp (displayed in IST), form name and submitting page URL. Form names are assigned by the endpoint; the page comes from the browser with a same-site Referer fallback. Only same-site URLs are stored; query strings and fragments are removed so project details in contact URLs are not duplicated into attribution. This identifies the page containing the submitted form, not the visitor's full browsing journey. Page attribution is browser-reported, not proof of origin. Old leads without captured page data show “Not recorded for this lead”. CSV exports include `created_at` (UTC), `form_name` and `source_page`.
