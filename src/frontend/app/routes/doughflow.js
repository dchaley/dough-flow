import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      cashflows: this.get('store').findAll('cashflow'),
      dailyBalances: this.get('store').findAll('daily-balance'),
    });
  },

});

