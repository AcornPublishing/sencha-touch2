Ext.define("PanelApp.view.PanelView", {
    extend: 'Ext.Panel',   
    requires: [
        'PanelApp.view.TopView',
        'PanelApp.view.BottomView'
    ],
    config: {
        html:[
            'Panel View ����<BR>',
            '������ ������<BR>',
            'xtype<BR>',
        ].join(" "),
        items:[
            {
                xtype: 'topview',
            },
            {
                xtype: 'bottomview',
            }               
        ],
    }
});
