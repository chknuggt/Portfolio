FROM node:20-alpine

ARG UID=1000
ARG GID=1000

RUN deluser --remove-home node \
    && addgroup -g ${GID} app \
    && adduser -u ${UID} -G app -s /bin/sh -D app

WORKDIR /app

COPY package*.json ./
RUN npm install && chown -R app:app /app

COPY --chown=app:app . .

USER app

EXPOSE 5173

CMD ["npm", "run", "dev"]
