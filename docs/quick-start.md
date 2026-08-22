# Rabetbase React sub-app quick start

This guide is for React micro-frontend projects created with `rabetbase project create`, and for cloning this template source to debug locally.

In about 20 minutes you should be able to:

1. start the local dev server;
2. confirm the built-in template pages;
3. pull Lovrabet SDK model config;
4. build artifacts and load them into the Lovrabet host app;
5. know how to continue customizing the app.

## 1. Prerequisites

Confirm you have:

- Node.js 20+
- the `rabetbase` CLI
- `rabetbase auth login` completed when you need live data

```bash
npm install -g @lovrabet/rabetbase-cli
rabetbase --help
```

To pull API config:

```bash
rabetbase auth login
```

## 2. Create or open a project

### Option A: create a new project with the CLI

```bash
rabetbase project create my-sub-app --appcode app-xxxx
cd my-sub-app
```

Notes:

- `--appcode` is optional. If omitted, run `rabetbase config set appcode app-xxxx` inside the new project.
- With an AppCode, the CLI tries to pull `src/api/api.ts` automatically.
- If that pull fails, run `rabetbase api pull` later.

### Option B: debug the template source directly

```bash
cd sub-app-react-demo
npm install
```

## 3. Start locally

```bash
rabetbase run start
```

The local hostname follows the `region` in `.rabetbase.json`:

```text
cn (or omitted): https://dev.lovrabet.com:5173
id:              https://dev.lovrabet.id:5173
```

To change the port:

```bash
PORT=3000 rabetbase run start
```

Built-in pages:

| Page       | Route          | Purpose                                              |
| ---------- | -------------- | ---------------------------------------------------- |
| Home       | `/`            | Prompt entry, project status, and agent scenarios    |
| SDK demo   | `/sdk-demo`    | Model list and SDK query samples                     |
| Workbench  | `/workbench`   | Typical workbench layout                             |
| Dashboard  | `/dashboard`   | Metrics and charts                                   |
| Data screen| `/data-screen` | Full-screen display sample                           |

> Older docs mentioned `/hello-world`, `/chart-fetch`, and `/intro`. Those are not current template pages. Use `src/pages`.

For day-to-day work, describe the goal in Claude Code, Cursor, or Codex, for example:

```text
Please add a customer follow-up workbench page based on the current Lovrabet data models.
The page should include a filter area, a list, a detail drawer, and a create form.
Use the project's @lovrabet/sdk client for reads and writes.
```

The agent will use `rabetbase` in the project for model sync, page development, build checks, and host-app integration advice.

## 4. Pull SDK model config

If the project was created with `rabetbase project create` and `src/api/api.ts` is not yet your app config:

```bash
rabetbase config set appcode app-xxxx
rabetbase api pull
```

If you cloned the template source and there is no `.rabetbase.json` yet:

```bash
rabetbase workspace init --appcode app-xxxx
rabetbase api pull
```

After the pull, check:

- AppCode in `src/api/api.ts` is correct;
- `models` includes the datasets you need;
- each model's `alias` matches how you call it in code.

Import the client from `src/api/client.ts` in business pages:

```typescript
import { lovrabetClient } from "@/api/client";

const models = lovrabetClient.getModelList();

const result = await lovrabetClient.models.requirements.filter({
  currentPage: 1,
  pageSize: 20,
});
```

Use the generated names in `src/api/api.ts` as the source of truth.

## 5. Add a page

The template uses `vite-plugin-pages`. You do not write a route table by hand.

```text
src/pages/customer/index.tsx  ->  /customer
src/pages/customer/[id].tsx   ->  /customer/:id
src/pages/report/month.tsx    ->  /report/month
```

After adding a page:

1. open the matching local route and confirm it renders;
2. if standalone mode needs a left-menu entry, edit `src/layouts/MainLayout.tsx`;
3. to hang a menu in the Lovrabet host app, use the same route in page config after publish.

## 6. Build artifacts

```bash
rabetbase run build
```

Default output:

```text
dist/assets/main.js
dist/assets/main.css
```

Versioned output with a generated CDN base:

```bash
CDN_DOMAIN=https://your-cdn.com/ rabetbase run build
```

After the build, confirm:

- `dist/` exists;
- `main.js` is an ES module;
- `main.css` is reachable;
- the CDN JS/CSS URLs open in a browser.

## 7. Load into the Lovrabet host app

Add a page in Lovrabet page config, for example:

```text
Page name: SDK Demo
Route: /sdk-demo
Micro-app id: sub-app-react-demo
Load mode: import
Assets:
  https://your-cdn.com/path/to/assets/main.js
  https://your-cdn.com/path/to/assets/main.css
```

Rules:

- The route must match the route generated from `src/pages`.
- Vite projects must use the `import` load mode.
- One build can back multiple pages, such as `/sdk-demo`, `/dashboard`, and `/data-screen`.
- Pages in the same micro-frontend should share the same micro-app id.

Verify:

1. the host-app menu shows the new page;
2. clicking the menu renders the page;
3. the browser console has no asset-load or CORS errors;
4. the SDK page can read data the current login is allowed to see.

## 8. Convert an existing React project

If you are not starting from this template, a React + Vite app at least needs:

1. the `@ice/stark-app` dependency;
2. `mount` / `unmount` exports in `src/main.tsx`;
3. `getBasename()` in `src/router/index.tsx`;
4. an ES-module Vite build;
5. `import` load mode in Lovrabet page config;
6. `@lovrabet/sdk` plus generated `src/api/api.ts` when calling platform data.

Copy from this template's `src/main.tsx`, `src/router/index.tsx`, and `vite.config.ts`. Do not copy old Hello World samples.

## FAQ

### The local development URL does not open

Confirm the command is running and that you are using the hostname for the configured region. If the port is taken:

```bash
PORT=3000 rabetbase run start
```

### The SDK page has no models

Run:

```bash
rabetbase api pull
```

Then check that `src/api/api.ts` contains the current app's model config.

### The page is blank in the host app

Check first:

- page assets use `import`;
- the JS/CSS URLs are reachable;
- the route matches the path generated from `src/pages`;
- CDN returns the correct `Content-Type`.

### Standalone mode has a sidebar; the embedded host app does not

This is expected. In icestark, `MainLayout` renders page content only. The Lovrabet host app provides the outer navigation.
