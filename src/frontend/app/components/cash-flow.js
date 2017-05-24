import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * True if this cash flow is a withdrawal, i.e., less than zero.
   */
  isWithdrawal: Ember.computed.lt('cashflow.amount', 0),

  /**
   * True if this cash flow is a deposit, i.e., zero or greater.
   */
  isDeposit: Ember.computed.gte('cashflow.amount', 0),
});
