Ext.define('SauceApp.controller.Viewport', {
	extend : 'Ext.app.Controller',
	views : [
		'Layout.Header', 
		'Layout.Footer', 
		'Layout.Left', 
		'Layout.Right', 
		'Layout.Middle', 
		'Layout.Appview', 
		'Home.Home'	,
		'Admin.User.UserManagement',
		'Admin.Privileges.PrivilegesManagement'
	],
	defaultItem : {
		id : 'viewport_default',
		region : 'center',
		layout : 'fit',
		border : 0,
		html : "<p align='center'>" + "    <img src='images/logo-sencha-sm.png' alt='Logo' />" + "</p>"
	},
	init : function() {
		this.control({
			'viewport' : {
				render : this.onViewportRendered
			},
			'ManagementArea'	: {
				tabchange: this.tabChanged
			},
			'PrivilegesManagement': {
				tabchange: this.tabChangedPrivileges,
				show: this.showPrivileges
			},
			'layoutheader button [action=logout]': {
				click: this.logout
			}
		});
	},
	index : function() {
		this.render('Home.Home');
	},
	onViewportRendered : function(p) {
		console.log("Viewport - onViewportRendered");
		p.add(this.defaultItem);
		this.index();
	},
	tabChangedPrivileges : function(tabPanel, tab) {
		tab.down('gridpanel').getStore().load();
	},
	showPrivileges : function(tabPanel, eOpts) {
		tab.down('gridpanel').getStore().load();
	},
	tabChanged	: function(tabPanel, tab) {
		tabXType = tab.getXType();

		var lists_container = Ext.ComponentQuery.query('layoutleft');

		// Alternate which list is visible in the lists container
		switch(tabXType)
		{
			case 'PartnerManagement':
				var Partner 	= Ext.ComponentQuery.query('PartnerManagement');
				var channel 	= Ext.ComponentQuery.query('SPManagement');
				
				var billing 	= Ext.ComponentQuery.query('BillingManagement');
				
				Partner[0].setVisible(true);
				channel[0].setVisible(false);
				billing[0].setVisible(false);
				lists_container[0].setTitle('会员统计信息');
				break;
			case 'SPManagement':
				var Partner 	= Ext.ComponentQuery.query('PartnerManagement');
				var channel 	= Ext.ComponentQuery.query('SPManagement');
				var billing 	= Ext.ComponentQuery.query('BillingManagement');
				
				Partner[0].setVisible(false);
				channel[0].setVisible(true);
				billing[0].setVisible(false);
				lists_container[0].setTitle('SP渠道统计信息');
				break;
			case 'BillingManagement':
				var Partner 	= Ext.ComponentQuery.query('PartnerManagement');
				var channel 	= Ext.ComponentQuery.query('SPManagement');
				var billing 	= Ext.ComponentQuery.query('BillingManagement');
				
				Partner[0].setVisible(false);
				channel[0].setVisible(false);
				billing[0].setVisible(true);
				lists_container[0].setTitle('计费统计信息');
				break;
			default:
				alert('An unknown tab was clicked.');
				break;
		}
		
	}

}); 