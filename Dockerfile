FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_ENV=development

RUN npm install --include=dev

COPY . .

RUN npm run docker-test
RUN npm run build

FROM nginx:alpine
# removes default config on 80 port
RUN rm /etc/nginx/conf.d/default.conf
# copy custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]