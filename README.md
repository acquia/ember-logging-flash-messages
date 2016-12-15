# ember-logging-flash-messages

This addon provides a logging consumer for the [ember-logging-service](https://github.com/acquia/ember-logging-service/) addon.
The consumer handles sending any error events to the [Flash messages](https://github.com/poteto/ember-cli-flash) service.

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
