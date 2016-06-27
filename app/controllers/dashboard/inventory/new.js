import Ember from 'ember';

export default Ember.Controller.extend({

  // itemcodes :  Ember.computed.mapBy('products', 'itemcode'),
  validItemcodeMessage: '',
  validItemcodeError:'',

  chargecodes :  Ember.computed.mapBy('suppliers', 'chargecode'),
  validChargecodeMessage: '',
  validChargecodeError:'',

  companycodes :  Ember.computed.mapBy('suppliers', 'companycode'),
  validCompanycodeMessage: '',
  validCompanycodeError:'',


  producttypescomputed :  Ember.computed.mapBy('producttypes', 'typename'),
  validProductTypeMessage: '',
  validProductTypeError:'',

  // retailprice:'',

  isCreateProductButtonDisabled: Ember.computed('itemcode' , 'productname' , 'supplier' ,'typename', 'brandname' , 'initialstocklevel' ,'initialcostprice', 'buyprice'  ,  function() {
    if( Ember.isEmpty(this.get('itemcode')) ||
    Ember.isEmpty(this.get('productname')) ||
    Ember.isEmpty(this.get('supplier')) ||
    Ember.isEmpty(this.get('typename')) ||
    Ember.isEmpty(this.get('initialstocklevel')) ||
    Ember.isEmpty(this.get('initialcostprice')) ||
    Ember.isEmpty(this.get('buyprice'))

  ){return 'disabled';}
  else{return '';}
}),




retailprice: Ember.computed('initialcostprice', 'buyprice', function() {
  var initialcostprice = this.get('initialcostprice');
  var buyprice = this.get('buyprice');

  if(initialcostprice && buyprice){
    var retailprice = (parseFloat(initialcostprice) + parseFloat(buyprice)) / 2 ;
    return retailprice;
  }
  else{
    return '';
  }
}),


// retailprice: function() {
//
//   var initialcostprice = this.get('initialcostprice');
//   var buyprice = this.get('buyprice');
//
//   if(initialcostprice && buyprice){
//     var retailprice = (parseInt(initialcostprice) + parseInt(buyprice)) / 2 ;
//     return retailprice;
//   }
// }.property('initialcostprice','buyprice'),




isCreateSupplierButtonDisabled: Ember.computed('companyname' , 'companycode' , 'chargecode' , 'email' , 'phone'  ,  function() {
  if( Ember.isEmpty(this.get('companyname')) ||
  Ember.isEmpty(this.get('companycode')) ||
  Ember.isEmpty(this.get('chargecode')) ||
  Ember.isEmpty(this.get('email')) ||
  Ember.isEmpty(this.get('phone'))
){return 'disabled';}
else{return '';}
}),




actions:{



  // validItemcode: function(itemcode){
  //   var itemcodes = this.get('itemcodes');
  //   if(itemcodes.indexOf(itemcode)!== -1)
  //   {
  //     this.set('validItemcodeMessage' , 'Item Code Already Exists');
  //     this.set('validItemcodeError' , 'error');
  //   }
  //   else{
  //     this.set('validItemcodeMessage' , '');
  //     this.set('validItemcodeError' , '');
  //   }
  // },




  validItemcode: function(itemcode){
    var controller = this;

    controller.store.query('product',{page: 1, size: 8, itemcode:itemcode}).then(function(productswithitemcode) {
      productswithitemcode.forEach(function(pwicode) {



        if(pwicode.get('itemcode').toLowerCase() === itemcode.toLowerCase()){


          controller.set('validItemcodeMessage' , 'Item Code Already Exists');
          controller.set('validItemcodeError' , 'error');
        }
        else{

          controller.set('validItemcodeMessage' , '');
          controller.set('validItemcodeError' , '');
        }

      });


    });







  },

  validChargecode: function(chargecode){
    var chargecodes = this.get('chargecodes');
    if(chargecodes.indexOf(chargecode)!== -1)
    {
      this.set('validChargecodeMessage' , 'Charge Code Already Exists');
      this.set('validChargecodeError' , 'error');
    }
    else{
      this.set('validChargecodeMessage' , '');
      this.set('validChargecodeError' , '');
    }
  },
  validCompanycode: function(companycode){
    var companycodes = this.get('companycodes');
    if(companycodes.indexOf(companycode)!== -1)
    {
      this.set('validCompanycodeMessage' , 'Company Code Already Exists');
      this.set('validCompanycodeError' , 'error');
    }
    else{
      this.set('validCompanycodeMessage' , '');
      this.set('validCompanycodeError' , '');
    }
  },

  validProductType: function(typename){
    var producttypescomputed = this.get('producttypescomputed');
    if(producttypescomputed.indexOf(typename)!== -1)
    {
      this.set('validProductTypeMessage' , 'Product Type Already Exists');
      this.set('validProductTypeError' , 'error');
    }
    else{
      this.set('validProductTypeMessage' , '');
      this.set('validProductTypeError' , '');
    }
  },









  createProduct: function(){

    var controller = this;

    var product = this.store.createRecord('product', {
      itemcode :this.get('itemcode'),
      productname :this.get('productname'),
      initialstocklevel :this.get('initialstocklevel'),
      initialcostprice :this.get('initialcostprice'),
      retailprice :this.get('retailprice'),
      buyprice :this.get('buyprice'),
      supplier :this.get('supplier'),
      producttype : this.get('typename'),
      productbrand :this.get('brandname')
    });

    product.save().then(function(){
      controller.set('itemcode','');
      controller.set('productname','');
      controller.set('initialstocklevel','');
      controller.set('initialcostprice','');
      controller.set('buyprice','');
      controller.set('retailprice','');
      controller.set('supplier','');
      controller.set('typename','');
      controller.set('brandname','');

      window.location.reload();
      controller.transitionToRoute('dashboard.inventory.index');
    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });








  },

  closeSupplierModal: function(){
    Ember.$('.ui.newsupplier.modal')
    .modal('hide')
    ;
  },

  openSupplierModal: function(){
    Ember.$('.ui.newsupplier.modal')
    .modal('show')
    ;
  },

  createSupplier: function(){

    var controller = this;
    var newsupplier = this.store.createRecord('supplier', {
      companyname :this.get('companyname'),
      companycode :this.get('companycode'),
      chargecode :this.get('chargecode'),
      email :this.get('email'),
      address1 :this.get('address1'),
      address2 :this.get('address2'),
      suburb :this.get('suburb'),
      city :this.get('city'),
      state :this.get('state'),
      country : this.get('country'),
      zipcode :this.get('zipcode')
    });

    newsupplier.save().then(function(){
      controller.set('companyname','');
      controller.set('email','');
      controller.set('address1','');
      controller.set('address2','');
      controller.set('suburb','');
      controller.set('city','');
      controller.set('state','');
      controller.set('country','');
      controller.set('zipcode','');
      controller.set('phone','');

      controller.get('suppliers').pushObject(newsupplier._internalModel);
      controller.set('supplier',newsupplier);
      Ember.$('.ui.newsupplier.modal')
      .modal('hide')
      ;
    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });

  },

  openProductBrandModal:function(){

    Ember.$('.ui.newproductbrand.modal')
    .modal('show')
    ;
  },

  createProductBrand: function(){

    var controller = this;
    var newproductbrandsaved = this.store.createRecord('productbrand', {
      brandname :this.get('newproductbrand'),
    });

    newproductbrandsaved.save().then(function(){
      controller.set('newproductbrand','');

      controller.get('productbrands').pushObject(newproductbrandsaved._internalModel);
      controller.set('brandname',newproductbrandsaved);
      Ember.$('.ui.newproductbrand.modal')
      .modal('hide')
      ;
    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });



  },



  closeProductTypeModal:function(){

    Ember.$('.ui.newproducttype.modal')
    .modal('hide')
    ;
  },

  openProductTypeModal:function(){

    Ember.$('.ui.newproducttype.modal')
    .modal('show')
    ;
  },

  createProductType: function(){

    var controller = this;
    var newproducttypesaved = this.store.createRecord('producttype', {
      typename :this.get('newproducttype')
    });

    newproducttypesaved.save().then(function(){
      controller.set('newproducttype','');
      controller.get('producttypes').pushObject(newproducttypesaved._internalModel);
      controller.set('typename',newproducttypesaved);
      Ember.$('.ui.newproducttype.modal')
      .modal('hide')
      ;
    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });
  },

}
});
