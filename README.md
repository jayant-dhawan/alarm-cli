# alarm-cli

> This is a alarm CLI application built using [Ink](https://github.com/vadimdemedes/ink), [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/) and [Nodejs](https://nodejs.org/en). I mentioned React but that doesn't mean that is web, electron or native app. Ink provide a React wrapper to build CLI applications easily by internally using [Yoga](https://www.yogalayout.dev/), [Chalk](https://github.com/chalk/chalk#readme) and other helper libraries for building CLI in Nodejs.

## Build

Build the application first before using the app.

```bash
$ npm run build
```

This command will create a dist folder in the current directory.

## Run

There are two ways to run the application.

```bash
$ npm run cli
// this will build the CLI first and run the application
```

```bash
$ alarm-cli
// For this your have to manually build the CLI first using above command
```

## Troubleshoot

If you get below error on starting the app try manually building the app using the command in [Build](#Build) section.

```bash
sh: <path>/node/v20.15.0/bin/alarm-cli: Permission denied
```