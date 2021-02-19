Ext.application({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.MessageBox'],
    launch: function() {


        var overlayToolbar = new Ext.create('Ext.Toolbar',{
           docked: 'top'
        });
        
        var overlay = new Ext.create('Ext.Panel',{
            modal: true,
            centered: true,
            width: 300,
            height: 300,
            styleHtmlContent: true,
            items:overlayToolbar,     
            contentEl: 'map',
        });

        panel = new Ext.create('Ext.Panel',{
            fullscreen: true,         
            layout:{
                type:'vbox'
            },
            items: [{
                docked: 'top',
                xtype: 'toolbar',
                items: [{
                    text: 'DAUM 지도 ',
                    handler: function(btn,event){
                        
                        overlay.show();
                        mMap.init();
                    }
                }]
            },
            {
                flex:1,
                style:'background-color:green;font-size:20px',
                html: ''
            }]
        });
        
        var mMap = {
            pos_y:37.537900,
            pos_x:127.00500,
            info:'<img src="./img/mr.png" width="50">다음지도',
			init:function() {	
                map = new daum.maps.Map(overlay.element.dom, {
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
    }
});