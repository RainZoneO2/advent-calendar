FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
LABEL maintainer="RainZoneO2"
LABEL description="Advent Calendar web application with support for custom media (images, videos, audio) for each day"
LABEL version="1.0"

COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app

# Create media directories for mounting
RUN mkdir -p /app/public/media/calendar/user /app/public/media/calendar/samples

# Copy sample media from build
COPY ./app/media/calendar/samples /app/public/media/calendar/samples

# Expose port 3000 for the application
EXPOSE 3000

# Volume mount point for user media
VOLUME ["/app/public/media/calendar/user"]

CMD ["npm", "run", "start"]
