Ext.define('SauceApp.view.Layout.Appview', {
  extend        : 'Ext.panel.Panel',
  alias         : 'widget.layoutappview',
  layout : 'border',
  id : 'layoutappview',
  items:[
    {xtype:'layoutheader'},
    {xtype:'layoutfooter'},
    {xtype:'layoutleft'},
    //{xtype:'layoutright'},
    {xtype:'ManagementArea'}//middle
  ]
      
});