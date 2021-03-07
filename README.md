# Timeclockfy
## About

Timeclockfy is an API time clock for managing employees' working hours.

Through this API, the employee's clock records can be managed.

As the API only supports the records, but as a roadmap we will add the possibility for the manager to approve or not the changes made to the records by the employees so that there is greater control.

## Requirements

- [NodeJS](https://nodejs.org/en/) 
- Yarn/Npm
- [PostgreSQL](https://www.postgresql.org/)

## Setup

- First, clone this repository.
```bash
  git clone git@github.com:KevenMax/timeclockfy.git
  # or
  git clone https://github.com/KevenMax/timeclockfy.git
```
- Enter in the project.
```bash
  cd timeclockfy
```
- Create a database on your PostgreSQL client.
- Define your environment variables, so run:
```bash
  cp .env-example .env
```
- Change the database variables according to your data of database.
- Install the dependencies:
```bash
  yarn install
  # or
  npm install
```

## Getting Started

First, run the server:

```bash
yarn start
# or
npm start
```

If you prefer, you can run the server in development mode, run:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Commands

- `dev`: runs your application on `localhost:4000` with automatic reload when you make changes.
- `start`: simply start your application on `localhost:4000`.
- `db:make`: Creates a new migration with the name passed by parameter.
- `db:all`: Run all migrations pending on database.
- `db:rollback`: Run the command to return to the last migration.
- `db:rollback:all`: Run all runned migrations in the database to rollback.

---

<p align="center">Made by <span style="color: #000; font-weight: 600;">Keven Max</span> 🤟</p>