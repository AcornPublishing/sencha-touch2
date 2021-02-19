
Ext.application({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Video',
        'Ext.Spacer'],
    launch: function() {
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout: {
                type: 'vbox',           
            },          
            items:[
{
                docked:'top',
                xtype:'toolbar',
                layout: {
                    type: 'hbox', 
                    pack: 'center',                 
                },
                        
                items:[                 
                {           
                    xtype:'button',
                    width:50,
                    text:'¢º',
                    handler:function(){
                        Ext.getCmp("player").play();
                    }
                },
                {           
                    xtype:'button',
                    width:50,
                    text:'¡Ü', 
                    handler:function(){
                        Ext.getCmp("player").pause();
                    }
                },
                {           
                    xtype:'button',
                    width:50,
                    text:'¢Ý', 
                    handler:function(){
                        Ext.getCmp("player").toggle();

                    }
                },
                {   xtype: 'spacer',
                    width: 50
                }]
            },            
            {
                flex:1,
                docked:'top',
                xtype: 'video',
                url: 'BigBuck.m4v',
                id:'player',
                loop: true,
                width:  400,
                height: 300,
                autoResume:true,
                //posterUrl: 'Screenshot.png'
            }],
        }); 
    }
});


