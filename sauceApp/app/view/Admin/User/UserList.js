Ext.define('SauceApp.view.Admin.User.UserList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.UserList',
	loadMask: true,
	id: 'adminUserList',
	store: 'Admin.UserStore',
	initComponent : function() {
		this.dockedItems = [{
			xtype : 'toolbar',
			//dock: 'bottom',
			items : [{
				iconCls: 'icon-user-add',
				text : '添加操作员',
				scope : this,
				action : 'addUser'
			}, {
				iconCls : 'icon-user-edit',
				text : '修改操作员',
				scope : this,
				action : 'editUser'
			},{
				iconCls: 'icon-user-delete',
				text : '删除操作员',
				id: 'adminUserDel',
				disabled : true,
				action : 'delUser',
				scope : this
			}]
		}];	
			
		this.columns = [{
			hidden: true,
			dataIndex : 'userID',
			flex : 1
		},{
			header : '用户名',
			dataIndex : 'userName',
			flex : 1
		}
		, {
			header : '邮箱',
			dataIndex : 'email',
			flex : 1
		}
		,{
			header : '创建时间',
			dataIndex : 'createTime',
			flex : 1
		}, {
			header : '最后第一次登陆时间',
			dataIndex : 'lastTime',
			flex : 1
		}
		];

		this.bbar = new Ext.PagingToolbar({
			store : this.store,
			displayInfo : true,
			pageSize : 10
		});
		this.callParent(arguments);
	}
}); 