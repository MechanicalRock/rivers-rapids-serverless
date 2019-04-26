# rivers-rapids-serverless

## Security Notice

Please note, that this repository is for reference purposes only and is not under active development.
Therefore, project dependencies may include known security vulnerabilities.
Use at your own risk.

# Introduction

A sample implementation of the Rivers-Rapids pattern described by [Freg George](http://yowconference.com.au/slides/yow2014/George-ImplementingMicroserviceArchitectures.pdf) using SNS


A single SNS topic is used for the Rapids.
Rivers are implemented using SNS message filters for each microservice.

This implementation contains a number of services:
- *init*: This service publishes an _init_ event
- *publishEvents*: This service responds to an _init_ event and publishes _foo_ and _bar_ events
- *fooSubscriber*: This service listens for _foo_ events only, and emits _baz_
- *barSubscriber*: This service listens for _bar_ events only
- *eventLog*: This service listens for all events

# Setup

* An AWS Account, with API keys
* Docker installed, or npm

# Deployment

```
npm install
npm run deploy:test
```

# Running

`npm run execute:test`

To view the invocations, view the provided CloudWatch Dashboard: `rivers-rapids-serverless`
