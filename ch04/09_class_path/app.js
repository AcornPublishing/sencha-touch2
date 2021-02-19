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
                title:'패키지와 경로',
            }]
        });
        sub1.obj.init();
        main.panel.add(sub1.panel);
    }
});




