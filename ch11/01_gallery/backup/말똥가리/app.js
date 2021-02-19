Ext.ns("gallerydetail");

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
        'gallerycard'],
    launch:function(){
    	
		var currPageNum = 0;


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
	    
	    gallerydetail.callServer=function(inputPage)
	    {
	    	console.log("조회페이지:" + inputPage);
            Ext.Ajax.request({
                url: './jsp/imglist.jsp',
                params:{
                    pageNum:inputPage,
                },
                success: function(response, opts) {
                    var JsonData = Ext.decode(response.responseText);
                    
                    console.log(response.responseText);
                    console.log('서버로부터 온데이터 ---------------------------');
                    console.log(JsonData.imglist);
                    gallerydetail.panel.addProxyData(JsonData.imglist);
                },
				fail:function()
				{
					alert('응답오류');
                }
            });  
   		}	
   		gallerydetail.callServer(1);  
   		
		// 화면에 이미지 출력여부를 조정함.
		// 좌우 이미지를 불러오기 때문에 불러온데이터 중 현재 위치를 중심으로 좌우 이미지만 조회하여 옴.
		gallerydetail.imgDraw = false;
		
		// Carousel을 제어하기 위해 Carousel에 있는 컴포넌트의 개수를 미리 체크하여 제외하고 계산함.
		var carouselAdded = 2;
		
		// Carousel생성
		gallerydetail.carousel = Ext.create('Ext.Carousel',
		{  
	    	flex:1,
	      	xtype:'carousel',     
	        defaults: {
	            cls: 'card'
	        },
	        indicator:true,
	        listeners:{
	        	activeitemchange:function( a, index1,index2){
	        		if(gallerydetail.imgDraw == true)
	        		{
						// 화면갱신
		        		var curIndex = Number(gallerydetail.carousel.getActiveIndex());
		        		// 현재, 좌, 우 화면의 이미지를 보여준다.            		
		        		{
		        			{
		        				// 현재의카드를 기억함.
								// 페이지가 움직일때 Title설정
								var detailCard = gallerydetail.carousel.getAt(curIndex+carouselAdded);// getActiveItem();//(curIndex);  
								common.galleryData.curId = detailCard.id;
	
								// 현재 이미지를 설정한다.
		            			detailCard.setImg();
		            		}
		            		if(curIndex !=0)
		            		{
		            			// 좌 이미지설정
			            		var detailCardBf = gallerydetail.carousel.getAt(curIndex-1 + carouselAdded);
			            		detailCardBf.setImg();	            			
		            		}
		            		if(curIndex != gallerydetail.carousel.getItems().length-1-carouselAdded)
		            		{
		            			// 우 이미지설정
			            		var detailCardAf = gallerydetail.carousel.getAt(curIndex+1+carouselAdded);
			            		detailCardAf.setImg();
		            		}
		            	}
		        		
		        		// 오른쪽으로 이동
		        		if(curIndex ==  gallerydetail.carousel.getItems().length-1-carouselAdded)
		            	{
		            		// 서버로부터 데이터를 가져옴
		            		// 현재 MAX값보다 큰 값을 가져올 경우 서버로부터 데이터를 요청함.
		            		if(common.galleryData.maxDataPos >= common.galleryData.totDataPos)
		            		{
								//util.sendParam.LAST=common.galleryData.totDataPos;
					           	//util.sendTR(gallerydetail.panel.addProxyData);
			        			currPageNum = currPageNum + 1;
								gallerydetail.callServer(currPageNum);
				            }
				            else
				            {
				            	// 현재위치보다 작고 30건 이상일 경우 이미 불러온 10건을 리스트에 추가함.
			            		if( common.galleryData.maxDataPos>= 30)
			            		{
				            		for(i=0;i<10;i++)
				            		{
				            			gallerydetail.carousel.removeAt(0 + carouselAdded);
				            		}
					            	var result = new Array(0);
					            	for(i= common.galleryData.maxDataPos; i< common.galleryData.maxDataPos+10;i++)
					            	{
					            		result.push(common.galleryData.orgData[i]);
					            	}
					            	common.galleryData.maxDataPos = common.galleryData.maxDataPos+10;				            	
					            	common.galleryData.minDataPos = common.galleryData.maxDataPos-30;
					            	setTimeout(gallerydetail.panel.addData(result), 100);
					           	}			            	
				            }
		            	}
		            	else if(curIndex == 0)
		            	{
		            		// 맨 왼쪽으로 왔을 경우 
							if(common.galleryData.maxDataPos > 30)
							{
								// 30건 이상이 있을 경우 오른쪽 10건을 지우고 왼쪽 10건을 추가함.
			            		for(i=9; i>=0;i--)
			            		{
			            			gallerydetail.carousel.removeAt(i + carouselAdded);
			            		}
				            	var result = new Array(0);
				            	for(i= common.galleryData.maxDataPos-40; i< common.galleryData.maxDataPos-30;i++)
				            	{
				            		result.push(common.galleryData.orgData[i]);
				            	}
				            	common.galleryData.maxDataPos = common.galleryData.maxDataPos-10;
				            	common.galleryData.minDataPos = common.galleryData.maxDataPos-30;
				            	setTimeout(gallerydetail.panel.insertData(result), 100);
				            }
			            }
			        }
	        	}
	        }
		});	
	
		// Carousel을 포함하는 패널임
		gallerydetail.panel = new Ext.create('Ext.Panel',{
	        fullscreen: true,
	        layout: {
	            type: 'vbox',
	            align: 'stretch',
	        },
	        items:[
	        	gallerydetail.carousel
			],
			// 앞화면(리스트 조회에서) 클릭하였을 경우 보여주는 현재 화면의 위치		
	  		setDataPos:function(val)
	  		{
	  			if(val=='first')
	  			{
	  				for(i=gallerydetail.carousel.getItems().length-1; i>=carouselAdded;i--)
	  				{
	  					gallerydetail.carousel.removeAt(i);
	  				}
	  			}  		
	  			var start_i = common.galleryData.minDataPos;
	  			if(start_i< 0)
	  				start_i=0;
	  			for(i = start_i; i< common.galleryData.maxDataPos;i++)
	  			{
					try{ addArt(common.galleryData.orgData[i]); }catch(e){}
	  			}
	  			// 페이지를 이동시킨다.
	  			gallerydetail.carousel.setActiveItem(  common.galleryData.curDataPos - start_i);
	  			gallerydetail.imgDraw = true;
	  			
	  			// 첫번째 호출일경우 
	  			if(val=='first')
	  			{
	  				var firstPos = common.galleryData.curDataPos - common.galleryData.minDataPos;
	  				if(firstPos < 0)
	  					firstPos = 0;
	  					
	  				console.log(firstPos);
	  				console.log(carouselAdded);	
	  				var detailCard = gallerydetail.carousel.getAt(firstPos+carouselAdded);
	  				
	  				console.log(detailCard);
	  				try
	  				{
	  					common.galleryData.curId = detailCard.id;
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
		    		if( common.galleryData.maxDataPos>= 30)
		    		{        			
		        		for(i=0;i<10;i++)
		        		{
		        			gallerydetail.carousel.removeAt(0 + carouselAdded);
		        		}
		           	}  
		           	setTimeout(gallerydetail.panel.addProxyDataSub(result), 200);      		
				}
	    	},
	    	addProxyDataSub:function(result)
	    	{
	    		console.log('result-------------------------------------');
	    		console.log(result);
	    		for(i = 0; i< result.length; i++)
	    		{
	    			common.galleryData.orgData.push(result[i]);
	    		}
	    		common.galleryData.maxDataPos = common.galleryData.maxDataPos + 10;//result.length;
	    		common.galleryData.minDataPos = common.galleryData.maxDataPos - 30;
	    		if(common.galleryData.maxDataPos > common.galleryData.totDataPos)
	    		{
	    			common.galleryData.totDataPos = common.galleryData.maxDataPos;
	    		}
	    		for(i = 0; i< result.length; i++)
	    		{    		
					addArt(result[i]);
	  			}
	    	},
	    	addData:function(result)
	    	{
	    		for(i = 0; i< result.length; i++)
	    		{    		
					addArt(result[i]);
	  			}    		
	    	},            	
	    	insertData:function(result)
	    	{
	    		for(i = 9; i>=0; i--)
	    		{    		
					insertArt(result[i]);
	  			}    		
	    	}
		});
	    gallerydetail.carousel.add(    
		{
	    	id:'subjectToolbar',
	    	overlay: true,
	        xtype: 'toolbar',       
	        docked: 'top',
			height:80,
	        style: 'opacity: 0.6;',
	        title:'title',
	        cls:'toolbar',
	        defaults: {
	            ui: 'plain',
	            iconMask:true,
	        },                
	        layout: {
	        	type:'hbox',
	            align: 'stretch'
	        },

	    });
	
		addArt = function(photodata){
			console.log('!!!!!!!!!!!!!!!!1--------------------');
			console.log(photodata);
			
	        var detailCard = new Ext.create('gallerycard',{
				flex:1,        				    
			});
	
			detailCard.element.setStyle({'background-size': '50 50'});
			detailCard.element.setStyle({'-moz-background-size': '50 50'});
			detailCard.element.setStyle({'background-position': '50% 50%'});
	    	detailCard.element.setStyle({'background-repeat':'no-repeat'});
			detailCard.element.setStyle({'backgroundImage': 'url(./img/fking_btn/loading.gif)'});
			
       
	
		
			console.log("설정한 일련번호:" + photodata.L_SEQ);
	
	        //detailCard.setPage(photodata.L_SEQ, photodata.ROWNUM,photodata.L_TITLE,photodata.IMG_URL1, photodata.REPLY, photodata.L_DESC, photodata.W_SUM_SCORE, photodata.M_SUM_SCORE);
	        detailCard.setPage(	photodata.id, 
	        					photodata.subject, 
	        					photodata.content,
	        					photodata.img);  
	
	        gallerydetail.carousel.add(detailCard);
	
		}
		   
		insertArt = function(photodata) { 
	       var detailCard = new Ext.create('gallerycard',{
				flex:1,        				    
			});
	
			detailCard.element.setStyle({'background-size': '50 50'});
			detailCard.element.setStyle({'-moz-background-size': '50 50'});
			detailCard.element.setStyle({'background-position': '50% 50%'});
	    	detailCard.element.setStyle({'background-repeat':'no-repeat'});
			detailCard.element.setStyle({'backgroundImage': 'url(./img/fking_btn/loading.gif)'});
			
 
	        
	        //detailCard.setPage(photodata.L_SEQ, photodata.ROWNUM, photodata.L_TITLE,photodata.IMG_URL1, photodata.REPLY, photodata.L_DESC, photodata.W_SUM_SCORE, photodata.M_SUM_SCORE);
	        detailCard.setPage(	photodata.id, 
	        					photodata.subject, 
	        					photodata.content,
	        					photodata.img);         
	        gallerydetail.carousel.insert(0 + carouselAdded,detailCard);
		}
		
		//gallerydetail.panel.show();	 
		
 
		gallerydetail.panel.add(gallerydetail.carousel);
	    gallerydetail.panel.setDataPos('first');	
	    

        
	}
});