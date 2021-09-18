############################################################
# Dockerfile to build 'TLDR News' Application Containers
# Based on node v14.17.6
############################################################

# Set the base image to node v14.17.6
FROM node:14.17.6

# File Author / Maintainer
LABEL Jenay Jeeva

# Copy app source
COPY . /src

# Set working directory to /src
WORKDIR /src

# Install app dependencies
RUN npm install

# Expose port to outside world
EXPOSE 3000

# Start command as per package.json
CMD ["npm", "start"]