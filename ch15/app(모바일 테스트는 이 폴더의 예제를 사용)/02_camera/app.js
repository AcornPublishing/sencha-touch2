Ext.ns('camera');

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
        camera.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            html:'<BR><CENTER><img id="img1" src="./img/south.jpg" width="80%">',
            items: [
            {
               	docked : 'top',
                xtype: 'toolbar',
                title:'센차터치 카메라',
                items:[
                {
                    xtype:'button',
                    text:'사진찍기',
                    handler:function()
                    {
                    	camera.getPicture();
                    }
                }]                    
            }]          
        });

	    var pictureSource;   // picture source
	    var destinationType; // sets the format of returned value 
	
	    document.addEventListener("deviceready",onDeviceReady,false);
	

	    function onDeviceReady() {
	        pictureSource=navigator.camera.PictureSourceType;
	        destinationType=navigator.camera.DestinationType;
	    }
	
	    function onPhotoDataSuccess(imageData) {

	      var smallImage = document.getElementById('img1');
	      smallImage.style.display = 'block';
	      smallImage.src = "data:image/jpeg;base64," + imageData;
	    }
	
	    function onPhotoURISuccess(imageURI) {
	      var largeImage = document.getElementById('img1');
	      largeImage.style.display = 'block';
	      largeImage.src = imageURI;
	    }

	    function capturePhoto() {
	      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	        destinationType: destinationType.DATA_URL });
	    }

	    function capturePhotoEdit() { 
	      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	        destinationType: destinationType.DATA_URL });
	    }
	
	    function getPhoto(source) {
	      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
	        destinationType: destinationType.FILE_URI,
	        sourceType: source });
	    }
	
	    function onFail(message) {
	      alert('Failed because: ' + message);
	    }        
          
        camera.getPicture=function()
        {
        	capturePhoto();
        }       
    }
});
