Ext.define('SauceApp.controller.Admin.RoleController', {
	extend : 'Ext.app.Controller',

	stores : ['Admin.PRoleStore'],
	models : ['Admin.RoleModel'],

	views : ['Admin.Privileges.RoleList', 'Admin.Privileges.RoleAdd', 'Admin.Privileges.RoleEdit'],
	init : function() {
		this.control({
			'RoleList' : {
				show : this.loadList
			},
			'RoleList' : {
				itemdblclick : this.editRole,
				selectionchange : this.selectRole
			},
			'RoleList button[action=addRole]' : {
				click : this.newRole
			},
			'RoleList button[action=editRole]' : {
				click : this.editRole
			},
			'RoleList button[action=delRole]' : {
				click : this.delRole
			},
			'RoleAdd button[action=save]' : {
				click : this.createRole
			},
			'RoleEdit button[action=save]' : {
				click : this.updateRole
			}
		});
	},

	// Reload the list every time it is shown
	loadList : function(list) {
		list.getStore().load();
	},

	editRole : function(grid, record) {
		var view = Ext.widget('RoleEdit');
		view.down('form').loadRecord(record);
	},

	newRole : function(button) {
		var view = Ext.widget('RoleAdd');
		view.down('form');
	},

	updateRole : function(button) {
		var win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues();
		var viewEF = form.getForm();
		if (viewEF.isValid()) {
			record.set(values);
			win.close();
			var store = Ext.getCmp('adminRoleList').getStore();
			//var store = Ext.data.StoreManager.lookup('RoleStore');
			store.sync();
		}
	},
	createRole : function(button) {
		var win = button.up('window');
		var form = win.down('form').getForm();
		;

		switch(button.action) {
			case 'save'		:
				var value = Ext.JSON.encode(form.getValues());
				Ext.Ajax.request({
					url : 'index.php/privileges/RoleCreate',
					method : 'post',
					params : {
						data : value
					},
					//表单提交成功
					success : function(response) {
						var result = Ext.JSON.decode(response.responseText);
						Ext.Msg.alert('添加角色', result.message);
						var grid = Ext.getCmp('adminRoleList').getStore().load();
						win.close();
					},
					//表单提交失败
					failure : function(response) {
						//var data = Ext.JSON.decode(form.responseText);
						//Ext.Msg.alert('添加角色',data.message);
						Ext.Msg.alert('操作', '服务器出现错误请稍后再试！');
					}
				});
				break;

			case 'cancel'	:
				form.reset();
				break;

			default:
				console.warn('An invalid button was pressed on the Customer Add form.')
		}
	},
	delRole : function(grid, record) {
		Ext.MessageBox.confirm('删除确认', '您是否要删除该角色?', function() {
			var grid = Ext.getCmp('adminRoleList')
			var selection = grid.getSelectionModel().getSelection()[0];
			console.log('selection', selection);
			console.log('record', record);
			grid.getStore().remove(selection);
			grid.getStore().sync();
			grid.getStore().load();
		});
	},
	selectRole : function() {
		Ext.getCmp('adminRoleDel').setDisabled(false);
	}
}); 