Ext.application({
    name:'ToolBarExample',
    requires:[ 	'Ext.Panel',
    			'Ext.Toolbar'],
    launch: function() {
        var count = 0;
        var panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            html:'<BR><BR><BR><center>About ToolBar<BR>',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                height:80,
                items:[{
                    iconCls: 'info',
                    iconMask: true, 
                    text:'INFOMATION',
                },{
                    iconCls: 'favorites',
                    iconMask: true, 
                    iconAlign:'top',
                    text:'INFOMATION',
                },]    
            },{
                layout: {
                    type: 'hbox',
                    pack: 'center',
                },
                xtype: 'toolbar',
                height:100,
                docked: 'bottom',
                items:[{
                    
                    html: '<img src="./img/arrow_left.png" height="70">',
                },{
                    
                    html: '<img src="./img/posol.png" height="70" >',
                },]    
            },{         
                
                layout: {
                    type: 'vbox',
                    pack:'center',
                },    
                xtype: 'toolbar',
                docked: 'left',
                ui:'light',
                id:'leftButton',
                items:[{
                    text: '<',
                    handler:function()
                    {
                        Ext.getCmp("leftButton").hide();
                    }
                }]    
            },{
                xtype: 'toolbar',
                docked: 'right',
                ui:'light',
                items:[{
                    text: '>',
                    handler:function()
                    {
                        Ext.getCmp("leftButton").show();
                    }                    
                }]    
            }]            
        });
    } 
});