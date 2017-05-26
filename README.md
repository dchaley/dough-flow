>![Baguette](img/bread-icon-64.png)
>
> ***DoughFlow***, n
>
> 1. the state of flow while baking;
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

## Requirements

* GAE project with GAE app (probably need billing set up)
* Google Cloud SDK
* NodeJS (I used 7.10 with nvm)
* EmberJS (I used most recent as of 2017-05-26)
* Firebase project associated with your Google Cloud project
* `npm install -g firebase-server`

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

## Running

### Local Firebase server

From the project root, 

```
./start-local-firebase.sh
```

This will start a local Firebase-like server loaded with data from [`test/firebase.json`](test/firebase.json).

### Web client

Start the local Firebase server (see above). Then, from `src/frontend`,

```
ember server
```

This will start a live-reloading web server listening on port 4200. Go to [http://localhost:4200](localhost:4200) to see the app.

### Cloud functions

TODO: figure out how to run cloud functions locally, or do we need to deploy them ???

## Deploying to production

TODO

