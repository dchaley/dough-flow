import Ember from 'ember';
import numeral from 'numeral';

export function formatMoney(value, options={}) {
  var decPlaces = (options.decimalPlaces === undefined) ? 2 : options.decimalPlaces;

  var decStr = decPlaces > 0 ? '.' + '0'.repeat(decPlaces) : '';
  return numeral(Number(value)).format('$0,0' + decStr);
}

export default Ember.Helper.helper(formatMoney);
