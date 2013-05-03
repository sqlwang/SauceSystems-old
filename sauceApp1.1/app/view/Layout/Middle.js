// Ext.define('SauceApp.view.layout.Middle', {
	// extend        : 'Ext.panel.Panel',
	// alias         : 'widget.layoutmiddle',
	// id:'layoutmiddle',
	// deferredRender: false,
	// region:'center',
	// layout: 'card',
	// baseCls: 'x-plain'
// });

Ext.define('SauceApp.view.Layout.Middle', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.ManagementArea',

	region : 'center',

	items : [],

	initComponent : function() {
		this.callParent(arguments);
	}
}); 