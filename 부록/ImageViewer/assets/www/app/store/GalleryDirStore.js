Ext.define('Gallery.store.GalleryDirStore', {
    extend  : 'Ext.data.Store',    
    requires: ['Gallery.model.GalleryDirModel'],
    config:{
    	model:'Gallery.model.GalleryDirModel',
	    autoLoad:true,            
	}
});

