import QUnit from 'qunit';
import Ember from 'ember';
import FlashMessagesLoggingConsumer from 'ember-logging-flash-messages/services/flash-messages-logging-consumer';

const {
  Object: emberObject
} = Ember;

QUnit.module('Unit | Service | flash messages logging consumer', {
  needs: 'service:flashMessages'
});

QUnit.test('it has publicly accessible methods', function(assert) {
  assert.expect(1);

  let service = FlashMessagesLoggingConsumer.create();
  assert.ok(service.loggerCallback, 'The logger callback is accessible.');
});

QUnit.test('it generates a flash messages error with a full event object', function(assert) {
  assert.expect(1);
  let done = assert.async();
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
  let flashMessagesMock = emberObject.create({
    danger(message) {
      assert.equal(message, 'Danger, Will Robinson!', 'A flash messages error was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({
    flashMessages: flashMessagesMock
  });
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages error with a partial event object', function(assert) {
  assert.expect(1);
  let done = assert.async();
  let event = {
    level: 'error',
    name: 'Event name error',
    type: 'error',
    metadata: {
      error: 'Danger, Will Robinson!'
    }
  };
  let flashMessagesMock = emberObject.create({
    danger(message) {
      assert.equal(message, 'Danger, Will Robinson!', 'A flash messages error was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({
    flashMessages: flashMessagesMock
  });
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages warning for a full event object', function(assert) {
  assert.expect(1);
  let done = assert.async();
  let flashMessagesMock = emberObject.create({
    warning(message) {
      assert.equal(message, 'Warning, Will Robinson!', 'A flash messages warning was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });

  let event = {
    level: 'warning',
    name: 'Event name should not be shown when metadata is specified',
    metadata: {
      message: 'Warning, Will Robinson!'
    },
    type: 'warning'
  };
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages warning for a partial event object', function(assert) {
  assert.expect(1);
  let done = assert.async();
  let flashMessagesMock = emberObject.create({
    warning(message) {
      assert.equal(message, 'Warning, Will Robinson!', 'A flash messages warning was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });

  let event = {
    level: 'warning',
    name: 'Event name should not be shown when metadata is specified',
    metadata: 'Warning, Will Robinson!',
    type: 'warning'
  };
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages warning for a minimal event object', function(assert) {
  assert.expect(1);
  let done = assert.async();
  let flashMessagesMock = emberObject.create({
    warning(message) {
      assert.equal(message, 'Warning, Will Robinson!', 'A flash messages warning was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });

  let event = {
    level: 'warning',
    name: 'Warning, Will Robinson!',
    type: 'warning'
  };
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages info with a full event object', function(assert) {
  assert.expect(1);
  let done = assert.async();
  let flashMessagesMock = emberObject.create({
    info(message) {
      assert.equal(message, 'Info, Will Robinson!', 'A flash messages info was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });
  let event = {
    level: 'info',
    name: 'Event name should not be shown when metadata is specified',
    metadata: {
      message: 'Info, Will Robinson!'
    },
    type: 'info'
  };
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages info with a partial event object', function(assert) {
  assert.expect(1);
  let done = assert.async();
  let flashMessagesMock = emberObject.create({
    info(message) {
      assert.equal(message, 'Info, Will Robinson!', 'A flash messages info was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });
  let event = {
    level: 'info',
    name: 'Event name should not be shown when metadata is specified',
    metadata: 'Info, Will Robinson!',
    type: 'info'
  };
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages info with a minimal event object', function(assert) {
  assert.expect(1);
  let done = assert.async();
  let flashMessagesMock = emberObject.create({
    info(message) {
      assert.equal(message, 'Info, Will Robinson!', 'A flash messages info was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });

  let event = {
    level: 'info',
    name: 'Info, Will Robinson!',
    type: 'info'
  };
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages success with a full event object', function(assert) {
  assert.expect(1);
  let done = assert.async();

  let flashMessagesMock = emberObject.create({
    success(message) {
      assert.equal(message, 'Success, Will Robinson!', 'A flash messages info was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });
  let event = {
    level: 'info',
    name: 'Success',
    metadata: {
      message: 'Success, Will Robinson!'
    },
    type: 'info'
  };
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages success with a partial event object', function(assert) {
  assert.expect(1);
  let done = assert.async();

  let flashMessagesMock = emberObject.create({
    success(message) {
      assert.equal(message, 'Success, Will Robinson!', 'A flash messages info was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });
  let event = {
    level: 'info',
    name: 'Success',
    metadata: 'Success, Will Robinson!',
    type: 'info'
  };
  service.loggerCallback(event);
});

QUnit.test('it generates a flash messages success with a minimal event object', function(assert) {
  assert.expect(1);
  let done = assert.async();

  let flashMessagesMock = emberObject.create({
    success(message) {
      assert.equal(message, 'Success', 'A flash messages info was generated');
      done();
    }
  });
  let service = FlashMessagesLoggingConsumer.create({ flashMessages: flashMessagesMock });

  let event = {
    level: 'info',
    name: 'Success',
    type: 'info'
  };
  service.loggerCallback(event);
});
