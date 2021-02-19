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
            html:'<center><img id="img0" src="./img/photo1.png" height="30%"><BR><img id="img1" src="./img/photo1.png" height="30%"><BR><img id="img2" src="./img/photo1.png" height="30%"><BR>',
            items: [
            {
                docked : 'top',
                xtype: 'toolbar',
                title:'센차터치 캡쳐',
                items:[
                {
                    xtype:'button',
                    text:'이미지캡쳐',
                    handler:function()
                    {
                        captureImage();
                    }
                }]                    
            }]          
        });  
        function captureSuccess(mediaFiles) {
            var i, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                uploadFile(i, mediaFiles[i]);
            }       
        }

        function captureError(error) {
            var msg = 'An error occurred during capture: ' + error.code;
            navigator.notification.alert(msg, null, 'Uh oh!');
        }

        function captureImage() {
            navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 3});
        }
        function uploadFile(i, mediaFile) {

            var element = document.getElementById("img" + i);
            var ft = new FileTransfer(),
                path = mediaFile.fullPath,
                name = mediaFile.name;
                
            element.src = path;
            element.height= 150;
        }        
        camera.getPicture=function()
        {
            captureImage();
        }       
    }
});
