import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      cashFlows: this.get('store').findAll('cash-flow'),
    });
  },

});

