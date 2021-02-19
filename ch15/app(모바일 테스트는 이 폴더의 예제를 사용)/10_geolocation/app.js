Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.application({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.MessageBox',
        'PhoneGap'],
    launch: function() {
        panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
             contentEl: 'map',
            layout:{
                type:'vbox'
            },
            items: [{
                docked: 'top',
                xtype: 'toolbar',
                title: '내위치는?',
                items: [{
                    text: 'DAUM 지도 ',
                    handler: function(btn,event){
                        onSeachMap();
                        //mMap.init();
                    }
                }]
            },
            {
                id:'maphere',
                flex:1,
                style:'background-color:green;font-size:20px',
                html: ''
            }]
        });
        
        var mMap = {
            pos_y:37.537900,
            pos_x:127.00500,
            info:'<img src="./img/me.png" width="50"/>',
            init:function() {
                map = new daum.maps.Map(Ext.getCmp('maphere').element.dom
                    , {
                    center: new daum.maps.LatLng(Number(this.pos_y), Number(this.pos_x))
                });
                var zoomControl = new daum.maps.ZoomControl();
                map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
                var mapTypeControl = new daum.maps.MapTypeControl();
                map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
        
                //원 그리기
                var circle = new daum.maps.Circle({
                    center : new daum.maps.LatLng(this.pos_y, this.pos_x),
                    radius : 200,
                    strokeWeight : 4,
                    strokeColor : "#ff0000"
                });
                circle.setMap(map);
                marker = new daum.maps.Marker({
                    position: new daum.maps.LatLng(this.pos_y , this.pos_x )
                });
                infowindow  = new daum.maps.InfoWindow({
                    content: this.info ,
                    removable : true
                });
                console.log(infowindow );
                infowindow.open(map, marker );
    
                daum.maps.event.addListener(marker , "click", function( ) {
    
                    infowindow.open(map, marker );
                });
                marker.setMap(map);     
            }       
        }

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            //navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
        function onSeachMap()
        {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }

        function onSuccess(position) {
            mMap.pos_y = position.coords.latitude;
            mMap.pos_x = position.coords.longitude;
            mMap.init();
        }
    

        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }                   
    }
});