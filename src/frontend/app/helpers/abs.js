import Ember from 'ember';

export function abs(value/*, hash*/) {
  return Math.abs(value);
}

export default Ember.Helper.helper(abs);
