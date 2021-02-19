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
        camera.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            html:'<BR><center><img id="img1" src="./img/south.jpg" width="80%">',
            items: [
            {
               	docked : 'top',
                xtype: 'toolbar',
                title:'������ġ ī�޶�',
                items:[
                {
                    xtype:'button',
                    text:'�������',
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
