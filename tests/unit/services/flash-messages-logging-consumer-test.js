import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { Service } = Ember;

moduleFor('service:flash-messages-logging-consumer', 'Unit | Service | flash messages logging consumer', {
  needs: ['service:flashMessages']
});

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
  let flashMessagesMock = Service.create({
    danger(message) {
      assert.equal(message, 'Danger, Will Robinson!', 'A flash messages error was generated');
    }
  });
  let service = this.subject({ flashMessages: flashMessagesMock });
  service.loggerCallback(event);
  service.loggerCallback(event2);
});

test('it generates a flash messages warning', function(assert) {
  assert.expect(3);

  let flashMessagesMock = Service.create({
    warning(message) {
      assert.equal(message, 'Warning, Will Robinson!', 'A flash messages warning was generated');
    }
  });
  let service = this.subject({ flashMessages: flashMessagesMock });

  let event1 = {
    level: 'warning',
    name: 'Warning, Will Robinson!',
    type: 'warning'
  };
  let event2 = {
    level: 'warning',
    name: 'Event name should not be shown when metadata is specified',
    metadata: 'Warning, Will Robinson!',
    type: 'warning'
  };
  let event3 = {
    level: 'warning',
    name: 'Event name should not be shown when metadata is specified',
    metadata: {
      message: 'Warning, Will Robinson!'
    },
    type: 'warning'
  };
  service.loggerCallback(event1);
  service.loggerCallback(event2);
  service.loggerCallback(event3);
});

test('it generates a flash messages info', function(assert) {
  assert.expect(3);

  let flashMessagesMock = Service.create({
    info(message) {
      assert.equal(message, 'Info, Will Robinson!', 'A flash messages info was generated');
    }
  });
  let service = this.subject({ flashMessages: flashMessagesMock });

  let event1 = {
    level: 'info',
    name: 'Info, Will Robinson!',
    type: 'info'
  };
  let event2 = {
    level: 'info',
    name: 'Event name should not be shown when metadata is specified',
    metadata: 'Info, Will Robinson!',
    type: 'info'
  };
  let event3 = {
    level: 'info',
    name: 'Event name should not be shown when metadata is specified',
    metadata: {
      message: 'Info, Will Robinson!'
    },
    type: 'info'
  };
  service.loggerCallback(event1);
  service.loggerCallback(event2);
  service.loggerCallback(event3);
});

test('it generates a flash messages success', function(assert) {
  assert.expect(3);

  let first = true;
  let flashMessagesMock = Service.create({
    success(message) {
      let expected = first ? 'Success' : 'Success, Will Robinson!';
      first = false;
      assert.equal(message, expected, 'A flash messages info was generated');
    }
  });
  let service = this.subject({ flashMessages: flashMessagesMock });

  let event1 = {
    level: 'info',
    name: 'Success',
    type: 'info'
  };
  let event2 = {
    level: 'info',
    name: 'Success',
    metadata: 'Success, Will Robinson!',
    type: 'info'
  };
  let event3 = {
    level: 'info',
    name: 'Success',
    metadata: {
      message: 'Success, Will Robinson!'
    },
    type: 'info'
  };
  service.loggerCallback(event1);
  service.loggerCallback(event2);
  service.loggerCallback(event3);
});
