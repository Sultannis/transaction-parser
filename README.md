# RESTful API application for processing

The API requires user to authorize and after providing token user can attach and process transactions CSV files.
The transactions are saved in PostgreSQL database and open access to fetch them using filters.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
