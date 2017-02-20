import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'trothinventory-front/tests/helpers/module-for-acceptance';
import { authenticateSession} from 'trothinventory-front/tests/helpers/ember-simple-auth';
import startApp from 'trothinventory-front/tests/helpers/start-app';

let application;

moduleForAcceptance('Acceptance | Create Product', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {

    Ember.run(application, 'destroy');
  }
});

test('visiting /login', function(assert) {
    authenticateSession(application);
    var timenow = Date.now();
  visit('/inventory/new');
  fillIn('input.itemcode', timenow);
  fillIn('input.productname', timenow + 'Item Test');
  fillIn('input.stocklevel', '100');
  fillIn('input.price', '10');
  click('div.submit');
  visit('/inventory');


  andThen(function() {
  assert.equal(find('table tr:first-child td:first-child').text(), timenow);
  });
});
