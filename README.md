# NESTJS CRUD APP FOR MEDIA STORAGE
This is a simple CRUD API for media storage powered by Nodejs, Nestjs and TS

## Requirements
- NodeJS runtime
- NPM or Yarn package manager
- Postgres Database

## Features
- Completely written in [Typescript](https://typescriptlang.org/)
- [Nestjs](https://github.com/nestjs/nest) Nodejs framework
- [PostgreSQL](https://www.postgresql.org/docs/) Open Source Relational Database
- [TypeORM](https://typeorm.io/) SQL ORM for Nodejs

## How to install
- Clone the repository
- `git clone https://github.com/OjerIsaac/media_storage_app.git`
- `cd media_storage_app`
- Install dependencies
- `npm install`
- Setup environment variable
- `cp .env.sample .env`
- Run migration
- `npm run db:migrate`
- Run the server in dev env
- `npm run start:dev`

## Documentation.

### Create media
<p align="center">
  <img src="create.jpg" width="100%" alt="create media" title="image sample">
</p>

### Fetch single media
<p align="center">
  <img src="getSingle.jpg" width="100%" alt="fetch single media" title="image sample">
</p>

### Fetch all media
<p align="center">
  <img src="getall.jpg" width="100%" alt="fetch all media" title="image sample">
</p>

### Update media
<p align="center">
  <img src="update.jpg" width="100%" alt="update media" title="image sample">
</p>