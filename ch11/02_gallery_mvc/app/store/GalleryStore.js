
Ext.define('Gallery.store.GalleryStore', {
    extend  : 'Ext.data.Store',    
    requires: ['Gallery.model.GalleryModel'],
    config:{
    	model:'Gallery.model.GalleryModel',
	    autoLoad:true,            
	}
});

