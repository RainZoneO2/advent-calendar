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

### Directory Structure

Place your media files in the `media/calendar/` directory. Files are automatically detected by extension:

```
media/calendar/
├── 01-christmas.jpg
├── 02-tree.mp4
├── 03-carol.mp3
├── 04-ornaments.webp
└── ...
```

### Supported Formats

- **Images**: `.png`, `.jpg`, `.jpeg`, `.webp`
- **Videos**: `.mp4`, `.webm`
- **Audio**: `.mp3`, `.wav`, `.ogg`

### With Docker

When using Docker, bind your media folder to the container:

```bash
docker run -p 3000:3000 -v /path/to/your/media:/app/public/media/calendar advent-calendar
```

Or with docker-compose (edit `docker-compose.yml` before running):

```yaml
volumes:
  - /path/to/your/media:/app/public/media/calendar:ro
```

### Media Configuration

You can optionally override media assignments in `app/media-config.json`:

```json
{
  "1": {
    "imageUrl": "/media/calendar/01-custom.jpg",
    "videoUrl": "/media/calendar/video.mp4",
    "audioUrl": "/media/calendar/audio.mp3"
  },
  "2": { ... }
}
```

If not set, media is randomly shuffled and assigned to days.

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

Build and deploy the production build:

```bash
npm run build
npm start
```

Or use Docker for containerized deployment:

```bash
docker build -t advent-calendar .
docker run -p 3000:3000 -v /path/to/media:/app/public/media/calendar advent-calendar
```

## Environment

- **Node**: v20+
- **Package manager**: npm
- **Framework**: React 19 + React Router 7
- **Styling**: Tailwind CSS 4

---

Built with ❤️ using React Router.
