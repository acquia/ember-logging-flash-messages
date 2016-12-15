export default function registerFlashMessagesConsumer(instance, config) {
  let loggingService, consumerService, levels, tags;
  let flashMessagesService = instance.lookup('service:flashMessages');
  let addonOptions = config['ember-logging-flash-messages'];
  // Must be enabled in configuration for the current environment.
  if (!addonOptions.enabled || !flashMessagesService) {
    return;
  }

  // Set up the consumer service.
  consumerService = instance.lookup('service:flashMessagesLoggingConsumer');
  consumerService.set('currentEnvironment', config.environment);

  // Register the consumer service with the logger.
  loggingService = instance.lookup('service:logger');
  levels = addonOptions.levels || loggingService.levels.error;
  tags = addonOptions.tags || 'error';
  loggingService.registerConsumer('ember-logging-flash-messages', [consumerService.get('loggerCallback'), consumerService], levels, tags);
}
