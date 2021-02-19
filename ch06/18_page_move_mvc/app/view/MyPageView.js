Ext.define("MyPageApp.view.MyPageView", {
    extend: 'Ext.Panel',   
    xtype:'mypageview',
    requires:[
        'Ext.Panel',
        'Ext.data.Store',
        'Ext.DataView',
        'Ext.Toolbar',
        'MyPageApp.view.MyFirstPageView',
        'MyPageApp.view.MySecondPageView'],
    config: {
        layout:{
            type:'card',
            animation:"flip",
        },                   
        items :[
        {
            docked: 'top',
            xtype: 'toolbar',
            items: [
            {
                xtype:'button',
                name:'callfirstview',
                text: 'ù��°',
            },
            {
                xtype:'button',
                name:'callsecondview',
                text: '�ι�°',                
            }]
        }], 
    }    
});
