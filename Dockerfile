FROM node:lts

WORKDIR /appNode

COPY . .

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]

# 