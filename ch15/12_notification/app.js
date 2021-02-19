Ext.ns('camera');

Ext.application({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    requires:[
    	'Ext.Panel',
    	'Ext.Anim',
    	'Ext.Toolbar',
    	],
    launch: function() {
		
		var rot={};
		var obj;
		var cur=0;
		var tgt = 0;
		

        camera.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            html:'<img id="img1" src="./img/bug.png">',
            items: [
            {
               	docked : 'top',
                xtype: 'toolbar',
                title:'������ġ ī�޶�',
                items:[
                {
                	
                    xtype:'button',
                    text:'ī�޶�ȣ��',
                    handler:function()
                    {
                    }
                }]                    
            }]          
        });  
        camera.getPicture=function()
        {
			obj = document.getElementById("img1");
			obj.src = ""; //base64

        }       
    }
});
