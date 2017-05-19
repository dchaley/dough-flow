# dough-flow
Dough Flow - a cash flow web app

## Architecture

DF is a client/server web application, built on [EmberJS](https://emberjs.com/)/[AppEngne-Python](https://cloud.google.com/appengine/docs/standard/python/how-to) respectively.

The back-end is written in Python, handled by the WSGI framework, and uses the [GAE Datastore](https://cloud.google.com/appengine/docs/standard/python/datastore/) as a backing store.

## Infrastructure

Hosted on Google App Engine, using its [microservice](https://cloud.google.com/appengine/docs/standard/python/microservices-on-app-engine) framework:

* Front-end implemented as service: `default`

The EmberJS files are served as static files (html & assets).

* Back-end implemented as service: `backend`

The `backend` service receives traffic routed to `/api/*`.

# Development

## Requirements

* GAE project with GAE app (probably need billing set up)
* Google Cloud SDK
* EmberJS (I used node 7.10 with nvm)

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

`ember build` will run against mocked data for development convenience. To build a version that runs against the live development server, run:

```
ember build --environment=localgae
```

or, when deploying to actual AppEngine:

```
ember build --environment=production
```

## Building server (python)

TBD -- find clever way to package backend code into python egg for clean distribution into `gae` (*cf.* `frontend/dist`).

For now, from the `gae/` directory: 

```
ln -s ../src/backend/doughflow.py
```

Changes to the Python require restarting the GAE environment.

## Running

The GAE [local development server](https://cloud.google.com/appengine/docs/standard/python/tools/using-local-server) lets you run the full environment locally. After building the front- and back-end components, run them like so:

```
cd gae
dev_appserver.py dispatch.yaml frontend.yaml backend.yaml
```

and open a Chrome browser to the locally hosted GAE app (probably `http://localhost:8080`).

## Deploying to production

From `gae/`, after building,

```
gcloud app deploy dispatch.yaml frontend.yaml backend.yaml
```

