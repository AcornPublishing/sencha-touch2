Ext.ns('media');

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
            		html:'¿Àµð¿À ÇÃ·¹ÀÌ¾î',            		
            	},
            	{
            		xtype:'label',
            		id:'info',
            		html:'Á¤º¸: ^^',            		
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
        
        playAudio=function(src)
        {
        	Ext.getCmp('myaudio').setMaxValue(1000);
        	Ext.getCmp('myaudio').setValue(500);
        	Ext.getCmp('info').setHtml('Á¤º¸:500');
        	
        }
        pauseAudio=function()
        {
        	alert('½°');
        }
        stopAudio=function()
        {
        	alert('¸ØÃã');
        }        
    }
});
