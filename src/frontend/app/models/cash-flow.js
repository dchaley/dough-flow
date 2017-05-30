import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  amount: DS.attr(),

  // once, weekly, monthly
  frequency: DS.attr(),
  // for repeated flows, numeric offset into interval (or offset from end)
  frequencyOffset: DS.attr(),
  // date on which one-time events occur
  date: DS.attr(),
});
