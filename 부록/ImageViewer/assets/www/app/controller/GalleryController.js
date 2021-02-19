Ext.define('Gallery.controller.GalleryController', {
    extend: 'Ext.app.Controller',
    // Gallery.common.GalleryData는 model,view, controller에 포함되지 않으므로
    // 별도로 추가함
    requires:[
        'PhoneGap',
        'Ext.Ajax',
        'Ext.scroll.Scroller',
        'Gallery.common.GalleryData',       
    ],    
    config: {    
    	// 참조개체정의    
        refs: {
            galleryDirListView: 'gallerydirlistview',
            galleryDirList:     'gallerydirlist',
            galleryListView:    'gallerylistview',
            galleryList:        'gallerylist',
            galleryDetailView:  'gallerydetailview',            
            backMain:		    'gallerylistview [name=backmain]',
        },
        // 개체별 이벤트를 정의
        control: {
        	viewport:{
        		orientationchange: 'onOrien'
        	},
            galleryList: {
                itemtap: 'onItemTap'
            },
            galleryDirList: {
            	itemtap: 'onItemTapDir'
            },
            backMain: {
            	tap:'onBackMain'
            }
        }
    },
    itemHeight:0,
    currPageNum:1,
    maxPos:0,
    Scroller:'listScroller',
    launch: function() {
    	
        listScroller = this.getGalleryList().getScrollable().getScroller();
        listScroller.on('scrollend', this.addScrollAfter, this);      
        listScroller.on('maxpositionchange', this.chgMaxPos, this);        
    	me = this;
        this.startPhoneGap();       
        
        
    },      
    // 갸로세로 방향이 바뀔때 호출됨 시간을 조금 늘림.
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
    callDirList:function()
    {
    },    
    callServerTot:function(inputPath)
    {
		window.plugins.ExecFile.searchFile('', inputPath);    	
    },
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
        console.log("tempArray:" + tempArray);
        this.addProxyData(tempArray);
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
        console.log('addProxyDataSub-----------------------' + result.length);
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
            try{ itemHeight =  this.getGalleryList().element.down('.x-list-item').getHeight(); }catch(e){}  
        }
        // 스크롤이 원위치로 찾아감(10건을 추가하였으니 반대로 10건 위로 올라감)
        if( Gallery.common.GalleryData.maxDataPos> 30)
        {
            listScroller.scrollBy(0,itemHeight * (-10) );               
        }
        this.getGalleryList().setStore(Ext.getStore('GalleryStore'));
    },
    // 리스트 뒤에 데이터를 추가함.
    addData:function(result)
    {
        Ext.getStore('GalleryStore').add(result);
        if( Gallery.common.GalleryData.maxDataPos> 30)
        {
            listScroller.scrollBy(0,itemHeight * (-10) );               
        }                                   
    },              
    // 리스트 앞에 데이터를 삽입함
    insertData:function(result)
    {     
        // 위로 올릴경우는 insert로 처리함
        Ext.getStore('GalleryStore').insert(0,result);
        listScroller.scrollBy(0,itemHeight * 10 );                  
    },
    // 상세화면에서 리턴되었을때 화면을 갱신함.
    returnAddMsg:function(cpage)
    {
        this.currPageNum = cpage;
        Ext.getStore('GalleryStore').removeAll();
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
    // 스크롤러에 의해 위치가 바뀌었다.
    chgMaxPos:function(a,b,c)
    {
        console.log('chgMaxPos');
        this.maxPos = b.y;
    },    
    // 파일 리스트의 아이템이 클릭됨
    onItemTap:function(list,index, item){
        Gallery.common.GalleryData.curDataPos = index + Gallery.common.GalleryData.minDataPos;
        this.getGalleryListView().hide();
        this.getGalleryDetailView().destroy();
        panelDetail = Ext.create('Gallery.view.GalleryDetailView');
        this.getGalleryDetailView().show();
        this.getApplication().getController('GalleryDetailController').setPage(this.currPageNum);
    },
    // 폴더 리스트이 아이템이 클릭됨
    onItemTapDir:function(list,index, item){
    	this.initGalleryList(); 	
    	temp = Ext.getStore('GalleryDirStore').data.items[index].data.path;
		// 해당 폴더로 이동하여 GalleryList를 보여준다.  
		this.getGalleryDirListView().hide();
		this.getGalleryListView().setHtml('<font size=2>' + temp + '</font>');
		this.getGalleryListView().show();
		this.callServerTot(temp); 
 		       
    },   
    // 파일리스트를 초기화 시켜줌
    initGalleryList:function()
    {
    	this.currPageNum = 1;
    	Ext.getStore('GalleryStore').removeAll();
	    Gallery.common.GalleryData.totDataPos=0;
	    Gallery.common.GalleryData.maxDataPos=0;
	    Gallery.common.GalleryData.minDataPos=0;
	    Gallery.common.GalleryData.curDataPos=0;
	    Gallery.common.GalleryData.curId='0';
	    Gallery.common.GalleryData.curSubject='';
	    Gallery.common.GalleryData.curContent='';
	    Gallery.common.GalleryData.curImg='';
	    Gallery.common.GalleryData.orgData = new Array(0);
	    Gallery.common.GalleryData.totData = new Array(0);
    },    
    // 폴더리스트로 이동함
    onBackMain:function()
    { 
    	this.getGalleryListView().hide();
    	this.getGalleryDirListView().show();
    },

    // PhoneGap ---------------------------------
	successRootSystem:function(directoryEntry){
		dirEntry=directoryEntry; 
		var rootPath = dirEntry.fullPath;
		window.plugins.ExecFile.searchDir('', rootPath);
	},
	failFileSystem:function(error){
		alert('error:' + error.code);
		file.releaseMask();
	},		
	getRootDir:function( )
	{
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
	    	function(fileSystem){
	    		root= fileSystem.root;
	    		me.successRootSystem(root);
	    	},
	    	function(evt){
	    		alert('file read error!! : ' + evt.target.error.code);
	    		console.log(">>>>" + evt.target.error.code);
	    		//file.releaseMask();
	    	}
	    );
    },            
	onDeviceReady:function() {
        document.addEventListener("menubutton", me.onMenuButton, false);
        document.addEventListener("backbutton", me.onBackButton, false);			
		me.setPlugIn();	
		me.getRootDir();
		
	},	
	onMenuButton:function(){
		if(confirm('Exit?')== true)
		{
			navigator.app.exitApp();
		}
	},
	onBackButton:function(){
		if(confirm('Exit?')== true)
		{
			navigator.app.exitApp();
		}
	},
	startPhoneGap:function()
	{
		document.addEventListener("deviceready", me.onDeviceReady, false);
	},  
	setPlugIn:function()
	{
		ExecFile = function() {
		};	  
		ExecFile.getMe = function()
		{
			return me;
		}
		ExecFile.install = function(){
    		return window.plugins.ExecFile;
		};
		ExecFile.prototype._onError = function(data) {
		    if (typeof window.plugins.execfile.onError === "function") {
		        window.plugins.childBrowser.onError(data);
		    }
		};		
		ExecFile.prototype.exec = function(url, options) {
		    cordova.exec( '', '', "ExecFile", "exec", [url, options]);
		};
		ExecFile.onPackageList = function(data) {
            storePackageList.setData(Ext.decode(data));
            Ext.getCmp('packagelist').setStore(storePackageList);
            storePackageList.load();			
		};			
		ExecFile.prototype.getPackageList = function(url, options) {
		    cordova.exec( ExecFile.onPackageList, '', "ExecFile", "getPackageList", [url, options]);
		};
		ExecFile.onSearchList = function(data) {
			var temp = Ext.decode(data);
			for(i=0; i<temp.length;i++)
			{
				Gallery.common.GalleryData.totData.push(temp[i]);
			}	
			ExecFile.getMe().callServer(1);		
		};			
		ExecFile.prototype.searchFile = function(url, options) {
		    cordova.exec( ExecFile.onSearchList, '', "ExecFile", "searchFile", [url, options]);
		};		
		ExecFile.onSearchDir = function(data) {
			me.getGalleryDirListView().setHtml('');
			Ext.getStore('GalleryDirStore').setData(Ext.decode(data));
            //storeSearchList.setData(Ext.decode(data));
            Ext.getStore('GalleryDirStore').load();
            ExecFile.getMe().getGalleryDirList().setStore(Ext.getStore('GalleryDirStore'));
            
		};			
		ExecFile.prototype.searchDir = function(url, options) {
		    cordova.exec( ExecFile.onSearchDir, '', "ExecFile", "searchDir", [url, options]);
		};		
		cordova.addConstructor(function() {
		    cordova.addPlugin("ExecFile", new ExecFile());
		});				
	}
});