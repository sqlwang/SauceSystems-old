Ext.define('SauceApp.controller.Admin.AssignController', {
	extend : 'Ext.app.Controller',

	stores : ['Admin.RoleAssignStore', 'Admin.TaskAssignStore'],
	models : ['Admin.RoleAssignModel', 'Admin.TaskAssignModel'],

	views : ['Admin.Privileges.RoleAssignList', 'Admin.Privileges.RoleAddAssign', 'Admin.Privileges.TaskAssignList', 'Admin.Privileges.TaskAssignAdd'],
	init : function() {
		this.control({
			'RoleAssignList' : {
				show : this.loadList,
				selectionchange : this.selectRoleAssignDel
			},
			'RoleAssignList button[action=adminRoleAddAssign]' : {
				click : this.newRoleAssign
			},
			'RoleAssignList button[action=RoleAssignDel]' : {
				click : this.delAssignRole
			},
			'RoleAddAssign button[action=save]' : {
				click : this.createRoleAssign
			},
			'storeselector' : {
				storeselected : this.updateStore
			},
			'TaskAssignList' : {
				show : this.loadList
			},
			'TaskAssignList button[action=TaskAssignAdd]' : {
				click : this.newTaskAssign
			},
			'TaskAssignAdd button[action=save]' : {
				click : this.createTaskAssign
			}
		});
	},

	// Reload the list every time it is shown
	loadList : function(list) {
		list.getStore().load();
	},
	getTaskCheckBox : function() {
		var store = Ext.data.StoreManager.lookup('Admin.TaskStore');
		store.load({
			params : {
				group : 3,
				type : 'user'
			},
			callback : function(records, operation, success) {
				// do something after the load finishes
				var data = Ext.JSON.decode(operation.response.responseText);
				var items = data.data;

				var checkboxitems = "";
				for (var i = 0; i < items.length; i++) {
					if (checkboxitems != "")
						checkboxitems += ",";
					else
						checkboxitems += "[";
					var groupid = items[i].groupid;
					var checkboxSingleItem = "{boxLabel:'" + items[i].taskDescription + "',name:'task',id:'" + items[i].taskName + "',inputValue:'" + items[i].taskName + "'";

					// var usergroup=obj.usergroups;
					// for(var j=0;j<usergroup.length;j++){
					// //        				alert();
					// if(usergroup[j].groupid == groupid){
					// checkboxSingleItem += ",checked:'true'";
					// }
					// }

					checkboxSingleItem += "}";
					checkboxitems += checkboxSingleItem;
				}
				checkboxitems += "]";
				var itemsTaskGroup = new Ext.form.CheckboxGroup({
					cls : 'x-check-group-alt',
					// Distribute controls across 3 even columns, filling each row
					// from left to right before starting the next row
					columns : 5,
					items : eval(checkboxitems)
				});

				Ext.getCmp('assignTaskFieldset').add(itemsTaskGroup);
			},
			scope : this
		});
	},
	getOperationCheckBox : function() {
		var store = Ext.data.StoreManager.lookup('Admin.OperationStore');
		store.load({
			params : {
				group : 3,
				type : 'user'
			},
			callback : function(records, operation, success) {
				// do something after the load finishes
				var data = Ext.JSON.decode(operation.response.responseText);
				var items = data.data;

				var checkboxitems = "";
				for (var i = 0; i < items.length; i++) {
					if (checkboxitems != "")
						checkboxitems += ",";
					else
						checkboxitems += "[";
					var groupid = items[i].groupid;
					var checkboxSingleItem = "{boxLabel:'" + items[i].operationDescription + "',name:'operation',id:'" + items[i].operationName + "',inputValue:'" + items[i].operationName + "'";

					// var usergroup=obj.usergroups;
					// for(var j=0;j<usergroup.length;j++){
					// //        				alert();
					// if(usergroup[j].groupid == groupid){
					// checkboxSingleItem += ",checked:'true'";
					// }
					// }

					checkboxSingleItem += "}";
					checkboxitems += checkboxSingleItem;
				}
				checkboxitems += "]";
				var itemsGroup = new Ext.form.CheckboxGroup({
					cls : 'x-check-group-alt',
					// Distribute controls across 3 even columns, filling each row
					// from left to right before starting the next row
					columns : 5,
					items : eval(checkboxitems)
				});

				Ext.getCmp('assignOperationFieldset').add(itemsGroup);
			},
			scope : this
		});
	},
	newRoleAssign : function(button) {
		var view = Ext.widget('RoleAddAssign');
		this.getTaskCheckBox();
		this.getOperationCheckBox();
	},
	newTaskAssign : function(button) {
		var view = Ext.widget('TaskAssignAdd');
		this.getOperationCheckBox();
	},
	createRoleAssign : function(button) {
		var win = button.up('window');
		var form = win.down('form').getForm();
		;
		var assignTaskFieldset = Ext.getCmp('assignTaskFieldset');

		var ids = [];
		var cbitems = assignTaskFieldset.down('checkboxgroup').getChecked();
		for (var i = 0; i < cbitems.length; i++) {
			ids.push(cbitems[i].inputValue);
		}
		form.submit({
			url : 'index.php/privileges/AssignRoleCreate',
			waitMsg : 'Creating...',
			params : {
				tasks : ids.toString()
			},
			success : function(form, action) {
				Ext.Msg.alert('分配角色权限', action.result.data.message);
			},
			failure : function(form, action) {
				if (action.failureType === Ext.form.action.Action.CLIENT_INVALID) {
					Ext.Msg.alert('CLIENT_INVALID', 'Something  has been missed. Please check and try again.');
				}
				if (action.failureType === Ext.form.action.Action.CONNECT_FAILURE) {
					Ext.Msg.alert('CONNECT_FAILURE', 'Status: ' + action.response.status + ': ' + action.response.statusText);
				}
				if (action.failureType == 'server') {
					Ext.Msg.alert('SERVER_INVALID', action.result.message);
				}			}
		});	},
	selectRoleAssignDel : function() {
		Ext.getCmp('adminRoleAssignDel').setDisabled(false);
	},
	delAssignRole : function(grid, record) {
		Ext.MessageBox.confirm('删除确认', '您是否要删除该角色的权限?', function() {
			var grid = Ext.getCmp('adminRoleAssignList');
			console.log('grid', grid);
			
			var selection = grid.getSelectionModel().getSelection()[0];
			
			grid.getStore().remove(selection);
			grid.getStore().sync();
			grid.getStore().load();
		});
	},
	createTaskAssign : function(button) {
		var win = button.up('window');
		var form = win.down('form').getForm();
		var assignOperationFieldset = Ext.getCmp('assignOperationFieldset');

		var ids = [];
		var cbitems = assignOperationFieldset.down('checkboxgroup').getChecked();
		for (var i = 0; i < cbitems.length; i++) {
			ids.push(cbitems[i].inputValue);
		}
		form.submit({
			url : 'index.php/privileges/AssignTaskCreate',
			waitMsg : 'Creating...',
			params : {
				operations : ids.toString()
			},
			success : function(form, action) {
				Ext.Msg.alert('分配任务权限', action.result.data.message);
			},
			failure : function(form, action) {
				if (action.failureType === Ext.form.action.Action.CLIENT_INVALID) {
					Ext.Msg.alert('CLIENT_INVALID', 'Something  has been missed. Please check and try again.');
				}
				if (action.failureType === Ext.form.action.Action.CONNECT_FAILURE) {
					Ext.Msg.alert('CONNECT_FAILURE', 'Status: ' + action.response.status + ': ' + action.response.statusText);
				}
				if (action.failureType == 'server') {
					Ext.Msg.alert('SERVER_INVALID', action.result.message);
				}
			}
		});
	},
	updateStore : function(storeId) {
		this.getPSLocationsStore().filter('Assign_id', storeId);
		// this.getPSLocationsStore().load(); // I can't remember if this step is needed.
	}
});

