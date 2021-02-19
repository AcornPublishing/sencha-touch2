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
                text:'�̺�Ʈ handler',                  
            },   
            {
                flex:1,
                xtype:'button',
                name:'button2',
                text:'�̺�Ʈ �߻���Ű��',                   
                handler:function()
                {
                    
                }
            },                
            {
                name:'label1',
                xtype:'label',
                flex:1,
                html:'�̺�Ʈ �޾ƿ� ó���ϱ�.',
                style:'background-color:yellow',                
            },                
            {
                flex:1,
                name:'label2',
                xtype:'label',
                style:'background-color:lightgreen',
                html:'�̺�Ʈ�׽�Ʈ -��.',                 
            },
            {
                flex:1,
                name:'label3',
                name:'label3',
                xtype:'label',
                style:'background-color:green',
                html:'�̺�Ʈ Carousel�� ����',
            
            }]
        }, {
            title: 'Favorites',
            html: '<center><font size="64" color="red"><BR>2<BR>�ι�° </font></center>',
            iconCls: 'favorites',
            cls: 'card2',
            badgeText: '����',
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