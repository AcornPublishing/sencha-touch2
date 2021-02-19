Ext.ns("list");

list.init = function(){
	search.init();
	result.init();
	list.carousel = new Ext.create('Ext.Carousel',{
	    defaults: {
	        cls: 'card'
	    },
	    flex:1,
	    items: [
	    	search.panel_search,
	    	result.panel_result
	    ]
	});
	
	list.panel_list = new Ext.create('Ext.Panel',{
        fullscreen: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'center',

        },
        
        defaults: {
            flex: 1
        },
        items: list.carousel
	});
}