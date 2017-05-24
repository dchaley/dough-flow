import Ember from 'ember';
import moment from 'moment';
import numeral from 'numeral';

export default Ember.Component.extend({

  /**
   * True if this cash flow is a withdrawal, i.e., less than zero.
   */
  isWithdrawal: Ember.computed.lt('cashFlow.amount', 0),

  /**
   * True if this cash flow is a deposit, i.e., zero or greater.
   */
  isDeposit: Ember.computed.gte('cashFlow.amount', 0),

  interval: Ember.computed('cashFlow.frequency', function() {
    var frequency = this.get('cashFlow.frequency');
    if (frequency == 'once') {
      return 'on ' + moment(this.get('cashFlow.date')).format('YYYY-MM-DD');
    } else if (frequency == 'monthly') {
      var offset = this.get('cashFlow.frequencyOffset');
      var whichDay;
      
      if (offset > 0) {
        whichDay = numeral(offset).format('Oo');
      } else {
        if (offset == -1) {
          whichDay = 'last';
        } else {
          whichDay = numeral(-offset).format('Oo') + ' to last';
        }
      }

      return 'on the ' + whichDay + ' day';
    }
    return this.get('cashFlow.frequencyOffset');
  }),
});
