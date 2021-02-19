Ext.define("ProxyApp.view.ProxyView", {
    extend: 'Ext.Panel',   
    xtype:'proxyview',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'ProxyApp.view.ProxyList',
        ],      
    config:{
        fullscreen: true,
        layout:{
            type:'vbox',
            
        },
        id: 'content',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title:'Proxy Ω√¿€',
        },
        {
            xtype:'proxylist',
            flex:1,
        }]      
    }
});
