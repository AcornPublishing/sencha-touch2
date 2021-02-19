Ext.define("PanelApp.view.PanelView", {
    extend: 'Ext.Panel',   
    requires: [
        'PanelApp.view.TopView',
        'PanelApp.view.BottomView'
    ],
    config: {
        html:[
            'Panel View 구조<BR>',
            '파일을 나누다<BR>',
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
