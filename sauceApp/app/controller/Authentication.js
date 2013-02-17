Ext.define('SauceApp.controller.Authentication', {
	extend : 'Ext.app.Controller',
	views : ['Authentication.Login', 'Authentication.CapsWarningTooltip'],
	init : function() {
		console.log('Authentication.init()');
		this.control({
			'authenticationlogin button[action=trylogin]' : {
				click : this.tryLogin
			},
			'authenticationlogin #l' : {
				keypress : this.verifyCapsLock,
				keyup : this.verifyEnter
			},
			'authenticationlogin #s' : {
				keypress : this.verifyCapsLock,
				keyup : this.verifyEnter
			}
		});
	},
	index : function() {
		var middle = Ext.getCmp('viewport_default');
		if (middle) {
			middle.removeAll();
		}
		var login  = Ext.getCmp('authentication-login');
		if (login) {
			login.removeAll();
		}
		
		Ext.widget('authenticationlogin');
	},
	tryLogin : function(button) {
		var loginWin = button.up('window');
		var loginForm = loginWin.down('form');
		if (loginForm.getForm().isValid()) {
			var values = loginForm.getValues();
			var ok;
			loginForm.submit({
				url : 'index.php/Site/Login'//Simula OK
				,
				method : 'POST',
				scope : this,
				success : function(form, action) {
					loginWin.close();
					
					var retorno = Ext.decode(action.response.responseText);
					SaucePrivileges = retorno.privileges;
					Ext.ux.Router.redirect('home');
				},
				failure : function(form, action) {
					var lblField = Ext.ComponentQuery
					.query('authenticationlogin #msgField')[0];
					if (lblField) {
						switch (action.failureType) {
							case Ext.form.action.Action.CLIENT_INVALID :
								lblField.setText("Campos inv&#225;lidos", false);
								break;
							case Ext.form.action.Action.CONNECT_FAILURE :
								lblField.setText("Falha ao conectar no servidor", false);
								break;
							case Ext.form.action.Action.SERVER_INVALID :
								lblField.setText(action.result.msg || "Usu&aacute;rio e/ou senha inv&#225;lido", false);
						}
					}
				}
			});

		}
	},
	factoryCapsWarningToolTip : function() {
		/*
		 * Cria a view do tooltip
		 */
		if (!this._capswarningtooltip) {
			this._capswarningtooltip = Ext.widget('capswarningtooltip');
		}
		return this._capswarningtooltip;
	},
	verifyCapsLock : function(text, e) {
		var charCode = e.getCharCode();
		if ((e.shiftKey && charCode >= 97 && charCode <= 122) || (!e.shiftKey && charCode >= 65 && charCode <= 90)) {
			this.factoryCapsWarningToolTip().show();
			return false;
		} else {
			this.factoryCapsWarningToolTip().hide();
		}
	},
	verifyEnter : function(txt, e) {
		if (e.getKey() === e.ENTER) {
			e.stopEvent();
			var btn = Ext.ComponentQuery
			.query('authenticationlogin button[action=trylogin]')[0];
			if (btn) {
				this.tryLogin(btn);
			}
		}
	}
}); 