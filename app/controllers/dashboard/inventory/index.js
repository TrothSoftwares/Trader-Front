import Ember from 'ember';
import Table from 'ember-light-table';

const {
  isEmpty
} = Ember;

export default Ember.Controller.extend({
  currentProductType: 'all',
  allActiveClass :'active',


  count: Ember.computed('mdata.meta.pagination.last.number', 'mdata.meta.pagination.self.number', function() {
   const total = this.get('mdata.meta.pagination.last.number') || this.get('mdata.meta.pagination.self.number');
   if (!total){
   return [];
 }
   return new Array(total+1).join('x').split('').map((e,i) => i+1);
 }),


  columns: [{
    label: 'Id',
    valuePath:"id",
  },
  {
    label: 'Item Code',
    valuePath:"itemcode",
  },
  {
    label: 'Product Name',
    valuePath:"productname",
  },
  {
    label: 'Initial Stock Level',
    valuePath:"initialstocklevel",
  },
  {
    label: 'Retail Price',
    valuePath:"retailprice",
  }
],
  table: null,
  sort: null,
  page: 1,
  size: 2,
  direction: 'asc',
  isLoading: false,
  canLoadMore: true,

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns')));
  },

  fetchRecords() {
    this.set('isLoading', true);
    this.store.query('product', this.getProperties(['page', 'size', 'sort', 'direction'])).then(records => {
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
          direction: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          page: 1
        });
        this.table.setRows([]);
        this.fetchRecords();
      }
    },

    onPaginationClick(number) {
      if (number) {
        this.setProperties({
          direction: 'asc',
          page: number
        });
        this.table.setRows([]);
        this.fetchRecords();

      }
    },



    searchProduct(searchproduct){

        this.setProperties({
          productname: searchproduct,
          sort: 'asc',
          page: 1
        });

        this.table.setRows([]);


// redoing fetchRecords
        this.set('isLoading', true);
        if (searchproduct) {
        this.store.query('product', this.getProperties(['page', 'size', 'sort', 'direction' , 'productname'])).then(records => {
          this.table.addRows(records);
          this.set('isLoading', false);
          this.set('canLoadMore', !isEmpty(records));
        });
      }
      else{
        this.store.query('product', this.getProperties(['page', 'size', 'sort', 'direction' ])).then(records => {
          this.table.addRows(records);
          this.set('isLoading', false);
          this.set('canLoadMore', !isEmpty(records));
        });
      }


    },


    changeActiveClass: function(producttype){

var controller = this;

  this.set('allActiveClass','');
  this.producttypes.forEach(function(ptype){
    ptype.set('activeclass' , '');

  });
  if(producttype === 'active'){

    this.set('allActiveClass' , 'active');
    this.set('currentProductType' ,  'all');
    this.setProperties({
      sort: 'asc',
      page: 1
    });
  }
  else{

  producttype.set('activeclass' , 'active');
  this.set('currentProductType' , producttype.get('typename'));
  this.setProperties({
    producttype: producttype.get('id'),
    sort: 'asc',
    page: 1
  });
}







this.table.setRows([]);


// redoing fetchRecords
this.set('isLoading', true);
if (producttype && producttype !=="active") {
this.store.query('product', this.getProperties(['page', 'size', 'sort', 'direction' , 'producttype'])).then(records => {
  this.table.addRows(records);
  controller.set('mdata',records);
  this.set('isLoading', false);
  this.set('canLoadMore', !isEmpty(records));
});
}
else{
this.store.query('product', this.getProperties(['page', 'size', 'sort', 'direction' ])).then(records => {
  this.table.addRows(records);
  controller.set('mdata',records);
  this.set('isLoading', false);
  this.set('canLoadMore', !isEmpty(records));
});
}


},


    }

});
