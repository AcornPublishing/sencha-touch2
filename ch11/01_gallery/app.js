Ext.ns("main");

Ext.application({
    name:'PROXY',
    requires:[
        'Ext.Panel',
        'Ext.Ajax',
        'Ext.data.AjaxProxy',
        'Ext.data.Store',
        'Ext.List',
        'Ext.Toolbar',
        'Ext.field.Text',
        'Ext.form.FieldSet',
        'common',
        'gallerydetail'],
    launch:function(){
        
        var galleryList;
        var galleryStore;
        var galleryModel;

        var itemHeight=0;
        var listScroller;
        var maxPos = 0;
        var currPageNum = 1;

        Ext.define('gallery', {
            extend:'Ext.data.Model',
            config:{
                fields: ['id', 'subject','content','img']
            }
        });     

        galleryStore = new Ext.create('Ext.data.Store',{
            model: 'gallery',
            autoLoad:true,
        });             
        
        main.callServer=function(inputPage)
        {
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
                    
                    main.panel.addProxyData(JsonData.data.imglist);
                },
                fail:function()
                {
                    alert('서버장애');
                }
            });  
        }   
        //console.log(galleryStore);
        
        main.galleryList = new Ext.create('Ext.List',{
            flex:1,
            store:galleryStore,
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('id') + "선택 index:" + index);
                }
            },
            itemTpl:'<div><img src="./img/{img}" height="50"><strong>{id} {subject}</strong></div>',
            //데이터 뷰의 하나를 클릭할때 이벤트. 상세화면으로 이동    
            listeners: {    
                itemtap: function(list, index) {
                    common.galleryData.curDataPos = index + common.galleryData.minDataPos;
                    main.panel.hide();
                    gallerydetail.init(currPageNum);
                }
            },                  
        });        

        main.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox',
            },
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title:'갤러리',
            },
            main.galleryList],
            
            // 함수정의 
            addScrollAfter:function(a,b,c)
            { 
                console.log('addScroller');
                // 아래로 이동
                if(c >= maxPos)
                {
                    console.log("아래로 이동");
                    // 제일 하단보다 더 밑으로 내릴 경우 서버로 부터데이터를가져옴
                    if(common.galleryData.maxDataPos >= common.galleryData.totDataPos)
                    {
                        console.log('제일하단' + currPageNum);
                        currPageNum = currPageNum + 1;
                        main.callServer(currPageNum);
                        //main.panel.sendParam.LAST=common.galleryData.totDataPos;
                       //   main.panel.addProxyData(galleryStore.data);
                    }
                    else
                    {
                        console.log('그냥하단' + common.galleryData.maxDataPos);
                        // 제일 아래가 아닐 경우 기존 데이터를 사용하여 30건만 유지함
                        if( common.galleryData.maxDataPos>= 30)
                        {
                            for(i=0;i<10;i++)
                            {
                                galleryStore.removeAt(0);
                            }
                            var result = new Array(0);
                            for(i= common.galleryData.maxDataPos; i< common.galleryData.maxDataPos+10;i++)
                            {
                                if(common.galleryData.orgData[i] != null)
                                {
                                    try{result.push(common.galleryData.orgData[i]); }catch(e){}
                                }
                                else
                                {
                                    console.log('데이터 없음');
                                }
                            }
                            common.galleryData.maxDataPos = common.galleryData.maxDataPos+10;                               
                            common.galleryData.minDataPos = common.galleryData.maxDataPos-30;
                            if(common.galleryData.minDataPos < 0)
                            {
                                common.galleryData.minDataPos = 0;
                            }
                            
                            setTimeout(main.panel.addData(result), 500);
                        }                           
                    }
                }
                else if(c == 0 && common.galleryData.maxDataPos >30)    // 위로이동
                {
                    console.log('위로이동' + common.galleryData.maxDataPos);
                    for(i=30-1; i>=20;i--)
                    {                       
                        try{ galleryStore.removeAt(i); } catch(e){}
                    }
                    var result = new Array(0);
                    for(i= common.galleryData.maxDataPos-40; i< common.galleryData.maxDataPos-30;i++)
                    {
                        result.push(common.galleryData.orgData[i]);
                    }
                    common.galleryData.maxDataPos = common.galleryData.maxDataPos-10;
                    common.galleryData.minDataPos = common.galleryData.maxDataPos-30;
                    if(common.galleryData.minDataPos < 0)
                    {
                        common.galleryData.minDataPos = 0;
                    }               
                    setTimeout(main.panel.insertData(result), 500);
                }   
        
            },
            chgMaxPos:function(a,b,c)
            {
                console.log('chgMaxPos');
                maxPos = b.y;
            },            
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
                    if( common.galleryData.maxDataPos>= 30)
                    {                   
                        for(i=0;i<10;i++)
                        {
                            galleryStore.removeAt(0);
                        }
                    }  
                    setTimeout(main.panel.addProxyDataSub(result), 500);            
                }
            },
            addProxyDataSub:function(result)
            {
                console.log('addProxyDataSub-----------------------');
                console.log(result);
                for(i = 0; i< result.length; i++)
                {
                    common.galleryData.orgData.push(result[i]);
                }
                common.galleryData.maxDataPos = common.galleryData.maxDataPos + 10;
                common.galleryData.minDataPos = common.galleryData.maxDataPos - 30;
                if(common.galleryData.minDataPos < 0)
                {
                    common.galleryData.minDataPos = 0;
                }           
                if(common.galleryData.maxDataPos > common.galleryData.totDataPos)
                {
                    common.galleryData.totDataPos = common.galleryData.maxDataPos;
                }
                galleryStore.add(result);
                // 서버로부터 데이터를 받았을경우 데이터리스트가 가지고 있는 이미지 크기를 계산함(처음 한번만)
                if(itemHeight == 0)
                {
                    //itemHeight = 200/2;   // CSS와 동일하게 처리 */
                    try{ itemHeight =  main.galleryList.element.down('.x-list-item').getHeight(); }catch(e){}  
                }
                
                // 스크롤이 원위치로 찾아감(10건을 추가하였으니 반대로 10건 위로 올라감)
                if( common.galleryData.maxDataPos> 30)
                {
                    listScroller.scrollBy(0,itemHeight * (-10) );               
                }
            },
            addData:function(result)
            {
                console.log("addData----------------");
                console.log(result);
                
                galleryStore.add(result);
                if( common.galleryData.maxDataPos> 30)
                {
                    listScroller.scrollBy(0,itemHeight * (-10) );               
                }                                   
            },              
            insertData:function(result)
            {
                console.log("insertData----------------");
                console.log(result);
                            
                // 위로 올릴경우는 insert로 처리함
                galleryStore.insert(0,result);
                listScroller.scrollBy(0,itemHeight * 10 );                  
            },
            // 상세화면에서 리턴되었을때 화면을 갱신함.
            returnAddMsg:function(cpage)
            {
                currPageNum = cpage;
                galleryStore.removeAll();
                //common.galleryData.minDataPos;
                for(i=common.galleryData.minDataPos; i< common.galleryData.maxDataPos; i++)
                {
                    galleryStore.add(common.galleryData.orgData[i]);
                }
                listScroller.scrollTo(0,itemHeight * Math.floor( (common.galleryData.curDataPos - common.galleryData.minDataPos-1)) );
            }              
        });
        listScroller = main.galleryList.getScrollable().getScroller();
        listScroller.on('scrollend', main.panel.addScrollAfter, this);      
        listScroller.on('maxpositionchange', main.panel.chgMaxPos, this);
        
        main.callServer(1);
    }
});