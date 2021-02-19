
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
                
                tempThis.addProxyData(JsonData.data.imglist);
            },
            fail:function()
            {
                alert('�������');
            }
        });  
    },

    // ��ȭ�����====================================
    // ��ȭ��(����Ʈ ��ȸ����) Ŭ���Ͽ��� ��� �����ִ� ���� ȭ���� ��ġ        
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
        console.log('ó��ȣ��----------------------------');                
        for(i = start_i; i< Gallery.common.GalleryData.maxDataPos;i++)
        {
            console.log(Gallery.common.GalleryData.orgData[i]);
            //this.addArt(Gallery.common.GalleryData.orgData[i]);
            try{ this.addArt(Gallery.common.GalleryData.orgData[i]); }catch(e){ console.log('��������'); }
        }
        // �������� �̵���Ų��.
        console.log('�������̵�');
        this.getGalleryDetailCarousel().setActiveItem(  Gallery.common.GalleryData.curDataPos - start_i);
        this.getGalleryDetailView().imgDraw = true;
        // ù��° ȣ���ϰ�� 
        if(val=='first')
        {
            console.log('ù��°��ġ ');
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
            // ������ �������� �������� null�� ��.
            //Ext.Msg.alert('Ȯ��', '�����Ͱ� �����ϴ�.', Ext.emptyFn);
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
    // Ŀ�ο���ȭ��====================================    
    onCarouselChange:function( a, index1,index2){
        if(this.getGalleryDetailView().imgDraw == true)
        {
            // ȭ�鰻��
            var curIndex = Number(this.getGalleryDetailCarousel().getActiveIndex());
            // ����, ��, �� ȭ���� �̹����� �����ش�.                  
            {
                {
                    // ������ī�带 �����.
                    // �������� �����϶� Title����
                    var detailCard = this.getGalleryDetailCarousel().getAt(curIndex+this.carouselAdded);// getActiveItem();//(curIndex);  
                    Gallery.common.GalleryData.curId = detailCard.galleryid;

                    // Ÿ��Ʋ�� ���� (������ ũ�� �� ��������)

                    //Ext.ComponentQuery.query('#subjectToolbar')[0].setTitle(detailCard.subject);
                    this.getSubjectToolbar().setTitle(detailCard.subject);
                    
                    // ���� �̹����� �����Ѵ�.
                    detailCard.setImg();
                }
                if(curIndex !=0)
                {
                    // �� �̹�������
                    var detailCardBf = this.getGalleryDetailCarousel().getAt(curIndex-1 + this.carouselAdded);
                    detailCardBf.setImg();                          
                }
                if(curIndex != this.getGalleryDetailCarousel().getItems().length-1-this.carouselAdded)
                {
                    // �� �̹�������
                    var detailCardAf = this.getGalleryDetailCarousel().getAt(curIndex+1+this.carouselAdded);
                    detailCardAf.setImg();
                }
            }
            
            // ���������� �̵�
            if(curIndex ==  this.getGalleryDetailCarousel().getItems().length-1-this.carouselAdded)
            {
                // �����κ��� �����͸� ������
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
                // �� �������� ���� ��� 
                if(Gallery.common.GalleryData.maxDataPos > 30)
                {
                    // 30�� �̻��� ���� ��� ������ 10���� ����� ���� 10���� �߰���.
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
    
    // ��ȭ�� Panel ===================================================
    
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
        console.log('ó��ȣ��----------------------------');                
        for(i = start_i; i< Gallery.common.GalleryData.maxDataPos;i++)
        {
            console.log(Gallery.common.GalleryData.orgData[i]);
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
                detailCard.setImg();
            }
            catch(e){ console.log('��������' ); }
        }
    },

    addArt:function(photodata){
        console.log('--------------------');
        console.log(photodata);
        

        var detailCard = new Ext.create('Gallery.view.GalleryDetailCard');

        console.log("������ �Ϸù�ȣ:" + photodata.id);

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