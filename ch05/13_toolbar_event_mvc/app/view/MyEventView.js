Ext.define("MyEventApp.view.MyEventView", {
    extend: 'Ext.TabPanel',   
    xtype:'myeventview',
    requires:[
            'Ext.Panel',
            'Ext.TabPanel',
            'Ext.Toolbar',
            'Ext.Label'],    
    config:{    
        tabBar: {
            docked: 'bottom',
            layout: {
                pack: 'center'
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
            
            },  
            items:[
            {
                flex:1,
                xtype:'button',
                name:'button1',
                text:'이벤트 handler',                  
            },   
            {
                flex:1,
                xtype:'button',
                name:'button2',
                text:'이벤트 발생시키기',                   
                handler:function()
                {
                    
                }
            },                
            {
                name:'label1',
                xtype:'label',
                flex:1,
                html:'이벤트 받아와 처리하기.',
                style:'background-color:yellow',                
            },                
            {
                flex:1,
                name:'label2',
                xtype:'label',
                style:'background-color:lightgreen',
                html:'이벤트테스트 -라벨.',                 
            },
            {
                flex:1,
                name:'label3',
                name:'label3',
                xtype:'label',
                style:'background-color:green',
                html:'이벤트 Carousel의 구현',
            
            }]
        }, {
            title: 'Favorites',
            html: '<center><font size="64" color="red"><BR>2<BR>두번째 </font></center>',
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
                name:'back',
                text:'back',    
                handler:function()
                {
                    //tabpanel.setActiveItem(0);
                }               
            },
            { 
                ui: 'forward', 
                name:'forward',
                text:'forward',         
                handler:function()
                {
                    //tabpanel.setActiveItem(1);
                }               
            }]
        }]  
    }
});