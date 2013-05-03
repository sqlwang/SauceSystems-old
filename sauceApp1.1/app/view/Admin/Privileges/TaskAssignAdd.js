Ext.define('SauceApp.view.Admin.Privileges.TaskAssignAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.TaskAssignAdd',

	autoShow : true,
	title : '添加任务权限',
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
				fieldLabel: '选择任务',
			    store: 'Admin.TaskStore',
			    name: 'taskName',
			    displayField: 'taskName'
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
