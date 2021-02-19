Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.application({
    name:'overlay2',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.Button',
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
            centered: true,
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
                    checkConnection();                 
                }
            }]
        };
        
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox',
            },
            items: [
                dockedItems
            ],              
            html: "Connection",                
        });
        
	    function onDeviceReady() {
	    }
	
	    function checkConnection() {
	        var networkState = navigator.network.connection.type;
	
	        var states = {};
	        states[Connection.UNKNOWN]  = 'Unknown connection';
	        states[Connection.ETHERNET] = 'Ethernet connection';
	        states[Connection.WIFI]     = 'WiFi connection';
	        states[Connection.CELL_2G]  = 'Cell 2G connection';
	        states[Connection.CELL_3G]  = 'Cell 3G connection';
	        states[Connection.CELL_4G]  = 'Cell 4G connection';
	        states[Connection.NONE]     = 'No network connection';
	
			overlay.setHtml('연결상태:' + states[networkState]);
	       
	    }          
    }
});