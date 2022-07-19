FROM node:16

# Put our code in the /app folder, and copy all files
# Note that "node_modules" is ignored, thanks to the ".dockerignore" file.
WORKDIR /app
COPY . .

# Mark environment as a development environment
ENV NODE_ENV=development

# Install the node_modules required to run the project
RUN yarn

# When a user calls "docker-compose up", run the development webserver.
CMD ["yarn", "dev"]
EXPOSE 8080
