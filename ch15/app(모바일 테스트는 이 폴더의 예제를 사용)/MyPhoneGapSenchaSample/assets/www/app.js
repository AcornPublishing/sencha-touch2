Ext.ns('notification');

Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.application({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    requires:[
    	'Ext.Panel',
    	'Ext.Anim',
    	'Ext.Toolbar',
    	'PhoneGap',
    	],
    launch: function() {
        notification.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            html:'센차터치 NOTIFICATION',
            items: [
            {
               	docked : 'top',
                xtype: 'toolbar',
                items:[
                {
                    xtype:'button',
                    text:'Alert',
                    handler:function()
                    {
                    	showAlert();
                    }
                },{
                    xtype:'button',
                    text:'Beep',
                    handler:function()
                    {
                    	playBeep();
                    }
                },{
                    xtype:'button',
                    text:'Vibrate',
                    handler:function()
                    {
                    	vibrate();
                    }
                }]                    
            }]          
        });     
	    document.addEventListener("deviceready", onDeviceReady, false);
	    function onDeviceReady() {
	        // Empty
	    }
	    function showAlert() {
	        navigator.notification.alert(
	            'You are the winner!',  
	            'Game Over',           
	            'Done'                 
	        );
	    }
	    function playBeep() {
	        navigator.notification.beep(3);
	    }
	    function vibrate() {
	        navigator.notification.vibrate(2000);
	    }         
    }
});
