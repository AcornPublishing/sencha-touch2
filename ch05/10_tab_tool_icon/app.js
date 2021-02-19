Ext.require('Ext.tab.Panel');
Ext.require('Ext.Label');

Ext.application({
    name:'ToolTabBar',

    launch:function(){
        var tabpanel = new Ext.create('Ext.TabPanel',{
            tabBar: {
                docked: 'bottom',
                layout: {
                    pack: 'center',                    
                }
            },
           
            fullscreen: true,
            defaults: {
                scrollable: 'vertical'
            },
            items: [{
                title: 'About',
                iconCls: 'info',                
                cls: 'card1',    
                layout: {
                    type: 'vbox',
                    align: 'strech',
                    cardSwitchAnimation:'cube',
                
                },
                 html: '<center><font size="64" color="red"><BR>1<BR>첫번째 </font></center>',
                style:"background-image:url('./img/flower.png');",
            }, {
                title: 'Favorites',
                html: '<center><font size="64" color="red"><BR>2<BR>두번째 </font></center>',
                style:"background-image:url('./img/woodball.png');",
                iconCls: 'favorites',
                cls: 'card2',
                badgeText: '뱃찌',
            },{
                xtype: 'toolbar',
                docked: 'top',
                defaults: {
                    ui: 'plain'
                },
                scrollable: 'horizontal',
                layout: {
                    pack: 'center'
                },
                defaults: {
                    iconMask: true,
                },
                items: [
                 { 
                    ui: 'back', 
                    text:'back',    
                    handler:function()
                    {
                        tabpanel.setActiveItem(0);
                    }               
                },
                {
                	xtype:'spacer'
                },
                { 
                    ui: 'forward', 
                    text:'forward',         
                    handler:function()
                    {
                        tabpanel.setActiveItem(1);
                    }               
                },
                
                ]
            }]  
        
        });
      
    }    
});