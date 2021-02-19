Ext.application({
    name:'Sencha',
    requires:['Ext.Panel'],
    launch:function(){
        Ext.create("Ext.Panel",{
            
            fullscreen:true,
            tabBarPosition:'bottom',
            
            items:[
                {
                    title:'Home',
                    iconCls:'home',
                    html:[
                        'Hello<BR>',
                        'My Name is Lee<BR>',
                        'And This is Sencha Touch2'
                    ].join(" ")
                }
            ]
        });
    }
});