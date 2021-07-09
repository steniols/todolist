# pern-todolist

Um simples aplicativo de tarefas utilizando Postgress, Express, React e Node.

## Instalar o servidor

```bash
cd server
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
node index.js
```

## Instalar o cliente

```bash
cd client
npm install
npm start
```
