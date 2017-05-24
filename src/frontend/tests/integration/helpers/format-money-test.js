
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-money', 'helper:format-money', {
  integration: true
});

// Replace this with your real tests.
test('it handles positive numbers', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{format-money inputValue}}`);

  assert.equal(this.$().text().trim(), '$1,234.00');
});

test('it handles negative numbers', function(assert) {
  this.set('inputValue', '-1234');

  this.render(hbs`{{format-money inputValue}}`);

  assert.equal(this.$().text().trim(), '-$1,234.00');
});

test('it handles zero', function(assert) {
  this.set('inputValue', '0');

  this.render(hbs`{{format-money inputValue}}`);

  assert.equal(this.$().text().trim(), '$0.00');
});

