FROM node:18.12.1

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install
RUN npm install -g concurrently express nodemon

EXPOSE 3000 5000

CMD ["npm", "start"]

# docker build -t docker-react .
# docker run -it --rm -d -p 3000:3000 -p 5000:5000 docker-react


