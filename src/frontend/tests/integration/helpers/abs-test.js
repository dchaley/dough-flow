
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('abs', 'helper:abs', {
  integration: true
});

test('it handles positive numbers', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{abs inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

test('it handles negative numbers', function(assert) {
  this.set('inputValue', '-1234');

  this.render(hbs`{{abs inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

test('it handles zero', function(assert) {
  this.set('inputValue', '0');
  this.render(hbs`{{abs inputValue}}`);
  assert.equal(this.$().text().trim(), '0');

  this.set('inputValue', '-0');
  this.render(hbs`{{abs inputValue}}`);
  assert.equal(this.$().text().trim(), '0');
});

