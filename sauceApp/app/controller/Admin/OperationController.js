Ext.define('SauceApp.controller.Admin.OperationController', {
	extend : 'Ext.app.Controller',

	stores : ['Admin.OperationStore'],
	models : ['Admin.OperationModel'],

	views : ['Admin.Privileges.OperationList', 'Admin.Privileges.OperationAdd', 'Admin.Privileges.OperationEdit'],
	init : function() {
		this.control({
			'OperationList' : {
				show : this.loadList
			},
			'OperationList' : {
				itemdblclick : this.editOperation,
				selectionchange : this.selectOperation
			},

			'OperationList button[action=addOperation]' : {
				click : this.newOperation
			},
			'OperationList button[action=editOperation]' : {
				click : this.editOperation
			},
			'OperationList button[action=delOperation]' : {
				click : this.delOperation
			},
			'OperationAdd button' : {
				click : this.createOperation
			},
			'OperationEdit button[action=save]' : {
				click : this.updateOperation
			},
			'storeselector' : {
				storeselected : this.updateStore
			}

		});
	},

	// Reload the list every time it is shown
	loadList : function(list) {
		list.getStore().load();
	},

	editOperation : function(grid, record) {
		var view = Ext.widget('OperationEdit');
		view.down('form').loadRecord(record);
	},

	newOperation : function(button) {
		var view = Ext.widget('OperationAdd');
		view.down('form');
	},

	updateOperation : function(button) {
		var win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues();
		var viewEF = form.getForm();
		if (viewEF.isValid()) {
			record.set(values);
			win.close();
			var store = Ext.getCmp('adminOperationList').getStore();
			//var store = Ext.data.StoreManager.lookup('OperationStore');
			store.sync();
		}
	},
	createOperation : function(button) {

		var win = button.up('window');
		var form = win.down('form').getForm();
		;
		var model = Ext.ModelMgr.getModel('SauceApp.model.Admin.OperationModel');
		switch(button.action) {
			case 'save'		:
				var value = Ext.JSON.encode(form.getValues());
				Ext.Ajax.request({
					url : 'index.php/privileges/OperationCreate',
					method : 'post',
					params : {
						data : value
					},
					//表单提交成功
					success : function(response) {
						var result = Ext.JSON.decode(response.responseText);
						Ext.Msg.alert('添加操作', result.message);
						var grid = Ext.getCmp('adminOperationList').getStore().load();
						win.close();
					},
					//表单提交失败
					failure : function(response) {
						//var data = Ext.JSON.decode(form.responseText);
						//Ext.Msg.alert('添加操作',data.message);
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
	delOperation : function(grid, record) {
		Ext.MessageBox.confirm('删除确认', '您是否要删除该操作?', function() {
			var grid = Ext.getCmp('adminOperationList');
			var selection = grid.getSelectionModel().getSelection()[0];
			grid.getStore().remove(selection);
			grid.getStore().sync();
			grid.getStore().load();
		});
	},
	updateStore : function(storeId) {
		this.getPSLocationsStore().filter('Operation_id', storeId);
		// this.getPSLocationsStore().load(); // I can't remember if this step is needed.
	},
	selectOperation : function() {
		Ext.getCmp('adminOperationDel').setDisabled(false);
	}
}); 