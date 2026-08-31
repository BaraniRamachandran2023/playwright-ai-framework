# 1. Use Microsoft's official Playwright image (matches Node.js & browser dependencies)
FROM mcr.microsoft.com/playwright:v1.62.1-noble

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package manifest files first to leverage Docker layer caching
COPY package*.json ./

# 4. Install project dependencies cleanly
RUN npm ci

# 5. Copy the rest of your automation framework code into the container
COPY . .

# 6. Default command to execute your Playwright tests when the container starts
CMD ["npx", "playwright", "test"]