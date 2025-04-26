# 1. Use an official Node.js image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install app dependencies
COPY package*.json ./
RUN npm install

# 4. Copy app source code
COPY . .

# 5. Build the NestJS app
RUN npm run build

# 6. Expose the app port (Nest default is 3000)
EXPOSE 3000

# 7. Start the app
CMD ["npm", "run", "start:dev"]
# CMD ["npm", "run", "start:prod"]
