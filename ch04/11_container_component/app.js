Ext.application({
    name:'Sencha',
    requires:['Ext.Panel'],
    launch:function(){
        Ext.create("Ext.Panel",{
            fullscreen:true,
            html:['I am Container'].join(" "),
            items:[
            {
                xtype:'panel',
                style:'background-color:white',             
                html:['I am a Component<br>',
                      'I am added'].join(" ")
            }]
        });
    }
});