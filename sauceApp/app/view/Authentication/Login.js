/**
 *
 * Modelo de Login usando MCV
 * Desenvolvido por Ricardo Hirashiki
 * Publicado em: http://www.sitedoricardo.com.br
 * Data: Ago/2011
 *
 * Baseado na extensao criada por Wemerson Januario
 * http://code.google.com/p/login-window/
 *
 */

Ext.define('SauceApp.view.Authentication.Login', {
	extend : 'Ext.window.Window',
	alias : 'widget.authenticationlogin',
	layout : 'fit',
	bodyStyle : 'padding:10px;',
	//title : '酱油网络计费系统',
	title : '',
	id : 'authentication-login',
	autoShow : true,
	labelAlign : 'left',
	closable : false,
	draggable : false,
	constrain : true,
	resizable : false,

	initComponent : function() {
		this.items = [{
			xtype : 'form',
			baseCls : 'x-plain',
			border : false,
			bodyStyle : "padding: 10px;",
			waitMsgTarget : true,
			labelAlign : "left",
			items : [{
				xtype : 'textfield',
				name : 'LoginForm[username]',
				id : 'userName',
				fieldLabel : '用户名',
				allowBlank : false,
				blankText : '请输入用户名',
				msgTarget : 'side',
				selectOnFocus : true,
				enableKeyEvents : true
			}, {
				xtype : 'textfield',
				inputType : 'password',
				name : 'LoginForm[password]',
				id : 'password',
				fieldLabel : '密码',
				allowBlank : false,
				blankText : '请输入密码',
				msgTarget : 'side',
				selectOnFocus : true,
				enableKeyEvents : true
			}]
		}];
		this.buttons = [{
			xtype : 'label',
			style : {
				color : '#ff0000'
			},
			id : 'msgField',
			width : 200
		}, {
			text : '<b>进入</b>',
			action : 'trylogin'
		}];
		this.callParent(arguments);
	}
}); 