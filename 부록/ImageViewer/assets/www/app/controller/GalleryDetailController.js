Ext.define('Gallery.controller.GalleryDetailController', {
    extend: 'Ext.app.Controller',
    xtype:'gallerydetailcontroller',
    name:'GalleryDetailController',
    requires:[
        'Ext.Ajax',
        'Ext.Anim',
        'Gallery.view.GalleryDetailCard',
        'Gallery.common.GalleryData'
    ],
    config: {
    	// ������ü�� �����Ѵ�.
        refs: {
            galleryListView:        'gallerylistview',
            galleryDetailView:      'gallerydetailview',
            galleryDetailCard:      'gallerydetailcard',
            galleryDetailCardPop:   'gallerydetailcardpop',
            galleryDetailCarousel:  'gallerydetailview [name=gallerydetailcarousel]',
            subjectToolbar :        'gallerydetailview [name=subjectToolbar]',
            backList :              'gallerydetailview [name=backList]',
            chgSize:                'gallerydetailview [name=chgSize]',
            popLeft:                'gallerydetailcardpop [name=popLeft]',
            popClose:               'gallerydetailcardpop [name=popClose]',
            popSizeA:               'gallerydetailcardpop [name=popSizeA]',
            popSizeM:               'gallerydetailcardpop [name=popSizeM]',
            popRotate:              'gallerydetailcardpop [name=popRotate]',
            popRight:               'gallerydetailcardpop [name=popRight]',
        },
        // ������ü�� �̺�Ʈ�� ������.
        control: {
        	// viewport�κ��� ȭ���� ���μ��� ��ȯ�� �����Ͽ� �̺�Ʈ�� ó����.
        	viewport:{
        		orientationchange: 'onOrien'
        	},        
            galleryDetailCarousel: {
                activeitemchange: 'onCarouselChange'
            },
            backList:{
                tap:'onBackList'
            },
            chgSize:{
            	tap:'onChgSize'
            },
            popLeft:{
            	tap:'onPopLeft'
            },
            popClose:{
            	tap:'onPopClose'
            },
            popSizeA:{
            	tap:'onPopSizeA'
            },
            popSizeM:{
            	tap:'onPopSizeM'
            },
            popRotate:{
            	tap:'onPopRotate'
            },
            popRight:{
            	tap:'onPopRight'
            },
        }
    },
    // �������
    currPageNum:0,
    carouselAdded:0,  
    imgDraw:false,  
    panelPop:'',
    popState:0,
    launch: function() {
    },
	// ���μ��ΰ� ����� ��� �ð��� �����Ѵ�. 
    onOrien:function(viewport, orientation, width, height){
    	if(orientation == 'portrait')
    	{
    		var strtTime = new Date().getTime();
    		for(var i=0;i<10000; i++)
    		{
    			var endTime= new Date().getTime(); 
    		    if((endTime - strtTime) > 500)
    		    {
    		    	break;
    		    }
    		}
    	}   	
    },   
    // ���ϸ�Ͽ��� ��ȭ���� ȣ��ɶ� �޼ҵ� 
    setPage:function(cpage){
        this.currPageNum = cpage;        
        this.setDataPos('first');           
    },
    // �����÷������� ���� ����� ������.
    callServer:function(inputPage)
    {
        var tempThis= this;
        var startNum = (inputPage-1)* 10;
        var lastNum = startNum + 10;
		if(startNum > Gallery.common.GalleryData.totData.length)
		{
			this.currPageNum = this.currPageNum - 1;
			alert('���̻� �����Ͱ� �����ϴ�.');
			return;     
		}
        if( Gallery.common.GalleryData.totData.length < lastNum )
        {
        	lastNum = Gallery.common.GalleryData.totData.length;
        }    
        var tempArray = Array (lastNum-startNum);
        var j=0;
        for(i = startNum; i< lastNum; i++)
        {
        	tempArray[j] =  Gallery.common.GalleryData.totData[i];
        	j++;
        }
        this.addProxyData(tempArray);
    },
    // ��ȭ�����====================================
    // ��ȭ��(����Ʈ ��ȸ����) Ŭ���Ͽ��� ��� �����ִ� ���� ȭ���� ��ġ        
    setDataPos:function(val)
    {
        if(val=='first')
        {
            for(i= this.getGalleryDetailCarousel().getItems().length-1; i >= this.carouselAdded;i--)
            {                   
                this.getGalleryDetailCarousel().removeAt(i);
            }
        }       
        var start_i = Gallery.common.GalleryData.minDataPos;
        if(start_i< 0)
            start_i=0;
        for(i = start_i; i< Gallery.common.GalleryData.maxDataPos;i++)
        {
            try{ this.addArt(Gallery.common.GalleryData.orgData[i]); }catch(e){ console.log('��������'); }
        }
        this.getGalleryDetailCarousel().setActiveItem(  Gallery.common.GalleryData.curDataPos - start_i);
        this.getGalleryDetailView().imgDraw = true;
        // ù��° ȣ���ϰ�� 
        if(val=='first')
        {
            console.log('ù��°��ġ ');
            var firstPos = Gallery.common.GalleryData.curDataPos - Gallery.common.GalleryData.minDataPos;
            if(firstPos < 0)
                firstPos = 0;
            var detailCard = this.getGalleryDetailCarousel().getAt(firstPos + this.carouselAdded);
            this.getSubjectToolbar().setTitle(detailCard.subject);
            try
            {
                Gallery.common.GalleryData.curId = detailCard.galleryid;
            }
            catch(e){}
        }
    },
    // ������ �����͹ޱ��̺�Ʈ 
    addProxyData:function(result)
    {
        if(result == null){
        }   
        else
        {   
            if( Gallery.common.GalleryData.maxDataPos>= 30)
            {         
                for(i=0;i<10;i++)
                {
                    this.getGalleryDetailCarousel().removeAt(0 + this.carouselAdded);
                }
            }  
            this.addProxyDataSub(result);      
        }
    },
    // addProxyData�κ��� ȣ���
    addProxyDataSub:function(result)
    {
        var temp = Gallery.common.GalleryData.maxDataPos;
        for(i = 0; i< result.length; i++)
        {
            Gallery.common.GalleryData.orgData.push(result[i]);
        }
        Gallery.common.GalleryData.maxDataPos = Gallery.common.GalleryData.maxDataPos + 10;
        Gallery.common.GalleryData.minDataPos = Gallery.common.GalleryData.maxDataPos - 30;
        if(Gallery.common.GalleryData.maxDataPos > Gallery.common.GalleryData.totDataPos)
        {
            Gallery.common.GalleryData.totDataPos = Gallery.common.GalleryData.maxDataPos;
        }
        for(i = 0; i< result.length; i++)
        {           	       
            this.addArt(result[i]);
        }
        if(temp >= 30)
        {
        	this.getGalleryDetailCarousel().setActiveItem(19);   
        }
    },
    // �����͸� �߰���
    addData:function(result)
    {
        for(i = 0; i< result.length; i++)
        {           
            this.addArt(result[i]);
        }           
    },   
    // �����͸� ������           
    insertData:function(result)
    {
        for(i = 9; i>=0; i--)
        {           
            this.insertArt(result[i]);
        }           
    },    
    // Ŀ�ο���ȭ��====================================    
    onCarouselChange:function( a, index1,index2){
    	console.log('��������.' + index1 + "." + index2);
        if(this.getGalleryDetailView().imgDraw == true)
        {
            // ȭ�鰻��
            var curIndex = Number(this.getGalleryDetailCarousel().getActiveIndex());
            {
                {
                    // �������� �����϶� Title����
                    var detailCard = 
                    	this.getGalleryDetailCarousel().getAt(curIndex+this.carouselAdded);  
                    Gallery.common.GalleryData.curId = detailCard.galleryid;
                    // Ÿ��Ʋ�� ���� (������ ũ�� �� ��������)
                    this.getSubjectToolbar().setTitle(detailCard.subject);
                }
            }
            // ���������� �̵�
            if(curIndex ==  this.getGalleryDetailCarousel().getItems().length-1-this.carouselAdded)
            {
                // ���� MAX������ ū ���� ������ ��� �����κ��� �����͸� ��û��.
                if(Gallery.common.GalleryData.maxDataPos >= Gallery.common.GalleryData.totDataPos)
                {
                    this.currPageNum = this.currPageNum+1;
                    this.callServer(this.currPageNum);
                }
                else
                {
                    // ������ġ���� �۰� 30�� �̻��� ��� �̹� �ҷ��� 10���� ����Ʈ�� �߰���.
                    if( Gallery.common.GalleryData.maxDataPos>= 30)
                    {
                        for(i=0;i<10;i++)
                        {
                            this.getGalleryDetailCarousel().removeAt(0 + this.carouselAdded);
                        }
                        var result = new Array(0);
                        for(i= Gallery.common.GalleryData.maxDataPos; 
                        	i< Gallery.common.GalleryData.maxDataPos+10;
                        	i++)
                        {
                            result.push(Gallery.common.GalleryData.orgData[i]);
                        }
                        Gallery.common.GalleryData.maxDataPos = Gallery.common.GalleryData.maxDataPos+10;                               
                        Gallery.common.GalleryData.minDataPos = Gallery.common.GalleryData.maxDataPos-30;
                        this.addData(result);
                    }                           
                }
            }
            else if(curIndex == 0)
            {
                // �� �������� ���� ��� 
                console.log("�������� �̵�");
                if(Gallery.common.GalleryData.maxDataPos > 30)
                {
                    // 30�� �̻��� ���� ��� ������ 10���� ����� ���� 10���� �߰���.
                    for(i=9; i>=0;i--)
                    {
                        this.getGalleryDetailCarousel().removeAt(i + 20 + this.carouselAdded);
                    }
                    var result = new Array(0);
                    for(i= Gallery.common.GalleryData.maxDataPos-40; 
                    	i< Gallery.common.GalleryData.maxDataPos-30;
                    	i++)
                    {
                        result.push(Gallery.common.GalleryData.orgData[i]);
                    }
                    Gallery.common.GalleryData.maxDataPos = Gallery.common.GalleryData.maxDataPos-10;
                    Gallery.common.GalleryData.minDataPos = Gallery.common.GalleryData.maxDataPos-30;
                    this.insertData(result);
                    this.getGalleryDetailCarousel().setActiveItem(10);
                }
            }
        }
        if(this.popState == 1)
        {
        	this.pageRefresh();
        }
    },  
    // ��ȭ��(����Ʈ ��ȸ����) Ŭ���Ͽ��� ��� �����ִ� ���� ȭ���� ��ġ        
    setDetailDataPos:function(val)
    {
        if(val=='first')
        {
            for(i=this.getGalleryDetailCarousel().getItems().length-1; i>=this.carouselAdded;i--)
            {                   
                this.getGalleryDetailCarousel().removeAt(i);
            }
        }       
        var start_i = Gallery.common.GalleryData.minDataPos;
        if(start_i< 0)
            start_i=0;
        for(i = start_i; i< Gallery.common.GalleryData.maxDataPos;i++)
        {
            try{ this.addArt(Gallery.common.GalleryData.orgData[i]); }catch(e){}
        }
        // �������� �̵���Ų��.
        this.getGalleryDetailCarousel().setActiveItem(  Gallery.common.GalleryData.curDataPos - start_i);
        this.getGalleryDetailView().imgDraw = true;
        // ù��° ȣ���ϰ�� 
        if(val=='first')
        {
            var firstPos = Gallery.common.GalleryData.curDataPos - Gallery.common.GalleryData.minDataPos;
            if(firstPos < 0)
                firstPos = 0;
            var detailCard = this.getGalleryDetailCarousel().getAt(firstPos+this.carouselAdded);
            try
            {
                Gallery.common.GalleryData.curId = detailCard.galleryid;
            }
            catch(e){ console.log('��������' ); }
        }
    },
	// GalleryDetailCard�� �̹����� ������ Carousel�� �߰���
    addArt:function(photodata){
        var detailCard = new Ext.create('Gallery.view.GalleryDetailCard');
        detailCard.setPage( photodata.id, 
                            photodata.subject, 
                            photodata.content,
                            photodata.img);  
        this.getGalleryDetailCarousel().add(detailCard);
    },
    // ���ʿ� CardDetailCard�� �߰���
    insertArt:function(photodata) { 
        var detailCard = new Ext.create('Gallery.view.GalleryDetailCard');
        detailCard.setPage( photodata.id, 
                            photodata.subject, 
                            photodata.content,
                            photodata.img);  
        this.getGalleryDetailCarousel().insert(0 + this.carouselAdded, detailCard);
    },
    // ���ϸ������ ���ư�.
    onBackList:function()
    {
        Gallery.common.GalleryData.curDataPos = 
        	Number(this.getGalleryDetailCarousel().getActiveIndex()) + 
        	Gallery.common.GalleryData.minDataPos;
        this.getGalleryDetailView().hide();
        this.getGalleryListView().show();   
        this.getApplication().getController('GalleryController').returnAddMsg(this.currPageNum);    
    },     
    // ��Ȯ��â���� �̵�
    onChgSize:function()
    {
        this.getGalleryDetailView().hide();
        this.getGalleryDetailCardPop().show();   
		this.popState = 1;
		this.pageRefresh();
    },   
    // Ȯ��â���� �����̹����� ����
    onPopLeft:function()
    {
        this.getGalleryDetailCarousel().previous();
    },
    // Ȯ��â�� ����        
    onPopClose:function()
    {
    	this.popState = 0;
        this.getGalleryDetailCardPop().hide();
        this.getGalleryDetailView().show();
    },  
    // Ȯ��â���� ũ�⸦ �ø�      
    onPopSizeA:function()
    {
    	Gallery.common.GalleryData.curDataPos = 
    		Number(this.getGalleryDetailCarousel().getActiveIndex()) + 
    		Gallery.common.GalleryData.minDataPos;
    	Gallery.common.GalleryData.popSize  = Gallery.common.GalleryData.popSize + 10; 
		this.pageRefresh();
    },        
    // Ȯ��â���� ũ�⸦ ����
    onPopSizeM:function()
    {
    	Gallery.common.GalleryData.curDataPos = 
    		Number(this.getGalleryDetailCarousel().getActiveIndex()) + 
    		Gallery.common.GalleryData.minDataPos;
    	Gallery.common.GalleryData.popSize  = Gallery.common.GalleryData.popSize - 10; 
		this.pageRefresh();
    },   
    // Ȯ��â �̹����� ȸ����Ų (�̻��)     
    onPopRotate:function()
    {
        if(Gallery.common.GalleryData.popRotate == "rotate0")
        	Gallery.common.GalleryData.popRotate = "rotate90";
        else if(Gallery.common.GalleryData.popRotate == "rotate90")
        	Gallery.common.GalleryData.popRotate = "rotate180";
        else if(Gallery.common.GalleryData.popRotate == "rotate180")
        	Gallery.common.GalleryData.popRotate = "rotate270"
        else if(Gallery.common.GalleryData.popRotate == "rotate270")
        	Gallery.common.GalleryData.popRotate = "rotate0";
		this.pageRefresh();
    },     
    // Ȯ��â �̹����� ������ �̹����� ��ü   
    onPopRight:function()
    {
        this.getGalleryDetailCarousel().next();
    },
    // Ȯ��â�� ������ ���� �� ȭ���� ������        
	pageRefresh:function()
	{
    	Gallery.common.GalleryData.curDataPos = 
    		Number(this.getGalleryDetailCarousel().getActiveIndex()) + 
    		Gallery.common.GalleryData.minDataPos;
		this.getGalleryDetailCardPop().setPage(
			Gallery.common.GalleryData.orgData[Gallery.common.GalleryData.curDataPos].id, 
			Gallery.common.GalleryData.orgData[Gallery.common.GalleryData.curDataPos].subject, 
			Gallery.common.GalleryData.orgData[Gallery.common.GalleryData.curDataPos].content, 
			Gallery.common.GalleryData.orgData[Gallery.common.GalleryData.curDataPos].img,
			Gallery.common.GalleryData.popSize,
			Gallery.common.GalleryData.popRotate,
			window.screen.width);
	}
});