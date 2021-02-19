
Ext.define('Gallery.controller.GalleryDetailController', {
    extend: 'Ext.app.Controller',

    xtype:'gallerydetailcontroller',
    name:'GalleryDetailController',
    requires:[
        'Ext.Ajax',
        'Gallery.view.GalleryDetailCard',
        'Gallery.common.GalleryData'
    ],
    config: {
        refs: {
            galleryListView:        'gallerylistview',
            galleryDetailView:      'gallerydetailview',
            galleryDetailCard:      'gallerydetailcard',
            galleryDetailCarousel:  'gallerydetailview [name=gallerydetailcarousel]',
            subjectToolbar :        'gallerydetailview [name=subjectToolbar]',
            backList :              'gallerydetailview [name=backList]',
        },
        control: {
            galleryDetailCarousel: {
                activeitemchange: 'onCarouselChange'
            },
            backList:{
                tap:'onBackList'
            }
        }
    },
    currPageNum:0,
    carouselAdded:1,  
    imgDraw:false,  
    launch: function() {
    },
    setPage:function(cpage){
        this.currPageNum = cpage;
        this.setDataPos('first');           
    },
    callServer:function(inputPage)
    {
        var tempThis = this;
        console.log("조회페이지:" + inputPage);
        Ext.Ajax.request({
            url: './jsp/imglist.jsp',
            params:{
                pageNum:inputPage,
            },
            success: function(response, opts) {
                var JsonData = Ext.decode(response.responseText);
                
                if(JsonData.data.err != '')
                {
                    alert(JsonData.data.err);
                    return;
                }
                if(JsonData.data.imglist.legnth ==0)
                {
                    alert('데이터 없음');
                    return;
                }
                console.log(response.responseText);
                console.log('서버로부터 온데이터 ---------------------------');
                console.log(JsonData.imglist);
                
                tempThis.addProxyData(JsonData.data.imglist);
            },
            fail:function()
            {
                alert('서버장애');
            }
        });  
    },

    // 상세화면관련====================================
    // 앞화면(리스트 조회에서) 클릭하였을 경우 보여주는 현재 화면의 위치        
    setDataPos:function(val)
    {
        if(val=='first')
        {
            console.log('first in............');
            console.log(this.getGalleryDetailCarousel());
            for(i= this.getGalleryDetailCarousel().getItems().length-1; i >= this.carouselAdded;i--)
            {                   
                this.getGalleryDetailCarousel().removeAt(i);
            }
        }       
        var start_i = Gallery.common.GalleryData.minDataPos;
        if(start_i< 0)
            start_i=0;
        console.log('처음호출----------------------------');                
        for(i = start_i; i< Gallery.common.GalleryData.maxDataPos;i++)
        {
            console.log(Gallery.common.GalleryData.orgData[i]);
            //this.addArt(Gallery.common.GalleryData.orgData[i]);
            try{ this.addArt(Gallery.common.GalleryData.orgData[i]); }catch(e){ console.log('오류무시'); }
        }
        // 페이지를 이동시킨다.
        console.log('페이지이동');
        this.getGalleryDetailCarousel().setActiveItem(  Gallery.common.GalleryData.curDataPos - start_i);
        this.getGalleryDetailView().imgDraw = true;
        // 첫번째 호출일경우 
        if(val=='first')
        {
            console.log('첫번째위치 ');
            var firstPos = Gallery.common.GalleryData.curDataPos - Gallery.common.GalleryData.minDataPos;
            if(firstPos < 0)
                firstPos = 0;
                
            console.log('22222');
            var detailCard = this.getGalleryDetailCarousel().getAt(firstPos + this.carouselAdded);
            console.log('333333');
            try
            {
                Gallery.common.GalleryData.curId = detailCard.galleryid;
                detailCard.setImg();
            }
            catch(e){}
        }
    },
    addProxyData:function(result)
    {
        if(result == null)
        {
            // 마지막 페이지를 서버에서 null로 줌.
            //Ext.Msg.alert('확인', '데이터가 없습니다.', Ext.emptyFn);
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
    addProxyDataSub:function(result)
    {
        console.log('result-------------------------------------');
        console.log(result);
        for(i = 0; i< result.length; i++)
        {
            Gallery.common.GalleryData.orgData.push(result[i]);
        }
        Gallery.common.GalleryData.maxDataPos = Gallery.common.GalleryData.maxDataPos + 10;//result.length;
        Gallery.common.GalleryData.minDataPos = Gallery.common.GalleryData.maxDataPos - 30;
        if(Gallery.common.GalleryData.maxDataPos > Gallery.common.GalleryData.totDataPos)
        {
            Gallery.common.GalleryData.totDataPos = Gallery.common.GalleryData.maxDataPos;
        }
        for(i = 0; i< result.length; i++)
        {           
            this.addArt(result[i]);
        }
    },
    addData:function(result)
    {
        for(i = 0; i< result.length; i++)
        {           
            this.addArt(result[i]);
        }           
    },              
    insertData:function(result)
    {
        for(i = 9; i>=0; i--)
        {           
            insertArt(result[i]);
        }           
    },    
    // 커로우절화면====================================    
    onCarouselChange:function( a, index1,index2){
        if(this.getGalleryDetailView().imgDraw == true)
        {
            // 화면갱신
            var curIndex = Number(this.getGalleryDetailCarousel().getActiveIndex());
            // 현재, 좌, 우 화면의 이미지를 보여준다.                  
            {
                {
                    // 현재의카드를 기억함.
                    // 페이지가 움직일때 Title설정
                    var detailCard = this.getGalleryDetailCarousel().getAt(curIndex+this.carouselAdded);// getActiveItem();//(curIndex);  
                    Gallery.common.GalleryData.curId = detailCard.galleryid;

                    // 타이틀바 설정 (적절히 크기 등 수정요함)

                    //Ext.ComponentQuery.query('#subjectToolbar')[0].setTitle(detailCard.subject);
                    this.getSubjectToolbar().setTitle(detailCard.subject);
                    
                    // 현재 이미지를 설정한다.
                    detailCard.setImg();
                }
                if(curIndex !=0)
                {
                    // 좌 이미지설정
                    var detailCardBf = this.getGalleryDetailCarousel().getAt(curIndex-1 + this.carouselAdded);
                    detailCardBf.setImg();                          
                }
                if(curIndex != this.getGalleryDetailCarousel().getItems().length-1-this.carouselAdded)
                {
                    // 우 이미지설정
                    var detailCardAf = this.getGalleryDetailCarousel().getAt(curIndex+1+this.carouselAdded);
                    detailCardAf.setImg();
                }
            }
            
            // 오른쪽으로 이동
            if(curIndex ==  this.getGalleryDetailCarousel().getItems().length-1-this.carouselAdded)
            {
                // 서버로부터 데이터를 가져옴
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
                        for(i= Gallery.common.GalleryData.maxDataPos; i< Gallery.common.GalleryData.maxDataPos+10;i++)
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
                if(Gallery.common.GalleryData.maxDataPos > 30)
                {
                    // 30건 이상이 있을 경우 오른쪽 10건을 지우고 왼쪽 10건을 추가함.
                    for(i=9; i>=0;i--)
                    {
                        this.getGalleryDetailCarousel().removeAt(i + this.carouselAdded);
                    }
                    var result = new Array(0);
                    for(i= Gallery.common.GalleryData.maxDataPos-40; i< Gallery.common.GalleryData.maxDataPos-30;i++)
                    {
                        result.push(Gallery.common.GalleryData.orgData[i]);
                    }
                    Gallery.common.GalleryData.maxDataPos = Gallery.common.GalleryData.maxDataPos-10;
                    Gallery.common.GalleryData.minDataPos = Gallery.common.GalleryData.maxDataPos-30;
                    this.insertData(result);
                }
            }
        }
    },  
    
    // 상세화면 Panel ===================================================
    
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
        console.log('처음호출----------------------------');                
        for(i = start_i; i< Gallery.common.GalleryData.maxDataPos;i++)
        {
            console.log(Gallery.common.GalleryData.orgData[i]);
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
                detailCard.setImg();
            }
            catch(e){ console.log('에러무시' ); }
        }
    },

    addArt:function(photodata){
        console.log('--------------------');
        console.log(photodata);
        

        var detailCard = new Ext.create('Gallery.view.GalleryDetailCard');

        console.log("설정한 일련번호:" + photodata.id);

        detailCard.setPage( photodata.id, 
                            photodata.subject, 
                            photodata.content,
                            photodata.img);  

        console.log(this.getGalleryDetailCarousel());
        //this.getGalleryDetailCarousel().add(detailCard);
        
        this.getGalleryDetailCarousel().add(detailCard);

    },
    insertArt:function(photodata) { 

        var detailCard = new Ext.create('Gallery.view.GalleryDetailCard');

        detailCard.setPage( photodata.id, 
                            photodata.subject, 
                            photodata.content,
                            photodata.img);  
        
        this.getGalleryDetailCarousel().insert(0 + this.carouselAdded, detailCard);
    },
    onBackList:function()
    {
        Gallery.common.GalleryData.curDataPos = Number(this.getGalleryDetailCarousel().getActiveIndex()) + Gallery.common.GalleryData.minDataPos;
        this.getGalleryDetailView().hide();
        this.getGalleryListView().show();   
        this.getApplication().getController('GalleryController').returnAddMsg(this.currPageNum);    
    }     
    
});