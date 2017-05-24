import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cash-flow', 'Integration | Component | cash flow', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  //this.render(hbs`{{cash-flow}}`);

  //assert.equal(this.$().text().trim(), '');

  this.render(hbs`hi`);
  assert.equal(this.$().text().trim(), 'hi');

  // Template block usage:
  /*
  this.render(hbs`
    {{#cash-flow}}
      template block text
    {{/cash-flow}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
  */
});
