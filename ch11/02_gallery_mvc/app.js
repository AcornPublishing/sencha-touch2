Ext.application({
    name: 'Gallery',
    models: ['GalleryModel'],
    stores: ['GalleryStore'],
    controllers:['GalleryController', 'GalleryDetailController' ],
    views: ['GalleryListView', 
    		'GalleryList',     		
    		'GalleryDetailView', 
    		'GalleryDetailCard', 
    		'GalleryDetailCarousel'],
    launch: function() {       
    	var panel = Ext.create('Gallery.view.GalleryListView');
    	Ext.Viewport.add(panel);   
    	var panelList = Ext.create('Gallery.view.GalleryList');
    	panelList.setStore(Ext.getStore('GalleryStore'));
    	panel.add(panelList);
    	
    	panelDetail = Ext.create('Gallery.view.GalleryDetailView');
    	//panelDetailCarousel = Ext.create('Gallery.view.GalleryDetailCarousel');
    	//panelDetail.add(panelDetailCarousel);      	
		
		//Ext.Viewport.add(panelDetail);   
		
		panelDetail.hide();
		
		console.log(panelList);
		//console.log(this.getGalleryList());
		console.log('======================================');
		//console.log(this.getGalleryDetailCarousel());
		//console.log(panelList.getScrollable());
    }
});