Ext.define("Gallery.view.GalleryDetailCarousel", {
    extend: 'Ext.Carousel',   
    xtype:'gallerydetailcarousel',     
	config:{
        // ȭ���� ���ϴ� ��ư�� Ȯ��
        flex:1,
        defaults: {
            cls: 'card'
        },
        indicator:false,	
        items:[]
	}
});
