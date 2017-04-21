import Ember from 'ember';

const {
  Service,
  inject,
  isEmpty,
  run,
  typeOf
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
      case 'error': {
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
      }

      case 'warning': {
        message = this._readMessageFromEvent(event);
        run.next(() => {
          flashMessages.warning(message);
        });
        break;
      }

      case 'info': {
        let method = 'info';
        if (event.name === 'Success') {
          method = 'success';
        }
        message = this._readMessageFromEvent(event);
        run.next(() => {
          flashMessages[method](message);
        });
        break;
      }
    }
  },

  /**
   * Reads the message value to display from a logging event.
   * @method _readMessageFromEvent
   * @private
   * @param  {Object} event The logging event
   * @return {String}       The message to display
   */
  _readMessageFromEvent(event) {
    if (!isEmpty(event.metadata)) {
      if (!isEmpty(event.metadata.message) && typeOf(event.metadata.message) === 'string') {
        return event.metadata.message;
      }
      if (typeOf(event.metadata) === 'string') {
        return event.metadata;
      }
    }
    return event.name;
  }
});
