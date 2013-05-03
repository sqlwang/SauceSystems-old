Ext.define('SauceApp.view.Admin.User.UserEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.UserEdit',

	autoShow : true,
	title : '修改操作员',
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
				labelWidth : 105,
				msgTarget : 'side'
			},
			items : [{
				xtype : 'fieldset',
				title : '操作员信息',
				defaultType : 'textfield',
				defaults : {
					anchor: '100%'
				},
				items : [{
					hidden: true,
					name : 'userID'
				},{
					fieldLabel : '登录名',
					emptyText : '',
					name : 'userName',
					disabled: true
				}, {
					fieldLabel : '电子邮箱',
					name : 'email',
					vtype : 'email'
				}, {
					fieldLabel : '创建时间',
					name : 'createTime',
					disabled: true
				}, {
					fieldLabel : '最后一次登录时间',
					name : 'lastTime',
					disabled: true
				}]
			},{
            xtype:'fieldset',
            checkboxToggle:true,
            title: '修改密码',
            defaultType: 'textfield',
            collapsed: true,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items :[{
                fieldLabel: '密码',
                name: 'password',
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
