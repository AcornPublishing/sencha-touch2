Ext.define("Gallery.view.GalleryListView", {
    extend: 'Ext.Panel',   
    xtype:'gallerylistview',
	fullscreen:true,
	config:{
        fullscreen: true,
        layout:{
            type:'vbox',
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title:'°¶·¯¸®',
        }]
    }
});


