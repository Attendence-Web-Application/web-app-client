# use node:<version>-slim as basic image for node environment
FROM node:14-slim
# working directory is /usr/src/app
WORKDIR /usr/src/app
# copy package.json into the container first and then install dependencies
COPY ./package*.json ./
RUN npm install
# copy the source files under local directory into container
COPY . .
# port 3000 will be used for listening client side
EXPOSE 3000
# start react program using npm start once the container has been created
CMD ["npm", "start"]