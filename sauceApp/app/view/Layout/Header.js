Ext.define('SauceApp.view.Layout.Header', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.layoutheader',
	id : 'app-header',
	//title : '酱油网络 -<span class="subtitle"></span>',
	title : '',
	split : true,
	minSize : 100,
	maxSize : 200,
	collapsible : true,
	margins : '5',
	region : 'north',
	layout : 'fit',
	border:0,
	items : [{
		tbar : [{
			xtype : 'splitbutton',
			scale : 'large',
			text : '<span class="subtitle">系统管理</span>',
			menu : [{
				text : '操作员管理',
				handler : function() {// adding a handler to "Add New X" menu item
					if(!win) {
						var win = Ext.create('widget.window', {
							title : '操作员管理',
							closable : true,
							closeAction : 'close',
							//animateTarget: this,
							width : 700,
							height : 400,
							layout : 'fit',
							bodyStyle : 'padding: 5px;',
							items : [{
								xtype: 'UserManagement'
							}]
						});
						Ext.getCmp('adminUserList').getStore().load();
					}
					win.show();
					
				}
			}, {
				text : '权限管理',
				handler : function() {// adding a handler to "Add New X" menu item
					if(!win) {
						var win = Ext.create('widget.window', {
							title : '权限管理',
							closable : true,
							closeAction : 'close',
							//animateTarget: this,
							width : 700,
							height : 400,
							layout : 'fit',
							bodyStyle : 'padding: 5px;',
							items : [{
								xtype: 'PrivilegesManagement'
							}]
						});
						Ext.getCmp('adminRoleList').getStore().load();
					}
					win.show();
				}
			}]
		}, {
			xtype : 'splitbutton',
			scale : 'large',
			text : '<span class="subtitle">日志管理</span>'
		},{
			xtype : 'splitbutton',
			scale : 'large',
			text : '<span class="subtitle">帮助</span>'
		},{
			xtype : 'tbfill'
		},{
			xtype : 'button',
			scale : 'large',
			action: 'logout',
			text : '<span class="subtitle">退出</span>'
		}]
	}],
	initComponent : function() {
		this.callParent(arguments);
	}

});
