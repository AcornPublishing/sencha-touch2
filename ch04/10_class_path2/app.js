Ext.ns("main");

Ext.application({
    name:'Path',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'package1.sub1'],
    launch:function(){      
        main.panel = new Ext.create('Ext.Panel',{
            fullscreen:true,
            items:[{
                xtype:'toolbar',
                title:'��Ű���� ���',
            }]
        });
        package1.sub1.obj.init();
        main.panel.add(package1.sub1.panel);        
    }
});





