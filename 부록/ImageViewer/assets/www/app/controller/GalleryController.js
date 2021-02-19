Ext.define('Gallery.controller.GalleryController', {
    extend: 'Ext.app.Controller',
    // Gallery.common.GalleryData�� model,view, controller�� ���Ե��� �����Ƿ�
    // ������ �߰���
    requires:[
        'PhoneGap',
        'Ext.Ajax',
        'Ext.scroll.Scroller',
        'Gallery.common.GalleryData',       
    ],    
    config: {    
    	// ������ü����    
        refs: {
            galleryDirListView: 'gallerydirlistview',
            galleryDirList:     'gallerydirlist',
            galleryListView:    'gallerylistview',
            galleryList:        'gallerylist',
            galleryDetailView:  'gallerydetailview',            
            backMain:		    'gallerylistview [name=backmain]',
        },
        // ��ü�� �̺�Ʈ�� ����
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
    // ���μ��� ������ �ٲ� ȣ��� �ð��� ���� �ø�.
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
        console.log("tempArray:" + tempArray);
        this.addProxyData(tempArray);
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
        // �����κ��� �����͸� �޾������ �����͸���Ʈ�� ������ �ִ� �̹��� ũ�⸦ �����(ó�� �ѹ���)
        if(this.itemHeight == 0)
        {
            try{ itemHeight =  this.getGalleryList().element.down('.x-list-item').getHeight(); }catch(e){}  
        }
        // ��ũ���� ����ġ�� ã�ư�(10���� �߰��Ͽ����� �ݴ�� 10�� ���� �ö�)
        if( Gallery.common.GalleryData.maxDataPos> 30)
        {
            listScroller.scrollBy(0,itemHeight * (-10) );               
        }
        this.getGalleryList().setStore(Ext.getStore('GalleryStore'));
    },
    // ����Ʈ �ڿ� �����͸� �߰���.
    addData:function(result)
    {
        Ext.getStore('GalleryStore').add(result);
        if( Gallery.common.GalleryData.maxDataPos> 30)
        {
            listScroller.scrollBy(0,itemHeight * (-10) );               
        }                                   
    },              
    // ����Ʈ �տ� �����͸� ������
    insertData:function(result)
    {     
        // ���� �ø����� insert�� ó����
        Ext.getStore('GalleryStore').insert(0,result);
        listScroller.scrollBy(0,itemHeight * 10 );                  
    },
    // ��ȭ�鿡�� ���ϵǾ����� ȭ���� ������.
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
    // ��ũ�ѷ��� ���� ��ġ�� �ٲ����.
    chgMaxPos:function(a,b,c)
    {
        console.log('chgMaxPos');
        this.maxPos = b.y;
    },    
    // ���� ����Ʈ�� �������� Ŭ����
    onItemTap:function(list,index, item){
        Gallery.common.GalleryData.curDataPos = index + Gallery.common.GalleryData.minDataPos;
        this.getGalleryListView().hide();
        this.getGalleryDetailView().destroy();
        panelDetail = Ext.create('Gallery.view.GalleryDetailView');
        this.getGalleryDetailView().show();
        this.getApplication().getController('GalleryDetailController').setPage(this.currPageNum);
    },
    // ���� ����Ʈ�� �������� Ŭ����
    onItemTapDir:function(list,index, item){
    	this.initGalleryList(); 	
    	temp = Ext.getStore('GalleryDirStore').data.items[index].data.path;
		// �ش� ������ �̵��Ͽ� GalleryList�� �����ش�.  
		this.getGalleryDirListView().hide();
		this.getGalleryListView().setHtml('<font size=2>' + temp + '</font>');
		this.getGalleryListView().show();
		this.callServerTot(temp); 
 		       
    },   
    // ���ϸ���Ʈ�� �ʱ�ȭ ������
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
    // ��������Ʈ�� �̵���
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