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

    switch(event.level) {
      case 'error':
        if (metadata.error) {
          flashMessages.danger(metadata.error.message, {
            sticky: true
          });
        }
        break;

      case 'warning':
        flashMessages.warning(event.title);
        break;

      case 'info':
        flashMessages.info(event.title);
        break;
    }
  }
});
