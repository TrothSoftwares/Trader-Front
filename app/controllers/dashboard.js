import Ember from 'ember';
import Table from 'ember-light-table';

const {
  isEmpty
} = Ember;

export default Ember.Controller.extend({
  columns: [{
    label: 'Id',
    valuePath:"id",
  },

  {
    label: 'Product Name',
    valuePath:"productname",

  }],
  table: null,
  sort: null,
  page: 1,
  size: 2,
  dir: 'asc',
  isLoading: false,
  canLoadMore: true,

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns')));
  },

  fetchRecords() {
    this.set('isLoading', true);
    this.store.query('product', this.getProperties(['page', 'size', 'sort', 'dir'])).then(records => {
      this.table.addRows(records);
      this.set('isLoading', false);
      this.set('canLoadMore', !isEmpty(records));
    });
  },

  actions: {
    onScrolledToBottom() {
      if(this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.fetchRecords();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          page: 1
        });
        this.table.setRows([]);
        this.fetchRecords();
      }
    }
  }
});
