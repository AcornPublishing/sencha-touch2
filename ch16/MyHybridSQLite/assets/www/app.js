Ext.ns("main");

Ext.require('Ext.form.Panel');
Ext.require('Ext.form.FieldSet');
Ext.require('Ext.data.Store');
Ext.require('Ext.List');
Ext.require('Ext.Carousel');
Ext.require('Ext.Toolbar');
Ext.require('Ext.field.Text');

Ext.application({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    requires:[
    	'reg',
    	'search',
    	'result',
    	'list'],    
    launch: function() {
		Ext.require('hybrid');
        main.init();
        reg.init();
        list.init();
        main.MainPanel.setActiveItem(reg.panel_reg);
    }
});

main.init = function()
{
    main.MainPanel = new Ext.create('Ext.Panel',{
        fullscreen: true,
        id:'MainPanel',

        layout:{
        	type:'card',
        	 cardSwitchAnimation:"slide",          
        },
        items :[{
            docked: 'bottom',
            xtype: 'toolbar',
 		layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },            
            items: [
           
            { 
                cls:'login',
                iconMask: true,
                iconAlign:'top',
                iconCls: 'user', 
                text: 'Reg' ,
                handler: function(btn,event){
                    main.MainPanel.setActiveItem(reg.panel_reg); 
                }               
            },
            {   
                cls:'Search',
                iconMask: true,
                iconCls: 'search', 
                iconAlign:'top',
                text: 'Search' ,
                handler: function(btn,event){
                   
                    main.MainPanel.setActiveItem(list.panel_list);    
                }
            }]
        },
        {
            docked: 'top',
            xtype: 'toolbar',
            title: 'SQLite Hybrid',
        }], 
    }); 
}