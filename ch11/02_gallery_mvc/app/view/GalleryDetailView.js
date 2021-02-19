Ext.define("Gallery.view.GalleryDetailView", {
    extend: 'Ext.Panel',   
    xtype:'gallerydetailview',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Gallery.view.GalleryDetailCarousel'
        ],      
    config:{
        fullscreen: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
        },
        items:[
        {
            name:'subjectToolbar',
            xtype: 'toolbar',       
            docked: 'top',     
            title:'title',               
            layout: {
                type:'hbox',
                align: 'stretch'
            },
            items:[
            {
                html:'list',
                name:'backList',
                docked:'left',
            }]
        },        
        {
            xtype:'gallerydetailcarousel', //gallerydetail.carousel
            name:'gallerydetailcarousel',
            flex:1,
        }], 
    }
});
