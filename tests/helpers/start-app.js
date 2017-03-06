import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP); // jscs:ignore
  attributes = Ember.merge(attributes, attrs); // jscs:ignore

  Ember.run(() => { // jscs:ignore
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
