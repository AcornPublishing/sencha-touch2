Ext.define("Gallery.view.GalleryDetailCardPop", {
    extend:'Ext.Panel',
    xtype:'gallerydetailcardpop',    
    galleryid:'0',
    subject:'',
    content:'',
    img:'', 
    popSize:'',
    popRotate:'',
    popState:0,
    setImgCls:false,
    config:{
	    fullscreen:true,
	    styleHtmlContent:true,
		layout:{
			xtype:'vbox',
		},	
		scrollable:{
			direction:'both',
			directionLock:true	
		},		
		html:'',
		items:[
		{
			xtype:'toolbar',
			docked:'top',
			height:40,
			items:[
			{
				xtype:'button',
				html:'<img src="./img/arrow_left.png" height="30">',	// ������ȯ
				name:'popLeft'
			},
			{
				xtype:'spacer'							
			},
			{
				xtype:'button',
				html:'<img src="./img/delete.png"  height="20">',	// ������
				name:'popClose'
			},
			{
				xtype:'button',
				html:'<img src="./img/minus1.png"  height="20">',	// ������
				name:'popSizeM'
			},
			{
				xtype:'button',
				html:'<img src="./img/add.png"  height="20">',	// ������
				name:'popSizeA'
			},
			{
				xtype:'spacer'							
			},
			{
				xtype:'button',
				html:'<img src="./img/arrow_right.png"  height="30">',	// ������ȯ
				name:'popRight'
			}]
		}],
	},
    setPage:function(id, subject, content, img, popSize, popRotate, panelWidth)
    {        	
        this.galleryid  = id;
        this.subject = subject;
        this.content = content;
        this.img = img;
        this.popSize = popSize;
        this.popRotate = popRotate;
		var imgElement = document.createElement("img");
		imgElement.src=this.img;
        var tempWidth = imgElement.width;
        var tempHeight = imgElement.height;
        var tempCalc = tempHeight/tempWidth;
        imgElement.width = window.screen.width * this.popSize * 0.01;
        imgElement.height = imgElement.width * tempCalc;
   		this.setHtml('<font size=2>' + subject + '</font><BR><img height="' + imgElement.height + 'px"  width="' + imgElement.width +   'px" src="' + this.img + '"> ');
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
        this.popSize='';
        this.popRotate='';
        this.setImgCls = false;
        this.flex = 1,
        this.layout = {
          type: 'vbox',
          align:'stretch',
        };
        this.callParent();        
    }   
});
