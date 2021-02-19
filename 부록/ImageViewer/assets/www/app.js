
Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.application({
    name: 'Gallery',
    models: ['GalleryModel', 'GalleryDirModel'],
    stores: ['GalleryStore', 'GalleryDirStore'],
    controllers:['GalleryController', 'GalleryDetailController' ],
    views: ['GalleryDirListView', 
    		'GalleryDirList',
            'GalleryListView', 
    		'GalleryList',     		
    		'GalleryDetailView', 
    		'GalleryDetailCard', 
    		'GalleryDetailCarousel',
    		'GalleryDetailCardPop'],
    launch: function() {       
    	var panelDir = Ext.create('Gallery.view.GalleryDirListView');
    	var panelDirList = Ext.create('Gallery.view.GalleryDirList');
    	panelDir.setHtml('Analyzing File System ...');
    	panelDir.add(panelDirList);
    	Ext.Viewport.add(panelDir);   

    	var panel = Ext.create('Gallery.view.GalleryListView');
    	var panelList = Ext.create('Gallery.view.GalleryList');
    	
    	Ext.Viewport.add(panel);
    	   
    	panelList.setStore(Ext.getStore('GalleryStore'));
    	panel.add(panelList);
    	panel.hide();

    	panelDetail = Ext.create('Gallery.view.GalleryDetailView');
    	Ext.Viewport.add(panelDetail);
		panelDetail.hide();

		panelDetailPop = Ext.create('Gallery.view.GalleryDetailCardPop');
    	Ext.Viewport.add(panelDetailPop);
		panelDetailPop.hide();		
    }
});