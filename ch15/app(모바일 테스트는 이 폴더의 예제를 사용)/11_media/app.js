Ext.ns('media');

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
        'Ext.form.FieldSet',
        'Ext.field.Slider',
        'Ext.Label',
        'PhoneGap',
        ],
    launch: function() {
        media.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            
            layout:{
                type:'vbox',
            },
            items: [
            {
                docked : 'top',
                xtype: 'toolbar',
                items:[
                {
                    xtype:'button',
                    text:'PLAY',
                    handler:function()
                    {
                        playAudio("http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3");
                    }
                },
                {
                    xtype:'button',
                    text:'PAUSE',
                    handler:function()
                    {
                        pauseAudio();
                    }
                },
                {
                    xtype:'button',
                    text:'STOP',
                    handler:function()
                    {
                        stopAudio();
                    }
                }]                    
            },
            {
                xtype:'fieldset',
                items:[
                {
                    xtype:'label',
                    html:'오디오 플레이어',                 
                },
                {
                    xtype:'label',
                    id:'info',
                    html:'정보: ^^',                    
                },              
                {
                    xtype: 'sliderfield',
                    id:'myaudio',
                    value:0,
                    maxValue: 10000,
                    minValue: 0,            
                }]              
            }]          
        });  
        
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            
        }
        var my_media = null;
        var mediaTimer = null;  
        playAudio=function(src)
        {
            if (my_media == null) {
                my_media = new Media(src, onSuccess, onError);
                
            } 
            my_media.play();

            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    my_media.getCurrentPosition(
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }           
        }
        pauseAudio=function()
        {
            if (my_media) {
                my_media.pause();
            }
        }
        stopAudio=function()
        {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }        
        function onSuccess() {
            alert(my_media.getDuration());
            Ext.getCmp('myaudio').setMaxValue(my_media.getDuration());
            console.log("playAudio():Audio Success");
        }
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }
        function setAudioPosition(position) {
            //document.getElementById('audio_position').innerHTML = position;
            Ext.getCmp('myaudio').setMaxValue(my_media.getDuration());
            Ext.getCmp('myaudio').setValue(position);
            Ext.getCmp('info').setHtml('정보:' + position);
        }
    }
});