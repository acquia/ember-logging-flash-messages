import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:flash-messages-logging-consumer', 'Unit | Service | flash messages logging consumer');

test('it has publicly accessible methods', function(assert) {
  let service = this.subject();
  assert.ok(service.loggerCallback, 'The logger callback is accessible.');
});

test('it generates a flash messages error', function(assert) {
  assert.expect(2);
  let event = {
    level: 'error',
    name: 'Event name error',
    type: 'error',
    metadata: {
      error: {
        name: 'Testing error',
        message: 'Danger, Will Robinson!',
        stack: 'Testing error stack'
      }
    }
  };
  let event2 = {
    level: 'error',
    name: 'Event name error',
    type: 'error',
    metadata: {
      error: 'Danger, Will Robinson!'
    }
  };
  let flashMessagesMock = Ember.Service.create({
    danger(message) {
      assert.equal(message, 'Danger, Will Robinson!', 'A flash messages error was generated');
    }
  });
  let service = this.subject({ flashMessages: flashMessagesMock });
  service.loggerCallback(event);
  service.loggerCallback(event2);
});

test('it generates a flash messages warning', function(assert) {
  assert.expect(1);
  let event = {
      level: 'warning',
      name: 'Warning, Will Robinson!',
      type: 'warning'
    };
  let flashMessagesMock = Ember.Service.create({
    warning(message) {
      assert.equal(message, 'Warning, Will Robinson!', 'A flash messages warning was generated');
    }
  });
  let service = this.subject({ flashMessages: flashMessagesMock });
  service.loggerCallback(event);
});

test('it generates a flash messages info', function(assert) {
  assert.expect(1);
  let event = {
      level: 'info',
      name: 'Info, Will Robinson!',
      type: 'info'
    };
  let flashMessagesMock = Ember.Service.create({
    info(message) {
      assert.equal(message, 'Info, Will Robinson!', 'A flash messages info was generated');
    }
  });
  let service = this.subject({ flashMessages: flashMessagesMock });
  service.loggerCallback(event);
});
