Ext.define('SauceApp.store.Admin.RoleAssignStore', {
    extend: 'Ext.data.Store',
	model: 'SauceApp.model.Admin.RoleAssignModel',
	alias: 'RoleAssignStore',
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