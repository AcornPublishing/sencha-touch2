Ext.define("Gallery.view.GalleryDetailCard", {
    extend:'Ext.Panel',
    xtype:'gallerydetailcard',
    galleryid:'0',
    subject:'',
    content:'',
    img:'', 
    setImgCls:false,
    config:{
	    height:'100%',
	    width:'100%',
	    scrollable:{
	    	direction:'vertical',
	    	directionLock:true,
	    },
		layout:{
			xtype:'vbox',
		},
	},
    setPage:function(id, subject, content, img)
    {    
        this.galleryid  = id;
        this.subject = subject;
        this.content = content;
        this.img = img;
        this.setHtml('<img width="100%" src="' + this.img + '">');
        this.setImgCls = true;        
    },
    
    // �̹��� ����
    setImg:function()
    {
    },
    // �̹��� ����
    releaseImg:function()
    {
    }, 
    
    // �ʱ�ȭ
    initialize:function(){
        this.img='';
        this.setImgCls = false;
        this.flex = 1,
        this.layout = {
          type: 'vbox',
          align:'stretch',
        };
        this.callParent();
    }   
});
