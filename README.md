start server

RUN npm install
RUN npm install nodemon -g (optional)
RUN export NODE_ENV=localhost
RUN npm start