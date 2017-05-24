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
}
