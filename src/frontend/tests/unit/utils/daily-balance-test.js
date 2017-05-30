import Ember from 'ember';
import dailyBalance from 'dough-flow/utils/daily-balance';
import { module, test } from 'qunit';
import moment from 'moment';

module('Unit | Utility | daily balance');

// Replace this with your real tests.
test('date range works', function(assert) {
  let db = dailyBalance.create();

  assert.deepEqual(['2017-03-31', '2017-04-01', '2017-04-02'],
                   [...db.dateRange(moment('2017-03-31'),
                                    moment('2017-04-02'))
                     ].map((x) => x.format('YYYY-MM-DD')));
  
  assert.deepEqual([],
                   [...db.dateRange(moment('2017-04-02'), moment('2017-02-30'))]);
});

// I don't like that test data is repeated here
var makeCashFlows = function() {
  return [
    Ember.Object.create({
      "title": "Paycheck",
      "amount": 300,
      "frequency": "monthly",
      "frequencyOffset": "15"
    }),
    Ember.Object.create({
      "title": "Paycheck",
      "amount": 300,
      "frequency": "monthly",
      "frequencyOffset": "-1"
    }),
    Ember.Object.create({
      "title": "Amex",
      "amount": -120,
      "frequency": "monthly",
      "frequencyOffset": "-3"
    }),
    Ember.Object.create({
      "title": "BofA",
      "amount": -50,
      "frequency": "monthly",
      "frequencyOffset": "-3"
    }),
    Ember.Object.create({
      "title": "Property taxes",
      "amount": -300,
      "frequency": "once",
      "date": "2017-06-02"
    }),
  ]
}

test('reifyEmber.object works', function(assert) {
  let db = dailyBalance.create();
  var cashFlows = makeCashFlows();

  var days = db.reifyCashFlow(cashFlows, moment('2017-06-01'), moment('2017-06-30'));

  assert.equal(days.length, 30);

  assert.equal(days[0].balance, 0);
  assert.equal(days[0].events.length, 0);

  assert.equal(days[1].balance, -300);
  assert.equal(days[1].events.length, 1);

  assert.equal(days[14].date.format('YYYY-MM-DD'), '2017-06-15');
  assert.equal(days[14].balance, 0);
  assert.equal(days[14].events.length, 1);

  assert.equal(days[27].balance, -170);
  assert.equal(days[27].events.length, 2);

  assert.equal(days[29].date.format('YYYY-MM-DD'), '2017-06-30');
  assert.equal(days[29].balance, 130);
  assert.equal(days[29].events.length, 1);
});


