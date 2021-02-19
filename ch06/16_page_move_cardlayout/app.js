Ext.ns("main");

Ext.application({
    name:'PAGE',
    requires:[
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Panel',
        'Ext.form.FieldSet',
        'first',
        'second',
    ],
    launch:function(){
        main = this;  
        first.init();
        second.init();
        main.panel = new Ext.create('Ext.Panel',{
            fullscreen:true,          
            layout:{
                type:'card',
                animation:"flip",
            },                   
        }); 
        main.panel.add(first.panel);
        main.panel.add(second.panel);        
        main.panel.setActiveItem(first.panel);
    }
});
