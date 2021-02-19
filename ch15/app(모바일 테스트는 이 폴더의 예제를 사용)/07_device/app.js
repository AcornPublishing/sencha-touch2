Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.application({
    name:'overlay',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.Spacer',
        'PhoneGap'],
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
			html:'<div id="deviceProperties"></div>',
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
                    text: '휴대폰정보',
                    handler: function(btn,event){
                        overlayToolbar.setTitle('내휴대폰정보');
                        overlay.setCentered(true);                       
                    	overlay.show();                   
                    }
                }]
            }]
        });
	    document.addEventListener("deviceready", onDeviceReady, false);
	
	    // Cordova is ready
	    //
	    function onDeviceReady() {
	        //var element = document.getElementById('deviceProperties');
	        overlay.setHtml('Device Name: '     + device.name     + '<br />' + 
	                            'Device Cordova: '  + device.cordova  + '<br />' + 
	                            'Device Platform: ' + device.platform + '<br />' + 
	                            'Device UUID: '     + device.uuid     + '<br />' + 
	                            'Device Version: '  + device.version  + '<br />');
	    }
        
    }
});