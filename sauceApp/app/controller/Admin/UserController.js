Ext.define('SauceApp.controller.Admin.UserController', {
	extend : 'Ext.app.Controller',

	stores : ['Admin.UserStore'],
	models : ['Admin.UserModel'],

	views : ['Admin.User.UserList','Admin.User.UserAdd','Admin.User.UserEdit'],
	init : function() {
		this.control({
			'UserList' : {
				show : this.loadList
			},
			'UserList' : {
				itemdblclick : this.editUser,
				selectionchange : this.selectUser
			},

			'UserList button[action=addUser]' : {
				click : this.newUser
			},

			'UserList button[action=delete]' : {
				click : this.deleteUserClick
			},
			'UserList button[action=editUser]' : {
				click : this.editUser
			},
			'UserList button[action=delUser]' : {
				click : this.delUser
			},
			'UserAdd button' : {
				click : this.createUser
			},
			'UserEdit button[action=save]' : {
				click : this.updateUser
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

	editUser : function(grid, record) {
		var view = Ext.widget('UserEdit');
		view.down('form').loadRecord(record);	},

	newUser : function(button) {
		var view = Ext.widget('UserAdd');
		view.down('form');
	},

	updateUser : function(button) {
		var win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues();
		var viewEF = form.getForm();
		if(viewEF.isValid()) {
			record.set(values);
			win.close();
			var store = Ext.getCmp('adminUserList').getStore();
			//var store = Ext.data.StoreManager.lookup('UserStore');
			store.sync();
		}
	},
	createUser : function(button) {
		
		var win = button.up('window');
		var form = win.down('form').getForm();;
        var model = Ext.ModelMgr.getModel('SauceApp.model.Admin.UserModel');
    	switch(button.action) {
    		case 'save'		:
    			var user = Ext.create(model, form.getValues());
    			user.save( {
    				success: function(record) {
    					// Select the new customer in the list.
						var grid = Ext.getCmp('adminUserList').getStore().load();
    					win.close();    				},
					failure	: function(){
						console.log('Failed to save the customer record.');
		          	},
    			})
    			
    			break;

    		case 'cancel'	:
		        form.reset();
    			break;

			default:
				console.warn('An invalid button was pressed on the Customer Add form.')
    	}
	},
	delUser : function(grid, record) {
		 Ext.MessageBox.confirm('删除确认', '您是否要删除该用户?', function(){
		 	var grid = Ext.getCmp('adminUserList')
		 	var selection = grid.getSelectionModel().getSelection()[0];
		 	console.log('selection', selection);
	     	console.log('record', record);
	             grid.getStore().remove(selection);
	             grid.getStore().sync();
	             grid.getStore().load();
		 });
	},
	updateStore : function(storeId) {
		this.getPSLocationsStore().filter('user_id', storeId);
		// this.getPSLocationsStore().load(); // I can't remember if this step is needed.
	},
	selectUser : function(){
		Ext.getCmp('adminUserDel').setDisabled(false);
	}
});

