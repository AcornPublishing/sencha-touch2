Ext.define("PanelApp.view.BottomView", {
    extend: 'Ext.Panel',
    xtype:'bottomview',
    requires: [
    	
    ],
    config: {

        docked : 'bottom',
        xtype: 'panel',
        style:'background-color:green;font-size:40px',
        html: '<font color="yellow">BOTTOM</font>'

    }
});
