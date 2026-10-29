# Kanagam Tech Academy

## Local development

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Vite prints the local URL when the server starts.

## Production and Coolify

Configure the application to run these commands:

```sh
npm run build
npm start
```

Set Coolify's application port to the value of the `PORT` environment variable. The production server uses `PORT` when provided (default: `8080`) and listens on all network interfaces so Coolify's proxy can reach it. It also serves the app shell for client-side routes such as `/students`.
