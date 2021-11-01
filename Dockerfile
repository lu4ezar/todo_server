FROM node:12.18
USER node
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "tsconfig.json", "npm-shrinkwrap.json*", "./"]
USER $user
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
