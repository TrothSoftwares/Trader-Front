import Ember from 'ember';
import Table from 'ember-light-table';

const {
  isEmpty
} = Ember;

export default Ember.Controller.extend({
  currentProductType: 'all',
  allActiveClass :'active',

  isSearchByName :true,
  isSearchByCode :false,




  count: Ember.computed('mdata.meta.pagination.last.number', 'mdata.meta.pagination.self.number', function() {
    const total = this.get('mdata.meta.pagination.last.number') || this.get('mdata.meta.pagination.self.number');
    if (!total){
      return [];
    }
    return new Array(total+1).join('x').split('').map((e,i) => i+1);
  }),


  columns: [
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
      label: 'Price',
      valuePath:"retailprice",
    },
    {
      label: 'View',
      valuePath: 'id',
      width: '60px',
      sortable: false,
      cellComponent: 'inventory-view'
    },
  ],
  table: null,
  sort: null,
  page: 1,
  size: 8,
  direction: 'asc',
  isLoading: false,
  canLoadMore: true,
  // isLoading: Ember.computed.oneWay('fetchRecords.isRunning'),



  // init() {
  //   console.log("init");
  //   this._super(...arguments);
  //   this.set('table', new Table(this.get('columns')));
  // },





  init() {
     this._super(...arguments);

     let table = new Table(this.get('columns'));


     this.set('table', table);
   },

  fetchRecords() {
     this.set('isLoading', true);

    var searchArray;



    if(this.get('searchproduct') && this.get('producttype')){
      searchArray =['page','size','sort','direction', 'productname' , 'producttype'];
    }
    else if(this.get('searchproduct')){
      searchArray =['page','size','sort','direction', 'productname'];
    }
    else if(this.get('searchproductcode')){
      searchArray =['page','size','sort','direction', 'itemcode'];
    }

    else if(this.get('producttype') && this.get('producttype') !== 'active'){
      searchArray =['page','size','sort','direction', 'producttype'];
    }
    else{
      searchArray =['page','size','sort','direction'];
    }


    this.store.query('product', this.getProperties(searchArray)).then(records => {
      this.table.addRows(records);
      this.set('isLoading', false);
      this.set('canLoadMore', !isEmpty(records));
    });
  },

  actions: {


searchByName(){
  this.set('searchproduct','');
  this.set('searchproductcode','');
  this.toggleProperty('isSearchByCode');
  this.toggleProperty('isSearchByName');
},

searchByCode(){
  this.set('searchproduct','');
  this.set('searchproductcode','');
  this.toggleProperty('isSearchByCode');
  this.toggleProperty('isSearchByName');
},


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







    searchProductCode(searchproductcode){

      this.setProperties({
        itemcode: searchproductcode,
        sort: 'asc',
        page: 1
      });

      this.table.setRows([]);
      // redoing fetchRecords
      this.set('isLoading', true);
      this.fetchRecords();
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
      this.fetchRecords();


    },


    changeActiveClass: function(producttype){

      // var controller = this;

      this.set('allActiveClass','');
      this.producttypes.forEach(function(ptype){
        ptype.set('activeclass' , '');

      });
      if(producttype === 'active'){

        this.set('allActiveClass' , 'active');
        this.set('currentProductType' ,  'all');
        this.setProperties({
          producttype: '',
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
      this.fetchRecords();


    },


  }

});
