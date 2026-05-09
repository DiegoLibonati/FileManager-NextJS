# Nexdrive

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional, required for Docker setup)

### Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

---

### Without Docker

> Requires a running MongoDB instance. Update `MONGO_HOST`, `MONGO_PORT`, and credentials in `.env` to point to it.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

---

### With Docker

> MongoDB is included as a container — no local installation needed.

1. Build and start all services:
   ```bash
   docker compose -f dev.docker-compose.yml up --build
   ```

The application will be available at `http://localhost:3000`.

> **WSL2 users:** Uncomment `WATCHPACK_POLLING=true` in `.env` if hot reload is not working.

## Description

**Nexdrive** is a self-hosted personal cloud file manager built with Next.js 16. It gives each registered user a private storage space on the server where they can organize, upload, and manage files and folders from any browser — no third-party cloud service required.

### What it does

**Authentication & account management**
Users can register with a username, email, and password. After registration, a verification email is sent via Nodemailer (Gmail SMTP). Login and logout are handled through JWT tokens stored as HTTP-only cookies. A full password reset flow is also included: the user requests a reset email, clicks the link, and sets a new password.

**File system navigation**
Each user gets a dedicated directory on the server at registration time. From the root folder the user can drill down into subfolders by clicking on them, creating a browser-based folder tree. The current path is always reflected in the URL, so deep links and browser back/forward work as expected.

**Folder and file operations**

- Create new folders at any depth inside the user's storage
- Upload files of any type to any existing folder
- Delete individual files or entire folders (recursive)
- View the number of items and total size inside each folder at a glance

**Cloud overview page**
A dedicated dashboard shows a summary of the user's storage: space used vs. total available (which varies by plan), the most recently uploaded file, and a flat list of all folders across the entire storage tree.

**File categories**
Files are automatically grouped into categories based on their extension (images, documents, videos, audio, code, etc.). A categories page lets the user filter and browse all files of a specific type regardless of where they are stored in the folder tree.

**Storage plans**
Two plans are available — free and paid — each with a different storage quota. The plan can be changed directly from the settings page.

**Security**
All API routes except the auth endpoints are protected by a proxy middleware (`proxy.ts`) that verifies the JWT before the request reaches any controller. Route-level protection on the frontend redirects unauthenticated users to the login page and authenticated users away from public pages.

**Tech stack**
The entire application (frontend, API, and file system operations) runs inside a single Next.js process. MongoDB is used exclusively for user accounts and recent-upload tracking; the actual files live on the server's local file system under a configurable `CLOUD_PATH`. Everything can be spun up with a single `docker compose` command.

## Technologies used

1. Next.js 16
2. React JS
3. TypeScript
4. TailwindCSS
5. MongoDB
6. Docker
7. Nginx
8. CSS3

## Libraries used

#### Dependencies

```
"@reduxjs/toolkit": "^2.2.5"
"bcryptjs": "^2.4.3"
"jose": "^5.4.0"
"mongoose": "^8.4.1"
"nodemailer": "^8.0.7"
"next": "^16.0.0"
"react": "^19.0.0"
"react-dom": "^19.0.0"
"react-icons": "^5.2.1"
"react-redux": "^9.1.2"
"sharp": "^0.34.4"
```

#### devDependencies

```
"@eslint/eslintrc": "^3.0.0"
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/bcryptjs": "^2.4.6"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/nodemailer": "^6.4.15"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@types/supertest": "^6.0.2"
"supertest": "^7.0.0"
"autoprefixer": "^10.4.18"
"eslint": "^9.0.0"
"eslint-config-next": "^16.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"postcss": "^8.5.10"
"prettier": "^3.0.0"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/nexdrive`](https://www.diegolibonati.com.ar/#/project/nexdrive)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Production

### Architecture

The production stack is defined in `prod.docker-compose.yml` and consists of three containers:

| Container        | Image                              | Role                                                           |
| ---------------- | ---------------------------------- | -------------------------------------------------------------- |
| `nexdrive-nginx` | `nginx:stable-alpine`              | Reverse proxy, static asset caching, security headers          |
| `nexdrive-app`   | Built from `Dockerfile.production` | Next.js standalone server (Node.js, port 3000 — internal only) |
| `nexdrive-db`    | `mongo:7.0`                        | MongoDB database (not exposed externally)                      |

Nginx is the only container with a published port (`8080`). The app and database communicate over an internal Docker network (`nexdrive-net`) and are never directly reachable from outside.

### Build and deploy

```bash
docker compose -f prod.docker-compose.yml up --build -d
```

The application will be available at `http://<your-host>:8080`.

To stop:

```bash
docker compose -f prod.docker-compose.yml down
```

### Docker build — multi-stage

`Dockerfile.production` uses a three-stage build to keep the final image small:

1. **deps** — installs all npm dependencies with `npm ci`
2. **builder** — runs `npm run build` to produce the Next.js standalone output
3. **runner** — copies only the standalone bundle, static assets, and public folder into a clean `node:22-alpine` image. Runs as a non-root user (`appuser`) for security.

> **Note:** The `CLOUD_PATH` directory where user files are stored must exist inside the container at runtime. Either pre-create it or ensure it is mounted as a volume so uploaded files persist across container restarts.

### Nginx

`nginx.conf` is configured with the following behaviour:

- Listens on port **8080**
- Proxies all requests to `nexdrive-app:3000` over the internal network
- **Static assets** (`/_next/static/`) are cached for 1 year (`immutable`) — content-hashed filenames guarantee cache busting on deploy
- **Images and fonts** (`ico`, `png`, `jpg`, `svg`, `woff`, etc.) are cached for 1 day
- **All other routes** are served with `no-cache, no-store` to prevent stale HTML or API responses
- **Gzip compression** is enabled for HTML, CSS, JS, JSON, and SVG
- **Security headers** applied on every response:
  - `X-Frame-Options: SAMEORIGIN` — prevents clickjacking
  - `X-Content-Type-Options: nosniff` — prevents MIME-type sniffing
  - `Referrer-Policy: strict-origin-when-cross-origin`
- `server_tokens off` — hides the Nginx version from response headers

### Data persistence

MongoDB data is stored in the named volume `mongo-prod-data`. This volume survives container restarts and `down` commands. To fully wipe the database:

```bash
docker compose -f prod.docker-compose.yml down -v
```

> **Warning:** `-v` deletes all named volumes including `mongo-prod-data`. This is irreversible.

### Environment variables

Use the same `.env` file as development. Key differences to review before deploying to production:

- Set `JWT_SECRET` to a long, random string — never reuse the dev value
- Set `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_API_URL` to the public domain or IP (e.g. `http://yourdomain.com:8080`)
- Set `CLOUD_PATH` to an absolute path that will be accessible inside the `nexdrive-app` container
- Make sure `EMAIL` and `EMAIL_PASS` are valid — registration and password reset depend on email delivery

## Documentation APP

### **Version**

```
APP VERSION: 1.0.0
README UPDATED: 08/05/2026
AUTHOR: Diego Libonati
```

### **Env Keys**

Copy `.env.example` to `.env` and fill in the values. All keys are required unless marked optional.

| Key                                 | Description                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `MONGO_HOST`                        | Hostname of the MongoDB instance (e.g. `nexdrive-db` inside Docker, `localhost` otherwise) |
| `MONGO_PORT`                        | MongoDB port — default `27017`                                                             |
| `MONGO_USER`                        | MongoDB root username                                                                      |
| `MONGO_PASS`                        | MongoDB root password                                                                      |
| `MONGO_DB_NAME`                     | Name of the database to use (e.g. `nexdrive_db`)                                           |
| `MONGO_AUTH_SOURCE`                 | Authentication database — typically `admin`                                                |
| `JWT_SECRET`                        | Secret used to sign and verify JWT tokens. Use a long random string in production.         |
| `EMAIL`                             | Gmail address used to send verification and reset emails                                   |
| `EMAIL_PASS`                        | Gmail App Password (not your account password — generate one in Google account settings)   |
| `CLOUD_PATH`                        | Absolute path on the server where user files are stored (e.g. `/home/app/cloud`)           |
| `NEXT_PUBLIC_APP_URL`               | Public base URL of the app, used for metadata (e.g. `http://localhost:3000`)               |
| `NEXT_PUBLIC_API_URL`               | Base URL used to build links in emails and redirects (e.g. `http://localhost:3000`)        |
| `NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS` | Set to `true` to redirect to home on unknown routes                                        |
| `WATCHPACK_POLLING`                 | _(optional)_ Set to `true` to fix hot reload under WSL2 / Docker on Windows                |

Example `.env`:

```env
# Database
MONGO_HOST=nexdrive-db
MONGO_PORT=27017
MONGO_USER=root
MONGO_PASS=pass
MONGO_DB_NAME=nexdrive_db
MONGO_AUTH_SOURCE=admin

# Auth
JWT_SECRET=your-secret-key-here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS=false

EMAIL=pepe@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx

CLOUD_PATH=/home/app/cloud

# Uncomment if running inside Docker on WSL2
# WATCHPACK_POLLING=true
```

### **Nexdrive Endpoints API**

Protected endpoints require a valid JWT. The token is read automatically from the `token` cookie (sent by the browser when `credentials: "include"` is used). External API clients may alternatively pass the token via the `Authorization` header. Auth endpoints (`/api/v1/auth/*`) are public and require no token.

---

- **Endpoint Name**: Alive
- **Endpoint Route**: /api/v1/alive
- **Endpoint Method**: GET
- **Endpoint Fn**: This endpoint returns the version, author and name of the api.

---

- **Endpoint Name**: Login
- **Endpoint Route**: /api/v1/auth/login
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint used to log in to an existing account. Receives a username and password body

---

- **Endpoint Name**: LogOut
- **Endpoint Route**: /api/v1/auth/logout
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint for logging out of the application

---

- **Endpoint Name**: Register
- **Endpoint Route**: /api/v1/auth/register
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint used to register in the application to log in and access the account. You receive a username, email and password body.

---

- **Endpoint Name**: Reset Password
- **Endpoint Route**: /api/v1/auth/reset
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint that serves to reset the password of a specific account by body with id, username and password.

---

- **Endpoint Name**: Send Email Reset Password
- **Endpoint Route**: /api/v1/auth/send_email_reset
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint used to send an email to reset the password of an account. Send a body with the email to send the email.

---

- **Endpoint Name**: Verify Email
- **Endpoint Route**: /api/v1/auth/verify
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to verify the email address of our account. By parameters it will send the id of the hashed user and the username of the account to be verified.

---

- **Endpoint Name**: Get Categories
- **Endpoint Route**: /api/v1/filemanager/categories
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to obtain all the categories of the application.

---

- **Endpoint Name**: Get Categories Files
- **Endpoint Route**: /api/v1/filemanager/categories/files
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to obtain the files of a specific category. It receives by parameters the id of the category to check.

---

- **Endpoint Name**: Get All Folders
- **Endpoint Route**: /api/v1/filemanager/folders
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to obtain all the folders of the application.

---

- **Endpoint Name**: Get Recent Upload File
- **Endpoint Route**: /api/v1/filemanager/recent_upload
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint that serves to obtain the most recent file uploaded to our account.

---

- **Endpoint Name**: Get Space Used
- **Endpoint Route**: /api/v1/filemanager/space_used
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint that serves to obtain information about the available, used and limited space in our account that varies depending on the plan.

---

- **Endpoint Name**: Upload File
- **Endpoint Route**: /api/v1/filemanager/upload
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint used to upload a file. We must pass through the body a formData with the file and the path to upload (the path has to be existing).

---

- **Endpoint Name**: Get Content of Folder
- **Endpoint Route**: /api/v1/filemanager
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to get all files and folders from a specific path sent by parameter.

---

- **Endpoint Name**: Create Folder
- **Endpoint Route**: /api/v1/filemanager
- **Endpoint Method**: POST
- **Endpoint Fn**: Endpoint which is used to create a specific folder by passing the path to where the folder should be created in body.

---

- **Endpoint Name**: Delete Folder Or File
- **Endpoint Route**: /api/v1/filemanager
- **Endpoint Method**: DELETE
- **Endpoint Fn**: Endpoint used to delete a folder or file. By parameter we will pass the path to delete and the type to delete if it is a folder or file.

---

- **Endpoint Name**: Change Plan
- **Endpoint Route**: /api/v1/user/change_plan
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to change the plan of an account by passing by parameter the plan to change. 0 free and 1 paid.

---

- **Endpoint Name**: Send Email To Verify
- **Endpoint Route**: /api/v1/user/send_email_to_verify
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to forward mail for account verification

---

- **Endpoint Name**: Get User Info
- **Endpoint Route**: /api/v1/user/user_info
- **Endpoint Method**: GET
- **Endpoint Fn**: Endpoint used to obtain information about the active user, i.e., logged in.

---

## Security

### npm audit

Check for known vulnerabilities in dependencies:

```bash
npm audit
```

Fix automatically where possible:

```bash
npm audit fix
```

### Authentication

- Passwords are hashed with `bcryptjs` before being stored — plain-text passwords never touch the database.
- JWT tokens are signed and verified with `jose` (HS256) using the `JWT_SECRET` env variable. Tokens expire after 30 days and are stored in a cookie named `token`.
- `proxy.ts` (Next.js 16 middleware) intercepts every request before it reaches a route handler. For API routes it reads the JWT from the `Authorization` header or, if absent, from the `token` cookie, then verifies it and injects the decoded payload into a `payload` request header for controllers to consume. For page routes it redirects unauthenticated users to `/login` and authenticated users away from public pages.
- The `getSession()` server helper provides a typed session object to Server Components and API routes by reading and verifying the `token` cookie directly — no middleware round-trip needed.
- The `getPayload()` helper reads the pre-verified payload injected by `proxy.ts`, so controllers never perform JWT verification themselves.

## Known Issues

None at the moment.
