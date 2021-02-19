Ext.define("Gallery.view.GalleryList", {
    extend: 'Ext.List',   
    xtype:'gallerylist',
    
    config:{
        scrollable:true,
        flex:1,
        itemTpl:'<div><img src="./img/{img}" height="50"><strong>{id} {subject}</strong></div>',
        onItemDisclosure:true,
    }
});