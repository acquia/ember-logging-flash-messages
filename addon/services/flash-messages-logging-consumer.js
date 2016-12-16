import Ember from 'ember';

const {
  Service,
  inject,
  run
} = Ember;

export default Service.extend({

  flashMessages: inject.service(),

  /**
   * The current application environment
   * @property currentEnvironment
   * @type {String}
   * @public
   */
  currentEnvironment: null,

  /**
   * Flash Messages callback function for logger
   * @method  loggerCallback
   * @public
   * @param  {Object} event   logger event object
   */
  loggerCallback(event) {
    let { metadata } = event;
    let flashMessages = this.get('flashMessages');
    let message;

    switch (event.level) {
      case 'error':
        if (metadata && metadata.error && metadata.error.message) {
          message = metadata.error.message;
        } else {
          message = metadata.error || 'An unknown error occurred';
        }

        run.next(() => {
          flashMessages.danger(message, {
            sticky: true
          });
        });
        break;

      case 'warning':
        message = event.name;
        if (!Ember.isEmpty(event.metadata)) {
          message = event.metadata.message || event.metadata;
        }
        run.next(() => {
          flashMessages.warning(message);
        });
        break;

      case 'info':
        message = event.name;
        if (!Ember.isEmpty(event.metadata)) {
          message = event.metadata.message || event.metadata;
        }
        run.next(() => {
          flashMessages.info(message);
        });
        break;
    }
  }
});
