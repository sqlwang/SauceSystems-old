Ext.define('SauceApp.view.Admin.Privileges.RoleAddAssign', {
	extend : 'Ext.window.Window',
	alias : 'widget.RoleAddAssign',

	autoShow : true,
	title : '添加角色权限',
	closable : true,
	closeAction : 'colse',
	width : 600,
	minWidth : 350,
	height : 300,
	border : 0,
	layout : 'fit',
	initComponent : function() {
		this.items = [{
			xtype : 'form',
			frame : true,
			width : 600,
			bodyPadding : 0,
			waitMsgTarget : true,
			fieldDefaults : {
				labelAlign : 'right',
				labelWidth : 85,
				msgTarget : 'side'
			},
			items : [{
				xtype: 'combobox',
				fieldLabel: '选择角色',
			    store: 'Admin.PRoleStore',
			    name: 'roleName',
			    displayField: 'roleName'
			},{
				xtype : 'fieldset',
				title : '任务列表',
				layout : 'anchor',
				id : 'assignTaskFieldset',
				defaults : {
					anchor : '100%',
					labelStyle : 'padding-left:4px;'
				},
				collapsible : false,
				collapsed : false
			},{
				xtype : 'fieldset',
				title : '操作列表',
				layout : 'anchor',
				defaults : {
					anchor : '100%',
					labelStyle : 'padding-left:4px;'
				},
				collapsible : false,
				collapsed : false,
				id: 'assignOperationFieldset'
			}]
		}];

		this.buttons = [{
			text : '保存',
			action : 'save'

		}, {
			text : '取消',
			scope : this,
			handler : function(){
				this.close();
			}
		}];

		this.callParent(arguments);
	}
});
