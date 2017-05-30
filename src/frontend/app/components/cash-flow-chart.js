import Ember from 'ember';
import moment from 'moment';
import {formatMoney} from 'dough-flow/helpers/format-money';
import BalancesUtil from '../utils/daily-balance';

const HIT_RADIUS = 15;
const DAYS_AXIS_STEP = 5;

export default Ember.Component.extend({

  balancesUtil: BalancesUtil.create(),

  init() {
    this._super(...arguments);

    this.startDate = moment();
    this.days = 150;
  },

  endDate: Ember.computed('startDate', 'days', function() { 
    return this.get('startDate').clone().add(this.get('days'), 'days'); 
  }), 
  
  cashPoints: Ember.computed('dailyBalances', 'startingBalance' , function() {
    var dailyBalances = this.get('balancesUtil')
                          .reifyCashFlow(this.get('cashFlows'),
                                         this.get('startDate'),
                                         this.get('endDate')
                                        );
    var startingBalance = this.get('startingBalance');

    var values = [];
    var labels = [];
    var events = [];

    // sum the daily balances with starting balance,
    // but skip entries that don't and won't change
    dailyBalances.forEach((b, index) => {
      var prev = dailyBalances[index-1];
      var next = dailyBalances[index+1];

      if (!prev || prev.balance != b.balance
          || !next || next.balance != b.balance) {
        values.push(b.balance + startingBalance);
        labels.push(b.date);
        events.push(b.events);
      }
    });

    // TODO: remove inner duplicates, don't show repeated points in the middle

    return {
      values: values,
      labels: labels,
      events: events,
    };
  }),

  /**
   * Translates our cash stream models into chartjs data points.
   */
  chartjsData: Ember.computed('cashPoints', function() {
    var cashPoints = this.get('cashPoints');

    return {
      datasets: [{
        label: 'Cash',
        data: cashPoints.values,
        borderWidth: 3,
        yAxisID: 'y-axis-0',
        lineTension: 0,
        //fill: false,
      }],
      labels: cashPoints.labels,
      yLabels: [],
    };
  }),

  computeFooters(cashPoints) {
    return cashPoints.events.map((dayEvents) => {
      if (dayEvents.length == 0) {
        return;
      }

      return 'Events: ' + dayEvents.map((e) => {
        return e.get('title')
            + ' ('
            + formatMoney(e.get('amount'),
                          {decimalPlaces:0})
            + ')';
      }).join(', ');
    });
  },

  /**
   * Translates our cash stream models into a chartjs options block.
   */
  chartjsOptions: Ember.computed('cashPoints', function() {
    var cashPoints = this.get('cashPoints');
    var minBalance = Math.min(...cashPoints.values, 0);

    var footers = this.computeFooters(cashPoints);

    // TODO: pad min & max balances

    return {
      elements: {
        point: {
          hitRadius: HIT_RADIUS,
        },
      },
      scales: {
        xAxes: [
          {
            display: true,

            // display the x axis as dates
            type: 'time',
            unit: 'day',
            unitStepSize: DAYS_AXIS_STEP,
            time: {
              displayFormats: {
                'day': 'YYYY-MM-DD',
              },
            },

            // add an overall axis label
            scaleLabel: {
              display: true,
              labelString: 'Date',
            },

            // rotate ticks for better fit
            ticks: {
              minRotation: 45,
              maxRotation: 45,
            },
          },
        ],
        yAxes: [
          {
            display: true,

            ticks: {
              min: minBalance,
              callback: function(value) {
                return formatMoney(value, {decimalPlaces: 0});
              },
            },
          }
        ],
      },
      tooltips: {
        callbacks: {
          label: function(item) {
            return formatMoney(item.yLabel, {decimalPlaces: 0});
          },
          footer: function(items) {
            var events = items.map((item) => footers[item.index]);
            //events = events.reduce((acc, p) => [...acc,...p], []);

            return events.join('');
          }
        },
      },
    };
  }),
});
