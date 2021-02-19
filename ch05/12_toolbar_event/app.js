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
                    text:'�̺�Ʈ handler',                  
                    handler:function()
                    {
                        alert('��ư�� Ŭ���Ǿ����ϴ�.');                        
                    }
                },   
                {
                    flex:1,
                        xtype:'button',
                    name:'button1',
                    text:'�̺�Ʈ �߻���Ű��',                   
                    handler:function()
                    {
                        Ext.getCmp('label1').element.fireEvent('myEvent','go event');
                    }
                },                
                {
                    id:'label1',
                        xtype:'label',
                        flex:1,
                    html:'�̺�Ʈ �޾ƿ� ó���ϱ�.',
                    style:'background-color:yellow',                
                },                
                {
                    flex:1,
                    id:'label2',
                        xtype:'label',
                        style:'background-color:lightgreen',
                    html:'�̺�Ʈ�׽�Ʈ -��.',                 
                },
                {
                    flex:1,
                    id:'label3',
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
            alert('label1�� Ŭ���Ǿ����ϴ�.');
        });
        Ext.getCmp('label2').element.on('tap', function(){                      
        
            alert('label2�� Ŭ���Ǿ����ϴ�. on ���� �̺�Ʈ�� ��ҽ��ϴ�.');         
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