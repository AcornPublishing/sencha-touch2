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
    
    // �̹��� ����
    setImg:function()
    {
        if( this.setImgCls == false)
        {

            this.element.setStyle({'backgroundImage':'url("./img/' + this.img + '")'});
            
            this.setImgCls = true;
        }
    },
    
    // �̹��� ����
    releaseImg:function()
    {
        this.setImgCls = false;
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