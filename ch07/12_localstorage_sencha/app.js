Ext.ns("main");

Ext.application({
    name:'PAGE',
    requires:[
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.data.Store',
        'Ext.data.proxy.LocalStorage',
        'Ext.field.Text',
        'Ext.List',
        'common',
        'reg',
        'list',
    ],
    launch:function(){
        main = this;  
        common.init();
        reg.init();
        list.init();
        main.panel = new Ext.create('Ext.Panel',{
            fullscreen:true,      
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
                    text: '등록',
                    handler : function(btn) {
                        main.panel.setActiveItem(reg.panel);
                    }
                },
                {
                    text: '조회',
                    handler : function(btn) {
                        list.loadData();
                        main.panel.setActiveItem(list.panel);
                    }                  
                }]
            }], 
        }); 
        main.panel.add(reg.panel);
        main.panel.add(list.panel);
        main.panel.setActiveItem(reg.panel);
    }
});




