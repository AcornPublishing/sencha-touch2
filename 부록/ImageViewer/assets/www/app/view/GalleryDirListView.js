Ext.define("Gallery.view.GalleryDirListView", {
    extend: 'Ext.Panel',   
    xtype:'gallerydirlistview',
	fullscreen:true,
	config:{
        fullscreen: true,
        layout:{
            type:'vbox',
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title:'Sencha Comic Viewer',
        }]
    }
});


