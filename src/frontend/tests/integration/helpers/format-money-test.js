
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

test('it handles different decimal points', function(assert) {
  this.set('inputValue', '123.01');
  this.render(hbs`{{format-money inputValue}}`);
  assert.equal(this.$().text().trim(), '$123.01');
  
  this.set('inputValue', '123.06');
  this.render(hbs`{{format-money inputValue decimalPlaces=1}}`);
  assert.equal(this.$().text().trim(), '$123.1');
  
  this.set('inputValue', '123.01');
  this.render(hbs`{{format-money inputValue decimalPlaces=0}}`);
  assert.equal(this.$().text().trim(), '$123');
});


