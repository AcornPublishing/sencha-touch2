Ext.define("Gallery.view.GalleryList", {
    extend: 'Ext.List',   
    xtype:'gallerylist',
    
    config:{
        scrollable:true,
        flex:1,
        onItemDisclosure:false,
        itemTpl:'<div><img src="{img}" height="50"><font size="2" color="green">{subject}</font></div>',
    }
});