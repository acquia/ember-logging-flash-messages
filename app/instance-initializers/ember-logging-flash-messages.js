import ENV from '../config/environment';
import registerFlashMessagesConsumer from 'ember-logging-flash-messages/instance-initializers/register-flash-messages-consumer';

export function initialize(instance) {
  registerFlashMessagesConsumer(instance, ENV);
}

export default {
  name: 'ember-logging-flash-messages',
  after: 'ember-logging-service',
  initialize
};
