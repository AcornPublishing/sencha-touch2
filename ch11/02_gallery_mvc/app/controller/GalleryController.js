
Ext.define('Gallery.controller.GalleryController', {
    extend: 'Ext.app.Controller',

    requires:[
        'Ext.Ajax',
        'Ext.scroll.Scroller',
        'Gallery.common.GalleryData',
    ],
    config: {
        
        refs: {
            galleryListView:    'gallerylistview',
            galleryList:        'gallerylist',
            galleryDetailView:  'gallerydetailview',
            
        },
        control: {
            galleryList: {
                itemtap: 'onItemTap'
            },
        }
    },
    
    // Carousel을 제어하기 위해 Carousel에 있는 컴포넌트의 개수를 미리 체크하여 제외하고 계산함.
    carouselAdded:1,
    itemHeight:0,
    currPageNum:1,
    maxPos:0,
    Scroller:'listScroller',
    
    launch: function() {

        
        listScroller = this.getGalleryList().getScrollable().getScroller();
        
                        
        //listScroller = panelList.getScrollable().getScroller();
        listScroller.on('scrollend', this.addScrollAfter, this);      
        listScroller.on('maxpositionchange', this.chgMaxPos, this);
        
        this.callServer(1);
    },  
    callServer:function(inputPage)
    {
        var tempThis= this;
        //console.log(this);
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
                console.log(this);
                tempThis.addProxyData(JsonData.data.imglist);
            },
            fail:function()
            {
                alert('서버장애');
            }
        });  
    },
      
    // 리스트패널 관련==================================
    addProxyData:function(result)
    {
        console.log("addProxyData----------------");
        console.log(result);
        if(result == null)
        {
            // 마지막 페이지를 서버에서 null로 줌.
        }
        else
        {
            if( Gallery.common.GalleryData.maxDataPos>= 30)
            {                   
                for(i=0;i<10;i++)
                {
                    Ext.getStore('GalleryStore').removeAt(0);
                }
                
            }  
            setTimeout(this.addProxyDataSub(result), 500);            
        }
    },
    addProxyDataSub:function(result)
    {
        console.log('addProxyDataSub-----------------------');
        console.log(result);
        for(i = 0; i< result.length; i++)
        {
            Gallery.common.GalleryData.orgData.push(result[i]);
        }
        console.log("1:" + result);
        Gallery.common.GalleryData.maxDataPos = Gallery.common.GalleryData.maxDataPos + 10;
        Gallery.common.GalleryData.minDataPos = Gallery.common.GalleryData.maxDataPos - 30;
        if(Gallery.common.GalleryData.minDataPos < 0)
        {
            Gallery.common.GalleryData.minDataPos = 0;
        }           
        if(Gallery.common.GalleryData.maxDataPos > Gallery.common.GalleryData.totDataPos)
        {
            Gallery.common.GalleryData.totDataPos = Gallery.common.GalleryData.maxDataPos;
        }
        console.log("2:" + result);
        Ext.getStore('GalleryStore').add(result);
        // 서버로부터 데이터를 받았을경우 데이터리스트가 가지고 있는 이미지 크기를 계산함(처음 한번만)
        if(this.itemHeight == 0)
        {
            //itemHeight = 200/2;   // CSS와 동일하게 처리 */
            try{ itemHeight =  this.getGalleryList().element.down('.x-list-item').getHeight(); }catch(e){}  
        }
        
        console.log("3:" + Gallery.common.GalleryData.maxDataPos);
        
        // 스크롤이 원위치로 찾아감(10건을 추가하였으니 반대로 10건 위로 올라감)
        if( Gallery.common.GalleryData.maxDataPos> 30)
        {
            listScroller.scrollBy(0,itemHeight * (-10) );               
        }
        this.getGalleryList().setStore(Ext.getStore('GalleryStore'));
    },
    addData:function(result)
    {
        console.log("addData----------------");
        console.log(result);
        
        Ext.getStore('GalleryStore').add(result);
        
       
        if( Gallery.common.GalleryData.maxDataPos> 30)
        {
            listScroller.scrollBy(0,itemHeight * (-10) );               
        }                                   
    },              
    insertData:function(result)
    {
        console.log("insertData----------------");
        console.log(result);
                    
        // 위로 올릴경우는 insert로 처리함
        Ext.getStore('GalleryStore').insert(0,result);
        listScroller.scrollBy(0,itemHeight * 10 );                  
    },
    // 상세화면에서 리턴되었을때 화면을 갱신함.
    returnAddMsg:function(cpage)
    {
        this.currPageNum = cpage;
        Ext.getStore('GalleryStore').removeAll();
        //Gallery.common.GalleryData.minDataPos;
        for(i=Gallery.common.GalleryData.minDataPos; i< Gallery.common.GalleryData.maxDataPos; i++)
        {
            Ext.getStore('GalleryStore').add(Gallery.common.GalleryData.orgData[i]);
        }
        listScroller.scrollTo(0,itemHeight * Math.floor( (Gallery.common.GalleryData.curDataPos - Gallery.common.GalleryData.minDataPos-1)) );
    },           

    // 리스트관련 ====================================
    addScrollAfter:function(a,b,c)
    { 
        console.log('addScroller');
        // 아래로 이동
        if(c >= this.maxPos)
        {
            console.log("아래로 이동");
            // 제일 하단보다 더 밑으로 내릴 경우 서버로 부터데이터를가져옴
            if(Gallery.common.GalleryData.maxDataPos >= Gallery.common.GalleryData.totDataPos)
            {
                console.log('제일하단' + this.currPageNum);
                this.currPageNum = this.currPageNum + 1;
                this.callServer(this.currPageNum);
            }
            else
            {
                console.log('그냥하단' + Gallery.common.GalleryData.maxDataPos);
                // 제일 아래가 아닐 경우 기존 데이터를 사용하여 30건만 유지함
                if( Gallery.common.GalleryData.maxDataPos>= 30)
                {
                    for(i=0;i<10;i++)
                    {
                        Ext.getStore('GalleryStore').removeAt(0);
                    }
                    var result = new Array(0);
                    for(i= Gallery.common.GalleryData.maxDataPos; i< Gallery.common.GalleryData.maxDataPos+10;i++)
                    {
                        if(Gallery.common.GalleryData.orgData[i] != null)
                        {
                            try{result.push(Gallery.common.GalleryData.orgData[i]); }catch(e){}
                        }
                        else
                        {
                            console.log('데이터 없음');
                        }
                    }
                    Gallery.common.GalleryData.maxDataPos = Gallery.common.GalleryData.maxDataPos+10;                               
                    Gallery.common.GalleryData.minDataPos = Gallery.common.GalleryData.maxDataPos-30;
                    if(Gallery.common.GalleryData.minDataPos < 0)
                    {
                        Gallery.common.GalleryData.minDataPos = 0;
                    }
                    
                    this.addData(result);
                }                           
            }
        }
        else if(c == 0 && Gallery.common.GalleryData.maxDataPos >30)    // 위로이동
        {
            console.log('위로이동' + Gallery.common.GalleryData.maxDataPos);
            for(i=30-1; i>=20;i--)
            {                       
                try{Ext.getStore('GalleryStore').removeAt(i); } catch(e){}
            }
            var result = new Array(0);
            for(i= Gallery.common.GalleryData.maxDataPos-40; i< Gallery.common.GalleryData.maxDataPos-30;i++)
            {
                result.push(Gallery.common.GalleryData.orgData[i]);
            }
            Gallery.common.GalleryData.maxDataPos = Gallery.common.GalleryData.maxDataPos-10;
            Gallery.common.GalleryData.minDataPos = Gallery.common.GalleryData.maxDataPos-30;
            if(Gallery.common.GalleryData.minDataPos < 0)
            {
                Gallery.common.GalleryData.minDataPos = 0;
            }               
            this.insertData(result);
        }   

    },  
    chgMaxPos:function(a,b,c)
    {
        console.log('chgMaxPos');
        this.maxPos = b.y;
    },    
    onItemTap:function(list,index, item){
        Gallery.common.GalleryData.curDataPos = index + Gallery.common.GalleryData.minDataPos;
        this.getGalleryListView().hide();
        
        
        this.getGalleryDetailView().destroy();
        panelDetail = Ext.create('Gallery.view.GalleryDetailView');
        
        this.getGalleryDetailView().show();
        this.getApplication().getController('GalleryDetailController').setPage(this.currPageNum);
    }   
});