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
        
        var enddegree;
        
        Ext.apply( Ext.anims ,{ 
            rotate: new Ext.Anim({
                degree:0,
                //enddegree:0,
                before: function(el) {
                    this.from = {
                        '-webkit-transform': 'rotate(' + this.degree + 'deg)',
                    };
                    this.to = {
                        '-webkit-transform': 'rotate(' + enddegree + 'deg)'
                       
                    };
                },
                after:function(el){

                    if(enddegree <=60)
                        alert('�߿���ħ');
                    else if(enddegree <=120)
                        alert('���');
                    else if(enddegree <=180)
                        alert('Ⱦ���ѿ� �ý�');
                    else if(enddegree <=240)
                        alert('�ǳ���ħ');
                    else if(enddegree <=300)
                        alert('�鱸���� �ý�');
                    else 
                        alert('�����Լ�');
                },
                duration: 1000
            })
        });
        
        panel_ani = new Ext.create('Ext.Panel',{
            width:300,
            height:300,
            centered:true,
            html:'<img src="./img/bokbulbok.png" width="100%" height="100%">',
        });
        
        var panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            items: [
            {
                docked : 'top',
                xtype: 'toolbar',
                title:'������ġ  ���Һ�',
                items:[
                {
                    xtype:'button',
                    text:'����',
                    handler:function()
                    {
                        enddegree = Math.floor(Math.random() * 360);
                        Ext.Anim.run(panel_ani, 'rotate',{
                            degree:0,
                            enddegree:enddegree
                        });  
                    }
                }                                                                                                 
                ]                    
            },
            panel_ani  
            ]          
        }); 
        
        
        
	    var watchID = null;
	    console.log('hi1');

	    function onDeviceReady() {
			console.log('device ready');
	        startWatch();
	    }
	

	    function startWatch() {
			console.log('start');
	        var options = { frequency: 1000 };	
	        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	    }
	
	    function stopWatch() {
	        if (watchID) {
	            navigator.accelerometer.clearWatch(watchID);
	            watchID = null;
	        }
	    }
	
	    function onSuccess(acceleration) {
	    	console.log(acceleration.x);
	    	if(acceleration.z > 10)
	    	{
                enddegree = Math.floor(Math.random() * 360);
                Ext.Anim.run(panel_ani, 'rotate',{
                    degree:0,
                    enddegree:enddegree
                });  	    	
	    	}
	    }

	    function onError() {
	        alert('onError!');
	    }
	    document.addEventListener("deviceready", onDeviceReady, false);
		console.log('hi2');	    

           
    }
});
