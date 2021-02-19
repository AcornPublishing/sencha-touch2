Ext.application({
    name:'ToolTabBar',
    requires:[
            'Ext.Panel',
            'Ext.TabPanel',
            'Ext.Toolbar',
            'Ext.Label'],
    launch:function(){
        var tabpanel = new Ext.create('Ext.TabPanel',{
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
                    handler:function()
                    {
                        alert('버튼이 클릭되었습니다.');                        
                    }
                },   
                {
                    flex:1,
                        xtype:'button',
                    name:'button1',
                    text:'이벤트 발생시키기',                   
                    handler:function()
                    {
                        Ext.getCmp('label1').element.fireEvent('myEvent','go event');
                    }
                },                
                {
                    id:'label1',
                        xtype:'label',
                        flex:1,
                    html:'이벤트 받아와 처리하기.',
                    style:'background-color:yellow',                
                },                
                {
                    flex:1,
                    id:'label2',
                        xtype:'label',
                        style:'background-color:lightgreen',
                    html:'이벤트테스트 -라벨.',                 
                },
                {
                    flex:1,
                    id:'label3',
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
                    text:'back',    
                    handler:function()
                    {
                        tabpanel.setActiveItem(0);
                    }               
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
        Ext.getCmp('label1').element.addListener('myEvent', function(a,b,c){
            alert('label1이 클릭되었습니다.');
        });
        Ext.getCmp('label2').element.on('tap', function(){                      
        
            alert('label2가 클릭되었습니다. on 에서 이벤트를 잡았습니다.');         
        });
        var eventDispatcher = this.getEventDispatcher();
    	var startx=0;
    	var endx=0;
        eventDispatcher.addListener('element', '#label3', '*', function(a,b,c,d) {
            var name = d.info.eventName;
                       
            if(name=="tapstart")
            {
                console.log(endx  + "::" + startx);
                startx = a.pageX;
            }
            if(name=="touchend" || name=="mouseup")
            {
                console.log(endx  + "::" + startx);
                endx = a.pageX;
                
                if(startx-endx > 200)
                {
                    console.log(endx  + ":" + startx);
                    tabpanel.setActiveItem(1);
                }
            }

        });        
    }    
});