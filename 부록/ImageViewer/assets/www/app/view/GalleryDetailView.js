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
            height:40, 
            docked: 'top',     
            title:'Detail',               
            layout: {
                type:'hbox',
                align: 'stretch'
            },
            items:[
            {
                html:'<img src="./img/folder_black_open.png" height="30">',
                name:'backList',
                docked:'left',
            },
            {
            	xtype:'spacer',
            },
			{
                html:'<img src="./img/search1.png" height="30">',
                name:'chgSize',
                docked:'right',
            }]
        },        
        {
            xtype:'gallerydetailcarousel', //gallerydetail.carousel
            name:'gallerydetailcarousel',
            flex:1,
        }], 
    }
});
