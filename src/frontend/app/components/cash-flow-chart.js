import Ember from 'ember';
import moment from 'moment';

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

  cashStream: Ember.computed('startDate', 'endDate', 'days', function() {
    var dates = [...this.dateRange(this.get('startDate'), this.get('endDate'))];

    // for now, use incrementing numbers as the dates' values 
    // TODO: get actual time series for these cash streams

    return {
      xValues: [...Array(dates.length).keys()].map((x) => this.get('startingBalance') + x),
      xLabels: dates,
    };
  }),

  /**
   * Translates our cash stream models into chartjs data points.
   */
  chartjsData: Ember.computed('cashStream', function() {
    var cashStream = this.get('cashStream');

    return {
      datasets: [{
        label: 'Cash',
        data: cashStream.xValues,
        borderWidth: 1,
        yAxisID: 'y-axis-0',
      }],
      labels: cashStream.xLabels,
      yLabels: [],
    };
  }),

  /**
   * Translates our cash stream models into a chartjs options block.
   */
  chartjsOptions: Ember.computed('cashStream', function() {
    // get the data from the stream rather than
    // ivars to make it easier to extract later
    var minDate = moment.min(this.get('cashStream').xLabels);
    var maxDate = moment.max(this.get('cashStream').xLabels).clone();

    // make the last date be a round axis_step multiple away from start
    var dayDiff = maxDate.diff(minDate, 'days');
    maxDate.add(dayDiff % DAYS_AXIS_STEP, 'd');

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
              max: maxDate,
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
              min: 0,
            },
          }
        ],
      }
    };
  }),
});
