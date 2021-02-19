Ext.application({
    name:'Sencha',
    requires:['Ext.Panel'],
    launch:function(){
        panel = Ext.create("Ext.Panel",{
        	style:'background-color:yellow',
            fullscreen:true,
        	html:['I am Container'].join(" ")
        });
        childpanel = Ext.create('Ext.Panel',
        {
        	fullscreen:true,
        	xtype:'panel',
        	style:'background-color:white',            	
            html:['I am a Component<br>',
                  'I am added'].join(" ")
        });
        panel.add(childpanel);
        childpanel.setCentered(true);
        childpanel.setHtml('I am centered');
    }
});