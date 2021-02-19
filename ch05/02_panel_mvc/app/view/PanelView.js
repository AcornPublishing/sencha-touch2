Ext.define("PanelApp.view.PanelView", {
    extend: 'Ext.Panel',
    requires: [
    ],
    config: {
		html:[
			'Panel View ±¸Á¶'
		].join(" "),
		
        items:[
            {
                docked : 'top',
                style:'background-color:blue;font-size:40px',
                xtype: 'panel',
                html: 'TOP'
            },
            {
                docked : 'bottom',
                xtype: 'panel',
                style:'background-color:green;font-size:40px',
                html: '<font color="yellow">BOTTOM</font>'
            }               
        ],
    }
});
