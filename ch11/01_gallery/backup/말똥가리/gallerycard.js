//----------------------------------
// 수상내역의 상세화면의 한장
//----------------------------------

Ext.define('gallerycard', {
    extend:'Ext.Panel',
    xtype:'awarddetailcard',
    requires:'Ext.Panel',
    alias:'awarddetailcard',
    name:this,

	id:'0',
	subject:'',
	content:'',
	img:'',
	setImgCls:false,

    setPage:function(id, subject, content, img)
    {    
    	this.id  = id;
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