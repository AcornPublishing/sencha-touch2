Ext.ns("main");

Ext.application({
    name:'SAMPLE',
    requires:['Ext.Panel',
              'Ext.Toolbar',
              'sub1'],
    launch:function(){
        main = this;        
        main.panel = new Ext.create('Ext.Panel',{
            fullscreen:true,
            items:[{
                xtype:'toolbar',
                title:'��Ű���� ���',
            }]
        });
        sub1.obj.init();
        main.panel.add(sub1.panel);
    }
});




