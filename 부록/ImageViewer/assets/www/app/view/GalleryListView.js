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
            height:40,
            title:'Commic Book',
            html:'',
            items:[
            {
            	xtype:'button',
            	name:'backmain',
            	html:'<img src="./img/home.png" height="25">',
            }]
        }]
    }
});


