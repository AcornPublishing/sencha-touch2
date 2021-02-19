
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
    
    // Carousel�� �����ϱ� ���� Carousel�� �ִ� ������Ʈ�� ������ �̸� üũ�Ͽ� �����ϰ� �����.
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
        console.log("��ȸ������:" + inputPage);
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
                    alert('������ ����');
                    return;
                }
                console.log(response.responseText);
                console.log('�����κ��� �µ����� ---------------------------');
                console.log(JsonData.imglist);
                console.log(this);
                tempThis.addProxyData(JsonData.data.imglist);
            },
            fail:function()
            {
                alert('�������');
            }
        });  
    },
      
    // ����Ʈ�г� ����==================================
    addProxyData:function(result)
    {
        console.log("addProxyData----------------");
        console.log(result);
        if(result == null)
        {
            // ������ �������� �������� null�� ��.
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
        // �����κ��� �����͸� �޾������ �����͸���Ʈ�� ������ �ִ� �̹��� ũ�⸦ �����(ó�� �ѹ���)
        if(this.itemHeight == 0)
        {
            //itemHeight = 200/2;   // CSS�� �����ϰ� ó�� */
            try{ itemHeight =  this.getGalleryList().element.down('.x-list-item').getHeight(); }catch(e){}  
        }
        
        console.log("3:" + Gallery.common.GalleryData.maxDataPos);
        
        // ��ũ���� ����ġ�� ã�ư�(10���� �߰��Ͽ����� �ݴ�� 10�� ���� �ö�)
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
                    
        // ���� �ø����� insert�� ó����
        Ext.getStore('GalleryStore').insert(0,result);
        listScroller.scrollBy(0,itemHeight * 10 );                  
    },
    // ��ȭ�鿡�� ���ϵǾ����� ȭ���� ������.
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

    // ����Ʈ���� ====================================
    addScrollAfter:function(a,b,c)
    { 
        console.log('addScroller');
        // �Ʒ��� �̵�
        if(c >= this.maxPos)
        {
            console.log("�Ʒ��� �̵�");
            // ���� �ϴܺ��� �� ������ ���� ��� ������ ���͵����͸�������
            if(Gallery.common.GalleryData.maxDataPos >= Gallery.common.GalleryData.totDataPos)
            {
                console.log('�����ϴ�' + this.currPageNum);
                this.currPageNum = this.currPageNum + 1;
                this.callServer(this.currPageNum);
            }
            else
            {
                console.log('�׳��ϴ�' + Gallery.common.GalleryData.maxDataPos);
                // ���� �Ʒ��� �ƴ� ��� ���� �����͸� ����Ͽ� 30�Ǹ� ������
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
                            console.log('������ ����');
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
        else if(c == 0 && Gallery.common.GalleryData.maxDataPos >30)    // �����̵�
        {
            console.log('�����̵�' + Gallery.common.GalleryData.maxDataPos);
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