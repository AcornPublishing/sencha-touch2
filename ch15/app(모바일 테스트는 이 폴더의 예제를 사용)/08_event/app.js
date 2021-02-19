Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});
 
Ext.application({
	name:'Carousel',
	requires:['Ext.Panel',
			  'Ext.Toolbar',
			  'Ext.carousel.Carousel',
			  'PhoneGap'],
	launch:function(){
        var carousel1 = new Ext.create('Ext.Carousel',{
           //direction:'vertical',
            flex:1,
            indicator:true,
            items: [{
                title: 'Tab 1',
                html: '<center><BR><img src="./img/1.jpg" width="70%"><BR>한마리</center>'
            },
            {
                title: 'Tab 2',
                html: '<center><BR><img src="./img/2.jpg" width="70%"><BR>두마리</center>'
            },
            {
                title: 'Tab 3',
                html: '<center><BR><img src="./img/3.jpg" width="70%"><BR>세마리</center>'
            }],
            listeners:{
                'activeitemchange':function(a,b,c,d){
                }
            }
        });
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center',
            },
            items:[
            {
            	xtype:'toolbar',
            	title:'이벤트리더기',
            },
            carousel1
            ]
        });
	    
	    document.addEventListener("deviceready", onDeviceReady, false);
	    

	    function onDeviceReady() {
	        // Register the event listener
	        document.addEventListener("menubutton", onMenuButton, false);
	        document.addEventListener("backbutton", onBackButton, false);
	    }

	    function onMenuButton() {

	    	carousel1.setActiveItem(carousel1.getActiveIndex() -1);
	    }
	    function onBackButton() {
	    	carousel1.setActiveItem(carousel1.getActiveIndex() + 1);
	    }        
    }
});