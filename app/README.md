# React+Rails 環境構築

## backend
docker-compose run back rails new . --force --database=mysql --skip-docker --api

docker compose build

docker compose up

docker compose exec back bash

rails db:create

## frontend
npx create-next-app@latest frontend --ts

docker-compose up --build

docker compose exec front bash
