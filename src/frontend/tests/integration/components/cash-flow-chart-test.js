import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cash-flow-chart', 'Integration | Component | cash flow chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  //this.render(hbs`{{cash-flow-chart}}`);

  //assert.equal(this.$().text().trim(), '');
  
  this.render(hbs`hi`);
  assert.equal(this.$().text().trim(), 'hi');

  // Template block usage:
  /*
  this.render(hbs`
    {{#cash-flow-chart}}
      template block text
    {{/cash-flow-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
  */
});
