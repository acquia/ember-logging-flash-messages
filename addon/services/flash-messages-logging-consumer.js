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
    let errorMessage;

    switch (event.level) {
      case 'error':
        if (metadata && metadata.error && metadata.error.message) {
          errorMessage = metadata.error.message;
        } else {
          errorMessage = metadata.error || 'An unknown error occurred';
        }

        run.next(() => {
          flashMessages.danger(errorMessage, {
            sticky: true
          });
        });
        break;

      case 'warning':
        run.next(() => {
          flashMessages.warning(event.name);
        });
        break;

      case 'info':
        run.next(() => {
          flashMessages.info(event.name);
        });
        break;
    }
  }
});
