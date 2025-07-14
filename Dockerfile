# Use Puppeteer's official image (includes Chrome)
FROM ghcr.io/puppeteer/puppeteer:latest

# Don’t re-download Chrome; it’s already in the image
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set workdir
WORKDIR /usr/src/app

# Copy and install dependencies
COPY package*.json ./
RUN npm ci

# Copy your code
COPY . .

# Start your app
CMD ["node", "index.js"]