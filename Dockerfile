# Этап 1: Сборка приложения
FROM node:16 as build-stage

WORKDIR /app

# Копирование файлов package.json и установка зависимостей
COPY app/package*.json ./
RUN npm install

# Копирование остальных файлов проекта
COPY app/ ./

# Сборка приложения
RUN npm run build

# Этап 2: Настройка Nginx для раздачи статических файлов
FROM nginx:stable-alpine as production-stage

# Копирование собранных файлов из этапа сборки
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Копирование конфигурационного файла Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открытие порта 80
EXPOSE 80

# Запуск Nginx при старте контейнера
CMD ["nginx", "-g", "daemon off;"]