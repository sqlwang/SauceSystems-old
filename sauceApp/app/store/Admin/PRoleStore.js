Ext.define('SauceApp.store.Admin.PRoleStore', {
    extend: 'Ext.data.Store',
	model: 'SauceApp.model.Admin.RoleModel',
	alias: 'PRoleStore',
	pageSize: 10,
	autoLoad: false,
	autoDestroy: true,
	remoteSort: true
  // listeners: {
    // update: function(store, record, operation){
      // if(record.dirty) {
        // record.commit();
      // }
      // if(record.phantom) {
       // record.phantom = false;
      // }
    // }
  // }
});