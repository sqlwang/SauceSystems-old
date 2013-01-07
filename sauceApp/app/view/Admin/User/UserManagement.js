Ext.define('SauceApp.view.Admin.User.UserManagement', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.UserManagement',
    autoScroll  : true,
    layout: 'fit',
	items : [{
		xtype : 'UserList'
	}],

    initComponent	: function() {
        this.callParent(arguments);
    }
});