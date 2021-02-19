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
                text: '������� ����',
                handler: function(btn,event){
                    overlay.setCentered(true);
                    overlayToolbar.setTitle('�������');
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
            html: "Connection üũ",                
        });
    }
});