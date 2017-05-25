
import moment from 'moment';

export default function() {
  this.namespace = '/api';

  this.get('/cashflows', function() {
    return {
      data: [
      {
        type: 'cashflow',
        id: '1',
        attributes: {
          title: 'Paycheck',
          amount: 100,
          frequency: 'monthly',
          'frequency-offset': '15',
        }
      }, {
        type: 'cashflow',
        id: '2',
        attributes: {
          title: 'Paycheck',
          amount: 100,
          frequency: 'monthly',
          'frequency-offset': '-1',
        }
      }, {
        type: 'cashflow',
        id: '3',
        attributes: {
          title: 'Amex',
          amount: -120,
          frequency: 'monthly',
          'frequency-offset': '-3',
        }
      }, {
        type: 'cashflow',
        id: '4',
        attributes: {
          title: 'Property taxes',
          amount: -100,
          frequency: 'once',
          date: '2017-06-02',
        }
      }]
    };
  });

  this.get('/daily-balances', function() {
    var points = [];
    var startDate = new Date('2017-05-24');

    var seed = 1;
    var myRandom = function() {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    [...Array(90).keys()].map((offset) => {
      var date = new Date();
      date.setDate(startDate.getDate() + offset);
      date = moment(date);

      points.push({
        type: 'daily-balance',
        id: date.format('YYYYMMDD'),
        attributes: {
          date: date.format('YYYY-MM-DD'),
          balance: Math.floor(myRandom() * (500 + 500)) - 500,
        },
      });
    });

    return {
      data: points
    };
  });
}
