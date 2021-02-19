Ext.define("PanelApp.view.TopView", {
    extend: 'Ext.Panel',
    xtype:'topview',
    requires: [
    ],
    config: {
        docked : 'top',
        style:'background-color:blue;font-size:40px',
        xtype: 'panel',
        html: 'TOP'		
    }
});
