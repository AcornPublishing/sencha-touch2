Ext.application({
    name:'overlay2',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.Button'],
    launch:function(){
        
        var overlayToolbar = new Ext.create('Ext.Toolbar',{
           docked: 'top',
            items:[{
                xtype:'button',
                text:'Close',
                handler : function(btn) {
                    overlay.hide();
                }
            }]             
        });
                
        var overlay = new Ext.create('Ext.Panel',{
        	modal:true,
            centered: true,
            visible:false,
            modal:true,
            width:250,
            height:150,
            items:[ overlayToolbar ]
        });

        var dockedItems = {
            docked: 'top',
            xtype: 'toolbar',    
            title:'Connection',        
            items: [{
                text: '연결상태 보기',
                handler: function(btn,event){
                    overlay.setCentered(true);
                    overlayToolbar.setTitle('연결상태');
                    overlay.show();                    
                }
            }]
        };
        
        panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox',
            },
            items: [
                dockedItems
            ],              
            html: "Connection 체크",                
        });
    }
});