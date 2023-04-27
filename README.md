# Digisure API

> Simple API

## Frameworks, Libraries and Tools

- NPM as dependency manager;
- Mocha as test framework;
- Sinon as Standalone test spies, stubs and mocks;
- Chai as BDD/TDD assertion library;
- ESLint as lint tool;
- Pino as logger;
- NYC as code coverage tooling;
- Node Fetch as HTTP client;
- Node Config used to load configuration per environment;
- Optional: Docker and Docker compose for application provisioning;

## How to install

### Manual installation

Make sure that you are using the NodeJS version is the same as `.nvmrc` file version. If you don't have this version please use a version manager such as `nvm` or `n` to manage your local nodejs versions.

> Please make sure that you are using NodeJS version 6.10.2

Assuming that you are using `nvm`, please run the commands inside this folder:

```bash
$ nvm install $(cat .nvmrc); # install required nodejs version
$ nvm use $(cat .nvmrc); # use nodejs version
$ npm install
```

In Windows, please install NodeJS using one of these options:

Via `NVM Windows` package: Dowload via [this link](https://github.com/coreybutler/nvm-windows). After that, run the commands:

```bash
$ nvm install $(cat .nvmrc); # install required nodejs version
$ nvm use $(cat .nvmrc); # use nodejs version
$ npm install
```

Via Chocolatey:

```bash
$ choco install nodejs.install -version v8.9.3
```

## NPM Commands

### Run the app

```bash
$ npm start:app
```

### Run the app with debug

```bash
$ npm debug:app
```

And the project it will be running locally using `--inspect-brk` flag, enabling V8 inspector integration. For more details, please take a look at [NodeJS Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/).

### Run the unit tests

```bash
$ npm test:unit # run the tests
```

### Run the integration tests

By definition, the API has some integration tests checking directly the Database integration. It also means this is fully covered via Docker Compose!

To get this test running you should have Docker and Docker compose installed locally and, after that, run the command below

```bash
$ docker-compose run integration_tests -f=docker-compose-test.yml # run the integration tests
```

### Run the tests in watch mode

```bash
$ npm test:unit -- -w # run the unit tests in watch mode
$ npm test:integration -- -w # run the integration tests in watch mode
```

## Running Docker - Troubleshooting

In case you want to run this application directly via docker compose, just run

```bash
$ docker-compose up --build
```

As soon as you run this command, mysql database is created using the bootstrap SQL commands available on `./docs` folder.

> Please check `docs` folder and `docker-compose.yml` for more details

Here's a list of useful URLS:

- http://localhost:3000/v1 : API discovery Endpoint
- http://localhost:8080: PHP My Admin - a Web MySQL manager in case you need to check the information - It access the application database

For Integration tests:

- http://localhost:8081: PHP My Admin - a Web MySQL manager in case you need to check the information - It access the test database. Only for Test Purposes

## Improvements

These are the list of the tech debt / improvements for this project

- [] Use generators/iterators instead of `for... and await` on the email provider;
- [] Add performance tests;
- [] Integrate Sequelize as ORM solution in application;
- [] Service discovery integration, such as `consul`, with fallback for `.env`. This will make the application decoupled with the code and configuration, avoiding unnecessary deployment in case of the configuration changes;
- [] Finishing up other API endpoints and integrations

## Author

**Wilson Mendes (willmendesneto)**

- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>
