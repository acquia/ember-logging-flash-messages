import { test, module } from 'qunit';
import registerFlashMessagesConsumer from 'ember-logging-flash-messages/instance-initializers/register-flash-messages-consumer';
import FlashMessagesLoggingConsumer from 'ember-logging-flash-messages/services/flash-messages-logging-consumer';
import Ember from 'ember';

const {
  isArray,
  Service
} = Ember;

module('Unit | Instance Initializers | register-flash-messages-consumer');

test('it configures the logging consumer', function(assert) {
  assert.expect(5);

  let environmentMock = {
    environment: 'unit-testing',
    'ember-logging-flash-messages': {
      enabled: true,
    }
  };
  let loggerMock = Service.create({
    registerConsumer(id, callback, levels, tags) {
      assert.equal(id, 'ember-logging-flash-messages', 'Consumer is given a unique ID.');
      assert.ok(isArray(callback), 'A callback array is provided.');
      assert.equal(levels, 'error', 'The default level is provided.');
      assert.deepEqual(tags, 'error', 'The default tags are provided.');
    },
    levels: {
      error: 'error'
    }
  });
  let consumer = FlashMessagesLoggingConsumer.create();
  let instanceMock = {
    lookup(factoryName) {
      if (factoryName === 'service:flashMessagesLoggingConsumer') {
        return consumer;
      }
      if (factoryName === 'service:logger') {
        return loggerMock;
      }
    }
  };

  registerFlashMessagesConsumer(instanceMock, environmentMock);
  assert.equal(consumer.get('currentEnvironment'), 'unit-testing', 'The current environment is stored on the consumer.');
});
