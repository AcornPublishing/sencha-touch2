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
    	// 참조개체를 정의한다.
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
        // 참조개체의 이벤트를 정의함.
        control: {
        	// viewport로부터 화면의 가로세로 변환을 감지하여 이벤트를 처리함.
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
    // 멤버변수
    currPageNum:0,
    carouselAdded:0,  
    imgDraw:false,  
    panelPop:'',
    popState:0,
    launch: function() {
    },
	// 가로세로가 변경될 경우 시간을 지연한다. 
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
    // 파일목록에서 상세화면이 호출될때 메소드 
    setPage:function(cpage){
        this.currPageNum = cpage;        
        this.setDataPos('first');           
    },
    // 폰갭플러그인을 통해 목록을 가져옴.
    callServer:function(inputPage)
    {
        var tempThis= this;
        var startNum = (inputPage-1)* 10;
        var lastNum = startNum + 10;
		if(startNum > Gallery.common.GalleryData.totData.length)
		{
			this.currPageNum = this.currPageNum - 1;
			alert('더이상 데이터가 없습니다.');
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
    // 상세화면관련====================================
    // 앞화면(리스트 조회에서) 클릭하였을 경우 보여주는 현재 화면의 위치        
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
            try{ this.addArt(Gallery.common.GalleryData.orgData[i]); }catch(e){ console.log('오류무시'); }
        }
        this.getGalleryDetailCarousel().setActiveItem(  Gallery.common.GalleryData.curDataPos - start_i);
        this.getGalleryDetailView().imgDraw = true;
        // 첫번째 호출일경우 
        if(val=='first')
        {
            console.log('첫번째위치 ');
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
    // 가져온 데이터받기이벤트 
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
    // addProxyData로부터 호출됨
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
    // 데이터를 추가함
    addData:function(result)
    {
        for(i = 0; i< result.length; i++)
        {           
            this.addArt(result[i]);
        }           
    },   
    // 데이터를 삽입함           
    insertData:function(result)
    {
        for(i = 9; i>=0; i--)
        {           
            this.insertArt(result[i]);
        }           
    },    
    // 커로우절화면====================================    
    onCarouselChange:function( a, index1,index2){
    	console.log('움직였다.' + index1 + "." + index2);
        if(this.getGalleryDetailView().imgDraw == true)
        {
            // 화면갱신
            var curIndex = Number(this.getGalleryDetailCarousel().getActiveIndex());
            {
                {
                    // 페이지가 움직일때 Title설정
                    var detailCard = 
                    	this.getGalleryDetailCarousel().getAt(curIndex+this.carouselAdded);  
                    Gallery.common.GalleryData.curId = detailCard.galleryid;
                    // 타이틀바 설정 (적절히 크기 등 수정요함)
                    this.getSubjectToolbar().setTitle(detailCard.subject);
                }
            }
            // 오른쪽으로 이동
            if(curIndex ==  this.getGalleryDetailCarousel().getItems().length-1-this.carouselAdded)
            {
                // 현재 MAX값보다 큰 값을 가져올 경우 서버로부터 데이터를 요청함.
                if(Gallery.common.GalleryData.maxDataPos >= Gallery.common.GalleryData.totDataPos)
                {
                    this.currPageNum = this.currPageNum+1;
                    this.callServer(this.currPageNum);
                }
                else
                {
                    // 현재위치보다 작고 30건 이상일 경우 이미 불러온 10건을 리스트에 추가함.
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
                // 맨 왼쪽으로 왔을 경우 
                console.log("왼쪽으로 이동");
                if(Gallery.common.GalleryData.maxDataPos > 30)
                {
                    // 30건 이상이 있을 경우 오른쪽 10건을 지우고 왼쪽 10건을 추가함.
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
    // 앞화면(리스트 조회에서) 클릭하였을 경우 보여주는 현재 화면의 위치        
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
        // 페이지를 이동시킨다.
        this.getGalleryDetailCarousel().setActiveItem(  Gallery.common.GalleryData.curDataPos - start_i);
        this.getGalleryDetailView().imgDraw = true;
        // 첫번째 호출일경우 
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
            catch(e){ console.log('에러무시' ); }
        }
    },
	// GalleryDetailCard에 이미지를 넣은뒤 Carousel에 추가함
    addArt:function(photodata){
        var detailCard = new Ext.create('Gallery.view.GalleryDetailCard');
        detailCard.setPage( photodata.id, 
                            photodata.subject, 
                            photodata.content,
                            photodata.img);  
        this.getGalleryDetailCarousel().add(detailCard);
    },
    // 앞쪽에 CardDetailCard를 추가함
    insertArt:function(photodata) { 
        var detailCard = new Ext.create('Gallery.view.GalleryDetailCard');
        detailCard.setPage( photodata.id, 
                            photodata.subject, 
                            photodata.content,
                            photodata.img);  
        this.getGalleryDetailCarousel().insert(0 + this.carouselAdded, detailCard);
    },
    // 파일목록으로 돌아감.
    onBackList:function()
    {
        Gallery.common.GalleryData.curDataPos = 
        	Number(this.getGalleryDetailCarousel().getActiveIndex()) + 
        	Gallery.common.GalleryData.minDataPos;
        this.getGalleryDetailView().hide();
        this.getGalleryListView().show();   
        this.getApplication().getController('GalleryController').returnAddMsg(this.currPageNum);    
    },     
    // 상세확대창으로 이동
    onChgSize:function()
    {
        this.getGalleryDetailView().hide();
        this.getGalleryDetailCardPop().show();   
		this.popState = 1;
		this.pageRefresh();
    },   
    // 확대창에서 왼쪽이미지로 변경
    onPopLeft:function()
    {
        this.getGalleryDetailCarousel().previous();
    },
    // 확대창을 닫음        
    onPopClose:function()
    {
    	this.popState = 0;
        this.getGalleryDetailCardPop().hide();
        this.getGalleryDetailView().show();
    },  
    // 확대창에서 크기를 늘림      
    onPopSizeA:function()
    {
    	Gallery.common.GalleryData.curDataPos = 
    		Number(this.getGalleryDetailCarousel().getActiveIndex()) + 
    		Gallery.common.GalleryData.minDataPos;
    	Gallery.common.GalleryData.popSize  = Gallery.common.GalleryData.popSize + 10; 
		this.pageRefresh();
    },        
    // 확대창에서 크기를 줄임
    onPopSizeM:function()
    {
    	Gallery.common.GalleryData.curDataPos = 
    		Number(this.getGalleryDetailCarousel().getActiveIndex()) + 
    		Gallery.common.GalleryData.minDataPos;
    	Gallery.common.GalleryData.popSize  = Gallery.common.GalleryData.popSize - 10; 
		this.pageRefresh();
    },   
    // 확대창 이미지를 회전시킨 (미사용)     
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
    // 확대창 이미지를 오른쪽 이미지로 대체   
    onPopRight:function()
    {
        this.getGalleryDetailCarousel().next();
    },
    // 확대창의 조작이 있은 후 화면을 갱신함        
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