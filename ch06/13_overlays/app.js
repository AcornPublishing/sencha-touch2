Ext.application({
    name:'overlay',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.Spacer'],
    launch:function(){

        var overlayToolbar_s = new Ext.create('Ext.Toolbar',{
           docked: 'top',
           items:[{
                xtype:'button',
                text:'Close',
                handler : function(btn) {
                    overlay_s.hide();
                }
           }]           
        });
        
        var overlay_s = new Ext.create('Ext.Panel',{
            docked: 'top',
            modal: true,
            centered: true,
            top:0,
            left:0,
            width: 400,
            height: 400,
            styleHtmlContent: true,
            items: overlayToolbar_s,
            scrollable: 'vertical',
            contentEl: 'overlay_south',
            cls: 'htmlcontent'
        });

        var overlayToolbar_n = new Ext.create('Ext.Toolbar',{
           docked: 'top',
           items:[{
                xtype:'button',
                text:'Close',
                handler : function(btn) {
                    overlay_n.hide();
                }
           }]           
        });
        var overlay_n = new Ext.create('Ext.Panel',{
            docked: 'top',
            modal: true,
            centered: true,
            top:0,
            left:0,
            width: 400,
            height: 400,
            styleHtmlContent: true,
            items: overlayToolbar_n,
            scrollable: 'vertical',
            contentEl: 'overlay_north',
            cls: 'htmlcontent'
        });

        new Ext.create('Ext.Panel',{
            fullscreen: true,
            html: "Overlay를 보여주는 예제입니다.",
            
            items:[{
                docked: 'top',
                xtype: 'toolbar',
                items: [{
                    text: '버튼 Overlay 보여주기',
                    handler: function(btn,event){
                        overlay_s.setCentered(false);
                        overlayToolbar_s.setTitle('JSA 남');                            
                        overlay_s.showBy(btn);                  
                    }
                }, 
                {xtype: 'spacer'}, 
                {
                    text: '가운데 Overlay 보여주기',
                    handler: function(btn,event){
                        overlay_n.setCentered(true);
                        overlayToolbar_n.setTitle('JSA 북');
                        overlay_n.show();                   
                    }
                }]
            }]
        });
    }
});