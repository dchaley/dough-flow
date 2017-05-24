
// add a component to render a line chart with
// different fill colors for positive & negative
//
// Source: https://stackoverflow.com/a/36941860/211771

export function initialize(/* application */) {
  var Chart = window.Chart;
  Chart.defaults.DualFillLine = Chart.helpers.clone(Chart.defaults.line);
  Chart.controllers.DualFillLine = Chart.controllers.line.extend({
      update: function () {
          // get the min and max values
          // if the min is non-zero, force a zero min
          var min = Math.min.apply(null, [...this.chart.data.datasets[0].data, 0]);
          var max = Math.max.apply(null, this.chart.data.datasets[0].data);
          var yScale = this.getScaleForId(this.getDataset().yAxisID);

          // figure out the pixels for these and the value 0
          var top = yScale.getPixelForValue(max);
          var zero = yScale.getPixelForValue(0);
          var bottom = yScale.getPixelForValue(min);

          // build a gradient that switches color at the 0 point
          var ctx = this.chart.chart.ctx;
          var gradient = ctx.createLinearGradient(0, top, 0, bottom);
          var ratio = Math.min((zero - top) / (bottom - top), 1);
          gradient.addColorStop(0, 'rgba(75,192,75,0.4)');
          gradient.addColorStop(ratio, 'rgba(75,192,75,0.4)');
          gradient.addColorStop(ratio, 'rgba(192,75,75,0.4)');
          gradient.addColorStop(1, 'rgba(192,75,75,0.4)');
          this.chart.data.datasets[0].backgroundColor = gradient;

          return Chart.controllers.line.prototype.update.apply(this, arguments);
      }
  });
  
}

export default {
  name: 'dual-fill-chart',
  initialize
};
