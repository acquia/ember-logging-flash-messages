import Ember from 'ember';

export default Ember.Service.extend({

  flashMessages: Ember.inject.service(),

  /**
   * The current application environment
   * @property currentEnvironment
   * @type {String}
   * @public
   */
  currentEnvironment: null,

  /**
   * Bugsnag callback function for logger
   * @method  loggerCallback
   * @public
   * @param  {Object} event   logger event object
   */
  loggerCallback(event) {
    let metadata = event.metadata;
    let flashMessages = this.get('flashMessages');
    let errorMessage;

    switch(event.level) {
      case 'error':
        if (metadata && metadata.error && metadata.error.message) {
          errorMessage = metadata.error.message;
        } else {
          errorMessage = metadata.error || 'An unknown error occurred';
        }

        Ember.run.next(() => {
          flashMessages.danger(errorMessage, {
            sticky: true
          });
        });
        break;

      case 'warning':
        Ember.run.next(() => {
          flashMessages.warning(event.name);
        });
        break;

      case 'info':
        Ember.run.next(() => {
          flashMessages.info(event.name);
        });
        break;
    }
  }
});
