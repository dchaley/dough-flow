import Ember from 'ember';
import numeral from 'numeral';

export function formatMoney(value) {
  return numeral(Number(value)).format('$0,0.00');
}

export default Ember.Helper.helper(formatMoney);
