Ext.define('gallerycard', {
    extend:'Ext.Panel',
    xtype:'gallerydetailcard',
    requires:'Ext.Panel',   
    name:this,

	galleryid:'0',
	subject:'',
	content:'',
	img:'',
	setImgCls:false,

    setPage:function(id, subject, content, img)
    {    
    	this.galleryid  = id;
    	this.subject = subject;
    	this.content = content;
    	this.img = img;
    },
    
    // 이미지 설정
    setImg:function()
    {
        if( this.setImgCls == false)
        {

            this.element.setStyle({'backgroundImage':'url("./img/' + this.img + '")'});
            
            this.setImgCls = true;
        }
    },
    
    // 이미지 해제
    releaseImg:function()
    {
        this.setImgCls = false;
    }, 
    
    // 초기화
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