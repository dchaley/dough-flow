>![Baguette](img/bread-icon-64.png)
>
> ***DoughFlow***, n
>
> 1. the state of flow while baking;
> 1. a cheesy cash-flow pun;
> 1. a cash flow web app.

# Architecture

DoughFlow is a client/server web application, built on [EmberJS](https://emberjs.com/)/[Google Cloud Firebase](https://firebase.google.com/docs/) respectively.

Back-end logic is implemented via [Firebase Cloud Functions](https://firebase.google.com/docs/functions/), using [Firebase](https://firebase.google.com/docs/web/setup) itself as a backing store for user data. This encapsulates business logic away from clients in a light-weight, server-less deployment.

The front-end is served as a static page from App Engine (*TODO don't do this.... serve from GCS or something*).

## Infrastructure

Hosted on Google App Engine, using its [microservice](https://cloud.google.com/appengine/docs/standard/python/microservices-on-app-engine) framework:

* Front-end implemented as service: `default`

The EmberJS files are served as static files (html & assets).

* Back-end functions are implemented as Cloud Functions
  (NB: Firebase flavor, not ["pure" Cloud](https://cloud.google.com/functions/); integration seems too alpha)
* Back-end storage is straight-up Firebase

# Development

For convenience, let `DOUGH_FLOW=/home/me/my_dough_flow_checkout` (e.g., add to shell rc, you need `export` in zsh)

## Requirements

* GAE project with GAE app (probably need billing set up)
* Google Cloud SDK
  * https://cloud.google.com/sdk/downloads
* NodeJS (I used 7.10 with nvm)
  * `brew install nvm; nvm install v7.10`
* EmberJS (I used most recent as of 2017-05-26)
  * `npm install -g ember-cli@2.11`
* Firebase
  * Firebase project associated with your Google Cloud project
  * Firebase Server & SDK
    * `npm install -g firebase-tools; npm install -g firebase-server`

## Building client (EmberJS)

Go to `src/frontend`.

```
ember build
```

(nb: is that it? does that auto install npm stuff?)

Go to `gae/`. Copy the build artifact for GAE deployment.

```
ln -s ../src/frontend/dist
```
See [the front-end readme](src/frontend/README.md) for more information.

### Building for production

When building/deploying to actual AppEngine:

```
ember build --environment=production
```

## Building Firebase components

TODO

### Set up localhost route

Edit `/etc/hosts` (or similar) to map:

`127.0.0.1      localhost.firebaseio.test`

Firebase likes DB URLs being in a specific format, so you can't just use local ip or local host as the `databaseURL`.

## Running

### Local Firebase server

From the project root, 

```bash
bin/start-doughflow-firebase
# or for verbose debug: 
DEBUG=* bin/start-doughflow-firebase
```

(Note, you need to have `DOUGH_FLOW` in your environment for this script to work.)

> (NB: you can add `$DOUGH_FLOW/bin` to your shell's path for convenience)

This will start a local Firebase-like server loaded with data from [`test/firebase.json`](test/firebase.json), available on `localhost.firebaseio.test` port `5555`. The Ember app is set up to use this hostname when `environment=development`.

### Web client

Start the local Firebase server (see above). Then, from `src/frontend`,

```bash
ember server
```

This will start a live-reloading web server listening on port 4200. Go to [http://localhost:4200](localhost:4200) to see the app.

### Cloud functions emulator

Not sure if we actually need this. We'll need cloud functions for delicate/sensitive server logic that clients shouldn't control. For now we don't have anything like that. But it was a pain to figure out. So here are some notes for posterity.

* Set up some functions in `src/firebase/functions`, use samples, like helloWorld, should be `src/firebase/functions/index.js`.

* Set up auth in `src/firebase/functions/config.json` file, for local you probably don't need actual credentials.

* Run the local function emulator:

From the `src/firebase/functions` directory:

```bash
export CLOUD_RUNTIME_CONFIG=`pwd`/config.json && firebase serve --only functions
```

## Deploying to production

TODO

