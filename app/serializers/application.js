import DS from 'ember-data';
export default DS.JSONAPISerializer.extend({
  serialize() {
    const result = this._super(...arguments),
    attr = result.data.attributes,
    rel = result.data.relationships;


    if(rel){
      return Object.keys(rel).reduce(function(acc, elem) {
        const data = rel[elem].data;
        if (data) {
          acc[elem + "_id"] = data.id;
        }
        if (data && data.type) {
          acc[elem + "_type"] = data.type[0].toUpperCase() + data.type.slice(1, -1);
        }

        return acc;
      }, attr);


    }
    else{
      
       return (rel,attr);
    }
  }



//   serialize() {
//
//    const result = this._super(...arguments),
//
//      attr = result.data.attributes || {},
//      rel = result.data.relationships || {};
//
//
//      console.log(attr);
//      console.log(rel);
//
//    return Object.keys(rel).reduce(function(acc, elem) {
//      const data = rel[elem].data;
//      if (data) {
//
//        console.log('data only');
//        acc[elem + "_id"] = data.id;
//      }
//      if (data && data.type) {
//        console.log('data and datatype');
//        acc[elem + "_type"] = data.type[0].toUpperCase() + data.type.slice(1, -1);
//      }
//      return acc;
//
//    }, attr);
// }

});
