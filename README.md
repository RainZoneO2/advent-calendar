# Advent Calendar

A festive, interactive advent calendar web app built with React and TypeScript. Supports images, videos, and audio files for each day.

## Features

- 25-day interactive calendar
- Support for images, videos, and audio
- Responsive design
- Automatic day locking based on current date
- Randomized/shuffled media or manual assignment via config

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### With Docker Compose

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down
```

The app will be available at `http://localhost:3000`.

## Media Setup

Place media files in `media/calendar/user/`. If empty, sample media is used.

**Supported formats:**

- Images: `.png`, `.jpg`, `.jpeg`, `.webp`
- Videos: `.mp4`, `.webm`
- Audio: `.mp3`, `.wav`, `.ogg`

**Folder structure:**

```
media/calendar/
├── user/        (add your custom media here)
└── samples/     (included fallback)
```

**Manual configuration** (optional):

Override media per day in `app/media-config.json`:

```json
{
  "1": { "imageUrl": "/media/calendar/user/custom.jpg", "videoUrl": null, "audioUrl": null },
  "2": { ... }
}
```

Otherwise media is randomly shuffled and assigned.

## Development

### Project Structure

```
app/
├── components/       # Reusable React components
├── routes/          # Route definitions and page components
├── utils/           # Utilities (mediaHelper.ts)
├── media/           # Local media files (for development)
└── app.css          # Global styles
```

### Key Components

- **`AdventGrid`**: Renders the 25-day calendar grid
- **`AdventCard`**: Individual day card with media
- **`AdventMedia`**: Modal media player (image/video/audio)
- **`mediaHelper`**: Utility for loading and shuffling media

## Deployment

### Local Production

```bash
npm run build
npm start
```

### Docker

Build:

```bash
docker build -t advent-calendar .
```

Run locally:

```bash
docker run -p 3000:3000 -v ${PWD}/media/calendar/user:/app/public/media/calendar/user:ro advent-calendar
```

Run with docker-compose:

```bash
docker-compose up -d
```

## Environment

- **Node**: v20+
- **Package manager**: npm
- **Framework**: React 19 + React Router 7
- **Styling**: Tailwind CSS 4

---

Built with ❤️ using React Router.
