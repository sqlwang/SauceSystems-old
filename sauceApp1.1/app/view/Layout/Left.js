Ext.define('SauceApp.view.Layout.Left' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.layoutleft',
    //title : '客户信息',
	region: 'west',
    width: 320,
    split: true,
    collapsible: true,
	layout: 'card',
	// items: [
		// {xtype : 'TotalList'}
	// ],

    initComponent: function() {
        this.callParent(arguments);
    }
});
