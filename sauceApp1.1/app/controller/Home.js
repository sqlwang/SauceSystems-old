Ext.define('SauceApp.controller.Home', {
	extend : 'Ext.app.Controller',
	views : ['Home.Home'],
	init : function() {
		console.log('controller.Home.init()');
		this.control({
			'layoutheader button[action=logout]' : {
				click : this.logout
			}
		});
	},
	index : function() {
		console.log('controller.Home.index()');
		this.render('Home.Home');
	},
	logout : function() {
		Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn, text) {
			Ext.Ajax.request({
				url : 'index.php/site/logout',
				success : function(response) {
					var text = response.responseText;
					// process server response here
					Ext.ux.Router.redirect('login');
				}
			});
		});
	}
});

