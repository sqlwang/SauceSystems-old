Ext.define('SauceApp.controller.Admin.TaskController', {
	extend : 'Ext.app.Controller',

	stores : ['Admin.TaskStore'],
	models : ['Admin.TaskModel'],

	views : ['Admin.Privileges.TaskList', 'Admin.Privileges.TaskAdd', 'Admin.Privileges.TaskEdit'], 
	init : function() {
		this.control({
			'TaskList' : {
				show : this.loadList
			},
			'TaskList' : {
				itemdblclick : this.editTask,
				selectionchange : this.selectTask
			},

			'TaskList button[action=addTask]' : {
				click : this.newTask
			},

			'TaskList button[action=delete]' : {
				click : this.deleteTaskClick
			},
			'TaskList button[action=editTask]' : {
				click : this.editTask
			},
			'TaskList button[action=delTask]' : {
				click : this.delTask
			},
			'TaskAdd button' : {
				click : this.createTask
			},
			'TaskEdit button[action=save]' : {
				click : this.updateTask
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

	editTask : function(grid, record) {
		var view = Ext.widget('TaskEdit');
		view.down('form').loadRecord(record);
	},

	newTask : function(button) {
		var view = Ext.widget('TaskAdd');
		view.down('form');
	},

	updateTask : function(button) {
		var win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues();
		var viewEF = form.getForm();
		if(viewEF.isValid()) {
			record.set(values);
			win.close();
			var store = Ext.getCmp('adminTaskList').getStore();
			//var store = Ext.data.StoreManager.lookup('TaskStore');
			store.sync();
		}
	},
	createTask : function(button) {
		var win = button.up('window');
		var form = win.down('form').getForm();;
       
    	switch(button.action) {
    		case 'save'		:
    			var value  = Ext.JSON.encode(form.getValues());
    			Ext.Ajax.request({
                    url: 'index.php/privileges/TaskCreate',
                    method:'post',
                    params: {
				        data: value
				    },
					//表单提交成功
					success:function(response){
						var result = Ext.JSON.decode(response.responseText);
						Ext.Msg.alert('添加任务',result.message);
						var grid = Ext.getCmp('adminTaskList').getStore().load();
    					win.close();
					},
					//表单提交失败
					failure:function(response){
						//var data = Ext.JSON.decode(form.responseText);
						//Ext.Msg.alert('添加角色',data.message);
						Ext.Msg.alert('操作','服务器出现错误请稍后再试！');
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
	delTask : function(grid, record) {
		 Ext.MessageBox.confirm('删除确认', '您是否要删除任务?', function(){
		 	var grid = Ext.getCmp('adminTaskList');
		 	var selection = grid.getSelectionModel().getSelection()[0];
		 	console.log('selection', selection);
	     	console.log('record', record);
	             grid.getStore().remove(selection);
	             grid.getStore().sync();
	             grid.getStore().load();
		 });
	},
	updateStore : function(storeId) {
		this.getPSLocationsStore().filter('Task_id', storeId);
		// this.getPSLocationsStore().load(); // I can't remember if this step is needed.
	},
	selectTask : function(){
		Ext.getCmp('adminTaskDel').setDisabled(false);
	}
});