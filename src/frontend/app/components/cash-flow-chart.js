import Ember from 'ember';
import moment from 'moment';
import {formatMoney} from 'dough-flow/helpers/format-money';

const HIT_RADIUS = 15;
const DAYS_AXIS_STEP = 5;

export default Ember.Component.extend({

  init() {
    this._super(...arguments);

    this.startDate = moment();
    this.days = 21;
  },
  
  endDate: Ember.computed('startDate', 'days', function() {
    return this.get('startDate').clone().add(this.get('days'), 'days');
  }),

  dateRange: function*(startDate, endDate) {
    for (var d = startDate.clone(); d.isSameOrBefore(endDate); d.add(1, 'days')) {
      yield d.clone();
    }
  },

  cashPoints: Ember.computed('dailyBalances', 'startingBalance' , function() {
    var dailyBalances = this.get('dailyBalances').toArray();
    var startingBalance = this.get('startingBalance');

    var values = [];
    var labels = [];

    dailyBalances.forEach((b) => {
      values.push(b.get('balance') + startingBalance);
      labels.push(b.get('date'));
    });

    return {
      values: values,
      labels: labels,
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
        borderWidth: 1,
        yAxisID: 'y-axis-0',
      }],
      labels: cashPoints.labels,
      yLabels: [],
    };
  }),

  /**
   * Translates our cash stream models into a chartjs options block.
   */
  chartjsOptions: Ember.computed('cashPoints', function() {
    var minBalance = Math.min(...this.get('cashPoints').values, 0);

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
        },
      },
    };
  }),
});
