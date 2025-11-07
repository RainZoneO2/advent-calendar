# Advent Gallery

A simple deployable customizable advent calendar.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Deployment

### Deploying with Docker

Build the image:

```bash
docker build -t advent-calendar .
```

Run the container:

```bash
docker run -p 3000:3000 advent-calendar
```

---

Built with ❤️ using React Router.
