Ext.define("Gallery.view.GalleryDetailCarousel", {
    extend: 'Ext.Carousel',   
    xtype:'gallerydetailcarousel',     
	config:{
        // 화면의 상하단 버튼을 확인
        flex:1,
        defaults: {
            cls: 'card'
        },
        indicator:false,	
        items:[]
	}
});
