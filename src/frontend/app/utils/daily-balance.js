import Ember from 'ember';

export default Ember.Object.extend({

  /**
   * Generator for daily moments from start date up to and including end date
   * 
   * ```
   *  [...dateRange(moment('2017-01-01'), moment('2017-01-03'))]
   *     -> [moment('2017-01-01'),
   *         moment('2017-01-02'),
   *         moment('2017-01-03')]
   * ```
   */
  dateRange: function*(startDate, endDate) {
    if (startDate.isAfter(endDate)) {
      return;
    }

    for (var d = startDate.clone(); d.isSameOrBefore(endDate); d.add(1, 'days')) {
      yield d.clone();
    }
  },

  /**
   * Index a list of cash flows by schedule.
   *
   * Returns a map containing:
   * - 'monthly':
   *   - [month offset]:
   *     - list of cash flows for this offset
   * - 'once':
   *   - [date]:
   *     - list of cash flows for this date
   */
  indexCashFlows(cashFlows) {
    var index = {
      monthly: {},
      once: {},
    };

    cashFlows.forEach((flow) => {
      switch (flow.get('frequency')) {
        case 'monthly':
          var day = flow.get('frequencyOffset');
          index.monthly[day] = index.monthly[day] || [];
          index.monthly[day].push(flow);
          break;
        case 'once':
          var date = flow.get('date');
          index.once[date] = index.once[date] || [];
          index.once[date].push(flow);
          break;
      }
    });


    return index;
  },

  /**
   * Given a moment and indexed flows, return all flows that apply to that date.
   */
  findApplicable(flowIndex, day) {
    var applicable = [];

    var monthStart = day.clone().startOf('month');
    var monthEnd = day.clone().endOf('month');

    // 1-indexed offset (jan 1st is offset 1)
    var monthOffset = (day.date() + 1) - monthStart.date();
    // 1-indexed negative offset (jan 31st is offset -1)
    var monthReverseOffset = day.date() - (monthEnd.date() + 1);

    applicable = [...applicable,
                  ...(flowIndex.once[day.format('YYYY-MM-DD')] || []),
                  ...(flowIndex.monthly[monthOffset] || []),
                  ...(flowIndex.monthly[monthReverseOffset] || []),
                ];

    return applicable;
  },

  /**
   * Reify a series of cash flows into daily balances, between startDate and endDate.
   *
   * Returns a list of objects with fields:
   *  - date: date of this entry (type: moment)
   *  - balance: balance on this date
   *  - events: list of cash flows that triggered on this date
   */
  reifyCashFlow(cashFlows, startDate, endDate) {
    var dailyBalances = [];

    var dates = [...this.dateRange(startDate, endDate)];

    var indexedCashFlows = this.indexCashFlows(cashFlows);

    var balance = 0;

    dates.forEach((day) => {
      var flows = this.findApplicable(indexedCashFlows, day);

      dailyBalances.push({
        date: day,
        balance: balance += flows.reduce((acc,f) => acc + f.get('amount'), 0),
        events: flows,
      });
    });

    return dailyBalances;
  },
});
