Ext.define("ProxyApp.view.ProxyList", {
    extend: 'Ext.List',   
    xtype:'proxylist',
    config:{
        flex:1,
        itemTpl:'<div><strong>{Skill}</strong></div>',
 
    }
});