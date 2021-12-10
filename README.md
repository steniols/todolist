# Todolist App

Um simples aplicativo de tarefas utilizando Postgress, Express, React e Node.

## Live

https://steniols-pern-todo-list.herokuapp.com/

## Instalar o servidor

```bash
cp .env.sample .env
npm install
```

## Configurar o banco de dados

Rode o comando abaixo, que irá criar o banco de dados padrão em uma imagem do Docker.

```bash
docker run -d -p 5432:5432 -e POSTGRES_USERNAME=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=perntodolist postgres:12.6
```

## Rodar o servidor

```bash
npm start
```

## Instalar o cliente

```bash
cd client
cp .env.sample .env
npm install
```

## Rodar o cliente

```bash
npm start
```
