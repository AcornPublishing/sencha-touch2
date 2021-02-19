Ext.ns('compass');

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
    	'PhoneGap'
    	],
    launch: function() {
		
		var rot={};
		var obj;
		var cur=0;
		var tgt = 0;
		

        compass.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            style:'background-color:white',
            html:'<center><BR><img id="img1" src="./img/compass.png" width="80%"></center>',
            items: [
            {
               	docked : 'top',
                xtype: 'toolbar',
                title:'센차터치 나침반',
                items:[
                {
                    xtype:'button',
                    text:'90',
                    handler:function()
                    {
						tgt=90;
                    }
                },
                {
                	xtype:'spacer',
                },
                {
                    xtype:'button',
                    text:'-90',
                    handler:function()
                    {
						tgt=-90;
                    }
                }                                                                                                                 
                ]                    
            }]          
        });  


	    var watchID = null;

	    document.addEventListener("deviceready", onDeviceReady, false);

	    function onDeviceReady() {
	        startWatch();
	    }
	
	    function startWatch() {
	        var options = { frequency: 3000 };
	        watchID = navigator.compass.watchHeading(onSuccess, onError, options);
	    }

	    function stopWatch() {
	        if (watchID) {
	            navigator.compass.clearWatch(watchID);
	            watchID = null;
	        }
	    }
	
	    function onSuccess(heading) {
	    	tgt = heading.magneticHeading * (-1);
	    }
	

	    function onError(compassError) {
	        alert('Compass error: ' + compassError.code);
	    }        
	    
        obj = document.getElementById("img1");
        compass.rotate=function()
        {

        	if(tgt > cur)
        		cur=cur+5;
        	if(tgt < cur)
        		cur=cur-5;
        	rot = "rotate(" + cur + "deg)";
			obj.style.webkitTransform = rot;        	
        	setTimeout('compass.rotate()', 100);

        }	    
		compass.rotate();          
    }
});
