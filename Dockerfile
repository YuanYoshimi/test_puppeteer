FROM node:20-slim

# Install Chromium (not Chrome/Chrome Stable!)
RUN apt-get update && \
    apt-get install -y chromium && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Set Puppeteer to use the right path!
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create a Puppeteer cache directory (sometimes needed)
RUN mkdir -p /usr/src/app/.cache/puppeteer

CMD ["node", "index.js"]
