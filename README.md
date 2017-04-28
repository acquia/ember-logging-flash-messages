# ember-logging-flash-messages [![Build Status](https://travis-ci.com/acquia/ember-logging-flash-messages.svg?token=xpbhY9xz7Z9aqH5aUfgP&branch=master)](https://travis-ci.com/acquia/ember-logging-flash-messages)

This addon provides a logging consumer for the [ember-logging-service](https://github.com/acquia/ember-logging-service/) addon.
The consumer handles sending any configured events events to the [Flash messages](https://github.com/poteto/ember-cli-flash) service.

## Installation
As indicated, this addon requires the installation of ember-logging-service and ember-cli-flash.
```
ember install ember-cli-flash
ember install ember-logging-service
ember install ember-logging-flash-messages
```

## Sample usage
By default, this addon will listen for all error messages and display them with danger formatting.  The addon can be configured to listen for additional tags and severity levels.  When these are configured they check for the message string to be displayed by checking for the following properties in order:

* event.metadata.message
* event.metadata
* event.name

If the event.name is 'Success' and the severity level is `info` then the message will be displayed with the successful message formatting rather than the info formatting.

## Configuration

First you must install the [Flash messages](https://github.com/poteto/ember-cli-flash) and [ember-logging-service](https://github.com/acquia/ember-logging-service/) addon. Additionally, the ember-logging-service
addon must be configured with `enableErrors = true` if you want Error flash messages displayed.

You must set `enabled = true` for each environment you wish to monitor (both in the
ember-logging-service and in the ember-logging-flash-messages modules).

```
ENV['ember-logging-service'] = {
  enabled: true,
  errorsEnabled: true,
  .....
}

ENV['ember-logging-flash-messages'] = {
  enabled: true
}
```

# Developing for ember-logging-flash-messages

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone git@github.com:acquia/ember-logging-flash-messages.git` this repository
* `cd ember-logging-flash-messages`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
