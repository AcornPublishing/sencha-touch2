Ext.define("Gallery.view.GalleryDirList", {
    extend: 'Ext.List',   
    xtype:'gallerydirlist',
    id:'gallerydirlistid',
    config:{
        scrollable:true,
        flex:1,
        onItemDisclosure:false,
        itemTpl:'<div><img src="{img0}" height="50" width="50"><img src="{img1}" height="50"  width="50"><img src="{img2}" height="50"  width="50"><BR><font size="2" color="green">{path}</font></div>',
    }
});