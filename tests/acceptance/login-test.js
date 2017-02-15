import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'trothinventory-front/tests/helpers/module-for-acceptance';
import { authenticateSession} from 'trothinventory-front/tests/helpers/ember-simple-auth';
import startApp from 'trothinventory-front/tests/helpers/start-app';



let application;


moduleForAcceptance('Acceptance | login', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {


    Ember.run(application, 'destroy');
  }
});

test('visiting /login', function(assert) {
    authenticateSession(application);
  visit('/inventory');
  andThen(function() {
  assert.equal(find('.newh').text(), 'Inventory');
  });
});
