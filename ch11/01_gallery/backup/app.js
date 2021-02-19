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
        'common'],
    launch:function(){
        
        var galleryList;
        var galleryStore;
        var galleryProxy;
        var galleryModel;

		var contestScroller;
		var maxPos = 0;

        Ext.define('gallerys', {
            extend:'Ext.data.Model',
            config:{
             fields: ['id', 'subject','content','img']
            }
        });     

        galleryProxy = new Ext.create('Ext.data.AjaxProxy',{
            type:'ajax',
            url: './jsp/imglist.jsp',
            params:{
            	pageNum:1,
            },
            reader:{
                type:'json',
                rootProperty:'imglist',
            },
            rootProperty:'imglist',
        });         
        
        galleryStore = new Ext.create('Ext.data.Store',{
            autoLoad:true,          
            fields:[
            	{name:'id', 	type:'string'},
                {name:'subject', type:'string'},
                {name:'content', type:'string'},
                {name:'img', 	type:'string'}
            ],
            proxy: galleryProxy               
        });   

		console.log(galleryStore);
        
        galleryList = new Ext.create('Ext.List',{
            flex:1,
            store:galleryStore,
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('id') + "선택 index:" + index);
                }
            },
            itemTpl:'<div><img src="./img/{img}" height="50"><strong>{id} {subject}</strong></div>',
			데이터 뷰의 하나를 클릭할때 이벤트. 상세화면으로 이동	
			listeners: {	
				itemtap: function(list, index) {
	                common.galleryData.curDataPos = index + common.galleryData.minDataPos;
	                //galleryDetail.init();
	            }
	        },		            
        });        

        main.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox',
                
            },
            id: 'content',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title:'Proxy 시작',
            },
            galleryList],
            
            // 함수정의 
	    	addScrollAfter:function(a,b,c)
	    	{ 
	    		/*
	    		// 아래로 이동
	        	if(c >= maxPos)
	        	{
	        		// 제일 하단보다 더 밑으로 내릴 경우 서버로 부터데이터를가져옴
	        		if(common.awardData.maxDataPos >= common.awardData.totDataPos)
	        		{
						util.sendParam.LAST=common.awardData.totDataPos;
			           	util.sendTR(fk.awardlist.panel.addProxyData);
		            }
		            else
		            {
		            	// 제일 아래가 아닐 경우 기존 데이터를 사용하여 30건만 유지함
	            		if( common.awardData.maxDataPos>= 30)
	            		{
		            		for(i=0;i<10;i++)
		            		{
		            			store.removeAt(0);
		            		}
			            	var result = new Array(0);
			            	for(i= common.awardData.maxDataPos; i< common.awardData.maxDataPos+10;i++)
			            	{
			            		if(common.awardData.orgData[i] != null)
			            		{
			            			try{result.push(common.awardData.orgData[i]); }catch(e){}
			            		}
			            		else
			            		{
			            			console.log('데이터 없음');
			            		}
			            	}
			            	common.awardData.maxDataPos = common.awardData.maxDataPos+10;				            	
			            	common.awardData.minDataPos = common.awardData.maxDataPos-30;
			            	if(common.awardData.minDataPos < 0)
			            	{
			            		common.awardData.minDataPos = 0;
			            	}
			            	
			            	setTimeout(fk.awardlist.panel.addData(result), 500);
			           	}			            	
		            }
	        	}
	        	else if(c == 0 && common.awardData.maxDataPos >30)	// 위로이동
	        	{
	        		for(i=30-1; i>=20;i--)
	        		{            			
	        			try{store.removeAt(i); } catch(e){}
	        		}
	            	var result = new Array(0);
	            	for(i= common.awardData.maxDataPos-40; i< common.awardData.maxDataPos-30;i++)
	            	{
	            		result.push(common.awardData.orgData[i]);
	            	}
	            	common.awardData.maxDataPos = common.awardData.maxDataPos-10;
	            	common.awardData.minDataPos = common.awardData.maxDataPos-30;
	            	if(common.awardData.minDataPos < 0)
	            	{
	            		common.awardData.minDataPos = 0;
	            	}            	
	            	setTimeout(fk.awardlist.panel.insertData(result), 500);
	            }   
	            */     		
	    	},
	    	chgMaxPos:function(a,b,c)
	    	{
	    		
	    		maxPos = b.y;
	    	},            
            
        });
	    contestScroller = fk.awardlist.dataView.getScrollable().getScroller();
	    contestScroller.on('scrollend', main.panel.addScrollAfter, this);     	
	    contestScroller.on('maxpositionchange', main.panel.chgMaxPos, this);
    }
});