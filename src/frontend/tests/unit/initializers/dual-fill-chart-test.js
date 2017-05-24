import Ember from 'ember';
import { initialize } from 'dough-flow/initializers/dual-fill-chart';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Initializer | dual fill chart', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.application.deferReadiness();
    });
  },
  afterEach() {
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.application);

  assert.ok(window.Chart.controllers.DualFillLine, "didn't load DualFillLine controller");
});
