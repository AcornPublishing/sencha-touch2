Ext.ns("detail");

detail.init() = function()
{
	detail.panel = new Ext.create('Ext.Panel',{
	    fullscreen: true,
	    layout:{
	        type:'vbox',
	    },
	    id: 'content',
	    items: [{
	        xtype: 'toolbar',
	        docked: 'top',
	        title:'Proxy 시작',
	    },
	    galleryList]
	});
}