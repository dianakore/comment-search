FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_ENV=development

RUN npm install --include=dev

COPY . .

RUN npm run docker-test
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]