Ext.define('SauceApp.view.Admin.User.UserAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.UserAdd',

	autoShow : true,
	title : '添加操作员',
	closable : true,
	closeAction : 'hide',
	width : 400,
	minWidth : 350,
	height : 300,
	border: 0,
	layout :  'fit',
	initComponent : function() {
		this.items = [{
			xtype : 'form',
			frame : true,
			width : 340,
			bodyPadding : 0,
			waitMsgTarget : true,
			fieldDefaults : {
				labelAlign : 'right',
				labelWidth : 85,
				msgTarget : 'side'
			},
			items : [{
				xtype : 'fieldset',
				title : '操作员信息',
				defaultType : 'textfield',
				defaults : {
					width : 280
				},
				items : [{
					fieldLabel : '登录名',
					emptyText : '',
					name : 'userName'
				}, {
					fieldLabel : '密码',
					//inputType : 'password',
					emptyText : '',
					name : 'password'
				}, {
					fieldLabel : '电子邮箱',
					name : 'email',
					vtype : 'email'
				}]
			}]
		}];

		this.buttons = [{
			text : '保存',
			action : 'save'

		}, {
			text : '取消',
			scope : this,
			handler : this.close
		}];

		this.callParent(arguments);
	}
});
