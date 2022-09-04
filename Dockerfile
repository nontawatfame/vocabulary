FROM node:alpine

# Set working directory
WORKDIR /usr/app

ENV NODE_ENV product
ENV TZ="Asia/Bangkok"
# Install PM2 globally
RUN npm install --global pm2

RUN npm install -g pnpm

RUN npm install typescript -g

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./


# Copy all files
COPY ./ ./

# Install dependencies
RUN pnpm install

RUN tsc
# Expose the listening port
EXPOSE 8080

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

ENV RUN_START="production"

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "pnpm","--", "run", "start_pro" ]