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
            html: "Overlay�� �����ִ� �����Դϴ�.",
            
            items:[{
                docked: 'top',
                xtype: 'toolbar',
                items: [{
                    text: '��ư Overlay �����ֱ�',
                    handler: function(btn,event){
                        overlay_s.setCentered(false);
                        overlayToolbar_s.setTitle('JSA ��');                            
                        overlay_s.showBy(btn);                  
                    }
                }, 
                {xtype: 'spacer'}, 
                {
                    text: '��� Overlay �����ֱ�',
                    handler: function(btn,event){
                        overlay_n.setCentered(true);
                        overlayToolbar_n.setTitle('JSA ��');
                        overlay_n.show();                   
                    }
                }]
            }]
        });
    }
});