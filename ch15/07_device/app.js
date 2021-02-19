Ext.application({
    name:'overlay',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.Spacer'],
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
            docked: 'top',
            centered: true,
            top:0,
            left:0,
            width: 300,
            height: 300,
			html:'폰정보를 뿌린다.',
			items:overlayToolbar
        });

        new Ext.create('Ext.Panel',{
            fullscreen: true,            
            items:[{
                docked: 'top',
                xtype: 'toolbar',
                title:'DEVICE',
                items: [ 
                {
                    text: '휴대폰 정보',
                    handler: function(btn,event){
                        overlayToolbar.setTitle('내휴대폰정보');
                        overlay.setCentered(true);                       
                    	overlay.show();                   
                    }
                }]
            }]
        });
    }
});