# Roadmap Tracker — AI/LLMs for Senior Data Scientists

[Versão em português](README.md)

Self-hosted application to track a study roadmap: progress by topic/subtopic,
deadlines, study time, certifications, flashcards with spaced repetition,
personal courses, statistics, and backup.

## Architecture

```
roadmap-tracker/
├── client/
│   └── src/
│       ├── data/                -> static catalog (roadmap, glossary, etc.)
│       ├── state/               -> domain logic (persistence, topics, timer,
│       │                          statistics, flashcards, courses)
│       ├── views/
│       │   ├── quarter/         -> main screen template + interactions
│       │   └── flashcards/      -> flashcard management
│       ├── state.js             -> compatibility facade (re-export)
│       └── ...
├── server/
│   └── src/
│       ├── app.js               -> Express application composition
│       ├── config/              -> environment configuration
│       ├── modules/state/       -> state module routes
│       ├── repositories/        -> JSON file persistence access
│       └── index.js             -> HTTP bootstrap
├── Dockerfile
└── docker-compose.yml
```

- Frontend: plain JavaScript ES modules in `client/src/`, without React/Vue,
  with responsibilities separated into layers: catalog (`data/`), domain logic
  (`state/`), and rendering/interactions (`views/`). The `state.js` file was
  kept as a facade to preserve import compatibility.
- Backend: Express organized into simple layers: bootstrap (`index.js`),
  composition (`app.js`), configuration (`config/`), API module
  (`modules/state/`), and persistence (`repositories/`). The API keeps the same
  routes (`GET /api/state`, `PUT /api/state`) and persists data in
  `data/state.json`.
- No authentication: as designed, this app assumes only devices in your local
  network will access it. Do not expose this port directly to the public
  internet without adding protection first (see the Security section below).

## Running with Podman (Bazzite)

```bash
cd roadmap-tracker
podman-compose up -d --build
```

This builds the image (compiles the client with Vite and packages it together
with the server) and starts the container in the background, listening on port
`8080` inside the container.

To view logs:

```bash
podman-compose logs -f
```

To stop it:

```bash
podman-compose down
```

If you prefer plain Docker, the commands are the same, replacing
`podman-compose` with `docker compose`.

## Accessing from other devices on your local network

1. Find the IP address of the machine running the container:

   ```bash
   ip addr show | grep "inet "
   ```

2. On any device on the same network (phone, laptop, etc.), open:

   ```
   http://<MACHINE-IP>:8080
   ```

All devices will read and write the same state file on the server, so progress
stays synchronized automatically across devices without needing to
export/import backups between them.

## Common troubleshooting

Address already in use: something else is already using that port. Change the
left-hand port in `docker-compose.yml` (for example, `"8090:8080"`) and run
`podman-compose up -d --build` again.

Could not save, check the connection to the server: if this appears in the
sidebar while the page still loads normally, the container likely could not
write to `data/state.json`, usually because SELinux on Fedora/Bazzite blocked
writes to a mounted host folder. The `:Z` volume suffix in `docker-compose.yml`
already handles this in this project. If the issue persists:

```bash
podman-compose down
rm -rf data
podman-compose up -d --build
podman-compose logs -f
```

Checking whether the backend is responding: on the machine running the
container:

```bash
curl http://localhost:8090/api/health
```

It should return `{"ok":true}`. If it fails, the problem is in the
container/port setup, not the browser.

## Backup and data persistence

The `docker-compose.yml` file mounts a local `./data` folder into the
container, where `state.json` stores all roadmap progress. That file:

- Survives `podman-compose down` / `up` and image rebuilds.
- Can be copied manually for backup:

  ```bash
  cp data/state.json data/state.backup-$(date +%Y%m%d).json
  ```

- Can also be downloaded from the application itself in the Data and backup
  section as either a full `.json` backup or a readable `.md` export.

## Updating the application

If you change the roadmap code, flashcards, or anything else later, just
rebuild the image. The state file in `./data` is not affected:

```bash
podman-compose up -d --build
```

## Local development (without Docker)

Useful if you want to change code and see the result quickly with Vite hot
reload.

Terminal 1 — backend:

```bash
cd server
npm install
npm start
```

Terminal 2 — frontend (with hot reload and automatic API proxy):

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` (the Vite dev server). Requests to `/api` are
automatically proxied to the backend on `:8080` (see `client/vite.config.js`).

## Security

As discussed, this version has no authentication. It assumes only devices on
your local network will access it. If you later want to:

- Access it from outside your home network: prefer using your existing
  WireGuard VPN instead of exposing port 8080 directly to the internet.
- Add a simple protection layer: place a reverse proxy (Caddy or Nginx) in
  front of it and require HTTP Basic Auth without changing the app code.

## Data structure reference

`state.json` stores a single object with:

| Field | Description |
|---|---|
| `subtopics` | progress and notes per subtopic |
| `topicNotes` / `quarterNotes` | general notes |
| `quarterDeadlines` | deadlines per quarter |
| `studyTime` | accumulated study seconds per quarter |
| `customTopics` | manually added topics |
| `myCourses` | personal courses with status |
| `customCards` / `cardEdits` / `removedCards` / `cardProgress` | flashcards and spaced repetition progress |
| `log` | history of the latest 30 activities |

This is the same format used by the previous single-HTML version, so a `.json`
backup exported there can also be imported here through the Data and backup
section.