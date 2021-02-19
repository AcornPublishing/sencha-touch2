Ext.ns("file");

Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});
Ext.application({
    name:'file',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.List',
        'Ext.field.Text',
        'Ext.data.Store',
        'Ext.Mask',
        'PhoneGap',
    ],
    viewport : 
    {
    	// 안드로이드에서 onClick등 자바스크립트 함수가 동작하기 위해 설정
        preventZooming : false
    },            
    launch:function(){
    	var rootPath = "";					// 루트경로
    	var currentPath = "";				// 현재경로
        var selectedPath = "";				// 선택된경로
        var parentPath = "";				// 부모경로	
        var copyMode = "0";					// 복사모드 1:복사,   2:이동 
        var copyedFiles = "";				// 복사한파일
        var copyedArray = new Array();		// 복사한 파일목록
        var copyedNum = 0;					// 복사한 숫자
        var copyedLoopNum = 0;				// 복사할때 순환처리변수
        var fileListSize = 0;				// 파일의 리스트 크기
        var searchArray;					// 조회파일목록
        var searchNum=0;					// 조회숫자
        file.popupState = 0;				// 팝업이 있는지 체크상태
        var maskBodyLoading;				// 마스크 
        var smaskBodyLoading;				// 조회팝업창에서의 마스크
        // 파일처리 Model --------------------------------
        Ext.define('filelist', {
            extend:'Ext.data.Model',
            config:{
             fields: ['index','filename', 'isFile', 'path']
            }
        });
        var orgData= [{filename: '' , isFile:'true', path:''}];
		// 파일처리 리스트 ----------------------------
        var storeFileList =   new Ext.create('Ext.data.Store',{
                model: 'filelist',
                sorters: 'filename',                
                data: orgData,
                autoLoad:true,
        });             
        // 조회처리 리스트 --------------------------------
        var orgSearchData= [{index:'', filename: '' , isFile:'', path:''}];
        var storeSearchList =   new Ext.create('Ext.data.Store',{
                model: 'filelist',
                sorters: 'filename',                
                data: orgSearchData,
                autoLoad:true,
        });             
        // 패키지 리스트  --------------------------------
        Ext.define('packageModel', {
            extend:'Ext.data.Model',
            config:{
             fields: ['l', 'p']
            }
        });
        var orgPackageData= [{l: '패키지명' , p:'com'}];
        var storePackageList =   new Ext.create('Ext.data.Store',{
                model: 'packageModel',
                sorters: 'lebelName',                
                data: orgPackageData,
                autoLoad:true,
        });             
        // 파일처리 --------------------------------
		var itemTemplate = new Ext.XTemplate(
        '<tpl for=".">',                            	
        '<tpl if="isFile==\'true\'">',
        	'<div width="100%" ><table width="100%"  style="table-layout:fixed"><tr><td width="20%">',
        	'<img src="./img/doc.png" height=30></td><td width="60%" style="word-wrap:break-word;"><font size=2>',
        	'<a href="javascript:file.onPop(\'{path}\');">{filename}</a></font></td>',
        	'<td width="20%" align="right"><a href="javascript:file.checkFile({index})">',
        	'<img name="checkImg{index}" src="./img/empty1.png" height=20></a>',
        	'<input type="hidden" name="checkBox{index}" value="0">',
        	'<input type="hidden" name="checkFile{index}" value="{path}">',
        	'<input type="hidden" name="isFile{index}" value="Y"></td></tr></table></div>',            
        '</tpl>',
        '<tpl else if="isFile==\'false\'">',
        	'<div ><table width="100%" style="table-layout:fixed"><tr><td width="20%">',
        	'<img src="./img/folder_black.png" height=30></td><td width="60%"  style="word-wrap:break-word;"><font size=2>',
        	'<a href="javascript:file.getDir(\'{path}\');">{filename}</a></font></td>',
        	'<td width="20%" align="right"><a href="javascript:file.checkFile({index})">',
        	'<img name="checkImg{index}" src="./img/empty1.png" height=20></a>',
        	'<input type="hidden" name="checkBox{index}" value="0">',
        	'<input type="hidden" name="checkFile{index}" value="{path}">',
        	'<input type="hidden" name="isFile{index}" value="N"></td></tr></table> </div>',            
        '</tpl>',             
        '</tpl>'
        );     
		// 파일처리 팝업------------------------------------------
        file.overlayToolbar = new Ext.create('Ext.Toolbar',{
            docked: 'top',
            items:[{
                xtype:'button',
                text:'CLOSE',
                handler : function(btn) {
                    file.overlay.hide();
                    changeState();
                }
            }]             
        });                
        file.overlay = new Ext.create('Ext.Panel',{
            modal: true,
            centered: true,
            width:'95%',
            height:'95%',
            layout:{
            	type:'vbox',
            },
			items:[
			file.overlayToolbar,
			{
				xtype:'panel',
				id:'fileImage',
				html:'',
				flex:4,
	            scrollable:{
	            	direction:'vertical',
	            	directionLock:true
	            },					
			},{
				flex:1,
				layout:{
					type:'vbox'
				},
				items:[
	        	{
	        		xtype:'panel',
	        		layout:{
	        			xtype:'hbox',
	        		},
	        		items:
	        		[{
		        		xtype:'button',
		        		text:'OPEN',
		        		handler:function(){
				 			window.plugins.ExecFile.exec(
				 				selectedPath, { package: ' ', class:'zz'} );        			
		        		}
		        	},{ 
		        		xtype:'spacer',
		        		height:10,      	
		        	},
					{
		        		xtype:'button',
		        		text:'CLOSE',
		        		handler:function(){
		                    file.overlay.hide();
		                    changeState();
		        		}
		        	}]	        			        	
	        	}]
	        }]
        });
		// 조회 팝업------------------------------------------
        file.overlaySearchToolbar = new Ext.create('Ext.Toolbar',{
            docked: 'top',
            items:[{
                xtype:'button',
                text:'CLOSE',
                handler : function(btn) {
                    file.overlaySearch.hide();
                    changeState();
                }
            }]             
        });     
        file.overlaySearch = new Ext.create('Ext.Panel',{
            modal: true,
            centered: true,
            width:'95%',
            height:'95%',
            layout:{
            	type:'vbox'
            },            
			items:[
			file.overlaySearchToolbar,
			{
				xtype:'textfield',
				id:'searchname',
				label: 'Input Keyword'
			},{
				xtype:'button',
				text:'SEARCH',
				handler:function(){
			 		window.plugins.ExecFile.searchFile(Ext.getCmp('searchname').getValue(), rootPath);
				}
			},{
                xtype:'list',
                id:'searchlist',
                flex:1,
                disclosure:true,             
                itemTpl: '<div><font size="2">{filename}<BR><font color="green">{path}</a></font></div>',
                onItemDisclosure:function(record, item, index, e) {
                	var temp = storeSearchList.data.items[index].data.path;
                	currentPath = "file://" + temp.substring(0,temp.lastIndexOf('/'));
                	file.getCurrentDir();   
                	file.overlaySearch.hide();
                	changeState();       
                },
        	}]
        });        
		// 패키지선택 팝업------------------------------
        file.overlayPackageToolbar = new Ext.create('Ext.Toolbar',{
            docked: 'top',
            items:[{
                xtype:'button',
                text:'닫기',
                handler : function(btn) {
                    file.overlayPackage.hide();
                    changeState();
                }
            }]             
        });                
        file.overlayPackage = new Ext.create('Ext.Panel',{
            modal: true,
            centered: true,
            width:'95%',
            height:'95%',
            layout:{
            	type:'vbox'
            },
            scrollable:{
            	direction:'vertical',
            	directionLock:true
            },            
			items:[
			file.overlayPackageToolbar,
        	{
                xtype:'list',
                id:'packagelist',
                flex:1,             
                itemTpl: '>{l}',
	            listeners:{
	                itemtap:function(list,index, item){
	                	var temp = storePackageList.data.items[index].data.p;
			 			window.plugins.ExecFile.exec(selectedPath, { package: temp, class:'zz'} );
	                }
	            }, 
        	}]
        }); 
		// 메뉴 팝업----------------------------------
        file.overlayMenuToolbar = new Ext.create('Ext.Toolbar',{
            docked: 'top',
            items:[{
                xtype:'button',
                text:'CLOSE',
                handler : function(btn) {
                    file.overlayMenu.hide();
                    changeState();
                }                
            }]             
        });                
        file.overlayMenu = new Ext.create('Ext.Panel',{
            modal: true,
            centered: true,
            width:'95%',
            height:'95%',
            layout:{
            	type:'vbox',
            },          
			items:[
			file.overlayMenuToolbar,
			{
				flex:1,
				layout:{
					type:'vbox'
				},
				items:[{
	        		xtype:'button',
	        		text:'COPY',
	        		handler:function()
	        		{
	        			if(confirm('Copy Files?')== true)
	        			{
					        copyMode = "1";	// 1:복사,   2:이동 
					        copyedFiles = "";
					        tempFileList = "";
					        temp_i = 0;	        			
	        				for( i=0; i< fileListSize; i++){
								if( document.getElementsByName('checkBox' + i)[0].value == "1" ){
									if(temp_i != 0){
										copyedFiles = copyedFiles + "^|";
									}								
									copyedFiles = copyedFiles + document.getElementsByName('checkFile' + i)[0].value;
									temp_i = temp_i + 1;
									tempFileList = tempFileList + document.getElementsByName('checkFile' + i)[0].value + "<BR>"; 
								}
							}	
							Ext.getCmp("menuImage").setHtml("<font size='2'>" + tempFileList + "</font>");
							copyedArray = new Array();
							copyedNum = 0;					
							var txt1 = copyedFiles;		
							while(txt1.indexOf('^|') != -1){
								copyedArray[copyedArray.length] = txt1.substring(0,txt1.indexOf('^|'));
								txt1 = txt1.substring(txt1.indexOf('^|')+2, txt1.length);
							}
							copyedArray[copyedArray.length] = txt1;		
							copyedNum = copyedArray.length;						
							copyedLoopNum = copyedNum;
	        			}
	        		}
	        	},{
	        		xtype:'button',
	        		text:'MOVE',
	        		handler:function(){
	        			if(confirm('Move Files?')== true){
					        copyMode = "2";	// 1:복사,   2:이동 
					        copyedFiles = "";
					        temp_i = 0;	  
					        tempFileList = "";      			
	        				for( i=0; i< fileListSize; i++){
								if( document.getElementsByName('checkBox' + i)[0].value == "1" ){
									if(temp_i != 0){
										copyedFiles = copyedFiles + "^|";
									}								
									copyedFiles = copyedFiles + document.getElementsByName('checkFile' + i)[0].value;
									temp_i = temp_i + 1;
									tempFileList = tempFileList + document.getElementsByName('checkFile' + i)[0].value + "<BR>";
								}
							}	
							Ext.getCmp("menuImage").setHtml("<font size='2'>" + tempFileList + "</font>");
							copyedArray = new Array();
							copyedNum = 0;					
							var txt1 = copyedFiles;		
							while(txt1.indexOf('^|') != -1){
								copyedArray[copyedArray.length] = txt1.substring(0,txt1.indexOf('^|'));
								txt1 = txt1.substring(txt1.indexOf('^|')+2, txt1.length);
							}
							copyedArray[copyedArray.length] = txt1;		
							copyedNum = copyedArray.length;						
							copyedLoopNum = copyedNum;
	        			}
	        		}
	        	},{
	        		xtype:'button',
	        		text:'PASTE',
	        		handler:function(){
	        			if(confirm('Paste Files?')== true){
							if(copyMode == '1'){
								copyToDirLoop();
							}else if(copyMode == '2'){
								moveToDirLoop();
							}
						}
	        		}
	        	},{
	        		xtype:'button',
	        		text:'DELETE',
	        		handler:function(){
				        copyMode = "0";	// 1:복사,   2:이동 
				        copyedFiles = "";
				        tempFileList = "";
				        temp_i = 0;	        			
        				for( i=0; i< fileListSize; i++){
							if( document.getElementsByName('checkBox' + i)[0].value == "1" ){
								if(temp_i != 0){
									copyedFiles = copyedFiles + "^|";
								}								
								copyedFiles = copyedFiles + document.getElementsByName('checkFile' + i)[0].value;
								temp_i = temp_i + 1;
								tempFileList = tempFileList + document.getElementsByName('checkFile' + i)[0].value + "<BR>"; 
							}
						}	
						Ext.getCmp("menuImage").setHtml("<font size='2'>" + tempFileList + "</font>");
						if(confirm('Delete Files (' + temp_i + ') ?')== true){
							copyedArray = new Array();
							copyedNum = 0;					
							var txt1 = copyedFiles;		
							while(txt1.indexOf('^|') != -1){
								copyedArray[copyedArray.length] = txt1.substring(0,txt1.indexOf('^|'));
								txt1 = txt1.substring(txt1.indexOf('^|')+2, txt1.length);
							}
							copyedArray[copyedArray.length] = txt1;		
							copyedNum = copyedArray.length;						
							copyedLoopNum = copyedNum;	   
							removeToDirLoop();							
						}     			
	        		}
	        	},{
	        		xtype:'button',
	        		text:'SEARCH',	        		
	        		handler:function(){
                		file.overlayMenu.hide();                		
				        file.overlaySearch.setCentered(true);
				        file.overlaySearchToolbar.setTitle('SEARCH');
				        file.popupState = 1;
				        file.overlaySearch.show();	        			
	        		}
	        	}]
	        },{
				xtype:'panel',
				id:'menuImage',
				html:'',
				flex:1,
	            scrollable:{
	            	direction:'vertical',
	            	directionLock:true
	            },					
			}]
        });       
        // 메인화면 ------------------------------------
        file.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            html:'root',
            layout:{
                type:'vbox'
            },
            items: [{
                docked: 'top',
                xtype: 'toolbar',
                title:'File Manager',
                items: [{
                    text: 'Parent',
                    handler: function(btn,event){
                    	file.popupState = 0;
                        file.getDir(parentPath);
                    }
                },{
                	xtype:'spacer'                	
                },{
                	text:'MENU',
                	handler:function(btn, event){
				        file.overlayMenu.setCentered(true);
				        file.overlayMenuToolbar.setTitle('MENU');
				        file.popupState = 1;  
				        file.overlayMenu.show();
                	}
                }]
            },{
                docked: 'bottom',
                xtype: 'toolbar',
                title:'Sencha Touch',
            },{
                xtype:'list',
                id:'phonelist',
                flex:1,             
                itemTpl: itemTemplate, 
            }]
        });    
		file.setPath = function(){
			file.panel.setHtml('<font size="2">' + currentPath + '</font>');
		}
        file.getDir=function(inputpath){
        	if(file.popupState == 1)
        		return;
        	getDir(inputpath);
        }
		file.getCurrentDir = function( ){
			file.setPath();
			fileListSize = 0;
			currentPath = currentPath.replace("^^1", "'").replace("^^3", "\&").replace("^^2", "\n").replace("^^4", "'");			
			window.resolveLocalFileSystemURI(currentPath, successFileSystem, 
			failFileSystem); 	
        }
		// 파일 팝업 
        file.onPop=function(uri){ 
        	if(file.popupState == 1)
        		return;
			uri =  uri.replace("^^1", "'").replace("^^2", "\n").replace("^^3", "\&").replace("^^4", "'");
        	selectedPath = uri;
        	
	        file.overlay.setCentered(true);
	        file.overlayToolbar.setTitle('File Info');
	        
	        Ext.getCmp('fileImage').setHtml(file.getFileInfo());
	        file.popupState = 1;
	        file.overlay.show();  
        }
        // 리스트 파일선택
		file.checkFile = function( inputValue){     
        	if(file.popupState == 1)
        		return;
			if( document.getElementsByName('checkBox'+ inputValue )[0].value == "0" )
				document.getElementsByName('checkBox'+ inputValue )[0].value = "1";
			else	
				document.getElementsByName('checkBox'+ inputValue )[0].value = "0";
			if( document.getElementsByName('checkBox'+ inputValue )[0].value == "0" )
				document.getElementsByName('checkImg'+ inputValue )[0].src = "./img/empty1.png";
			else 
				document.getElementsByName('checkImg'+ inputValue )[0].src = "./img/check2.png";
		}
        file.getFileInfo = function()
        {
        	var temp_i = selectedPath.lastIndexOf(".");
        	var extName = selectedPath.substring(temp_i, selectedPath.length);
        	extName = extName.toLowerCase();	
        	var mimeType = "Unknown";
        	var imgSrc = "empty1.png";
        	if( extName == ".gif" ||
        		extName == ".jpg" ||
        		extName == ".jpeg" ||
        		extName == ".png" ||
        		extName == ".tif" ||
        		extName == ".tiff" ||
        		extName == ".bmp"){
        		mimeType = "image/*";
        		imgSrc = "photo2.png";        		
        	}
        	else if( extName == ".mp3"||
        			 extName == ".ogg" ||
        			 extName == ".3ga"){
        		mimeType = "audio/*";
        		imgSrc = "volume_up.png";
        	}
        	else if( extName == ".mp4" ||
        			 extName == ".kmv" || 
        			 extName == ".avi"){
        		mimeType = "video/*";
        		imgSrc = "video.png";
        	}
        	else if( extName == ".html" ||
        			extName == ".xml" ||
        			extName == ".css" ||
        			extName == ".htm"){
        		mimeType = "text/html";
        		imgSrc = "globe1.png";
        	}        	
        	else if( extName == ".text" ||
        			extName == ".txt" ||
        			extName  == ".doc" ||
        			extName ==".info"){
        		mimeType = "text/*";
        		imgSrc = "doc.png";
        	}        	
        	else if( extName == ".pdf"){
        		mimeType = "application/pdf";
        		imgSrc = "doc2.png";
        	}  
        	else if( extName == ".rtf"){
        		mimeType = "application/rtf";
        		imgSrc = "doc2.png";
        	}
        	else if( extName == ".xls" ||
        			extName == ".xlsx"){
        		mimeType = "application/vnd.ms-wxcel";
        		imgSrc = "calendar2.png";
        	}   
			var returnStr = "";
        	if( extName == ".gif" ||
        		extName == ".jpg" ||
        		extName == ".jpeg" ||
        		extName == ".png" ||
        		extName == ".tif" ||
        		extName == ".tiff" ||
        		extName == ".bmp"){
	        	returnStr =  "<BR><table style='table-layout:fixed' width='100%' ><tr><td><center><img src='"+ selectedPath + "' width='100%'></center></td></tr></table><font size=2><BR>File Type:" + extName + 
	        		"<BR>MIME TYPE:" + mimeType + "<BR>File Name:" + selectedPath + "</font>";
        	}        	
        	else{
	        	returnStr =  "<BR><table style='table-layout:fixed' width='100%' ><center><img src='./img/" + imgSrc + "' width='50%'></center></td></tr></table><font size=2><BR>File Type:" + extName + 
	        		"<BR>MIME TYPE:" + mimeType + "<BR>File Name:" + selectedPath + "</font>";
        	}
        	return returnStr; 
        }
        // 마스크 ------------------------------
        file.maskBodyLoading= new Ext.LoadMask( {
            message:"Waiting..."
        });
        file.loadingMask = function(){
            file.panel.setMasked(file.maskBodyLoading);
            file.maskBodyLoading.show();
            setTimeout("file.releaseMask()", 20000);
        }        
        file.releaseMask = function(){
            file.maskBodyLoading.hide();                
        }      
          
        file.smaskBodyLoading= new Ext.LoadMask({
            message:"Waiting..."
        });
        file.sloadingMask = function(){
            file.overlaySearch.setMasked(file.smaskBodyLoading);
            file.smaskBodyLoading.show();
            setTimeout("file.sreleaseMask()", 20000);
        }        
        file.sreleaseMask = function(){
            file.smaskBodyLoading.hide();                
        }        
        // 폰갭 모듈 -------------------------
        // 폴더를 관리하기 위한 Entry-------------
        var dirEntry;
		var directoryReader;
		// 파일, 폴더를 관리하기 위한 Entry -------
		var fileEntry;
		var fileReader;
        function successDir(entries){        
        	var fileData;
        	var dirData;
        	var strDir="";
        	var str="";
		    var i;
		    var i_file = 0;
		    var i_dir = 0;

			// 해당 경로의 파일목록을 읽어와 화면에 출력 ----
		    var size = entries.length;
		    for (i=0; i< size; i++) {
		    	// 파일일 경우
		        if(entries[i].isFile==true){
			        if( i_file != 0 ){
			        	str = str + ",";
			        } 
			        // 특수문자제거
		        	str = str + "{'index':'" + i + "', 'filename':'" + 
		        		entries[i].name.replace("'","^^1").replace("\&","^^3").replace("\n","^^2").replace("'","^^4") + 
		        		"','isFile':'" + entries[i].isFile + "','path':'" + 
		        		entries[i].fullPath.replace("'","^^1").replace("\&","^^3").replace("\n","^^2").replace("'","^^4") + 
		        		"'}";
		        	i_file = i_file+1;
		        } else {	// 폴더일 경우
		        	if( i_dir != 0 ){
			        	strDir = strDir + ",";
			        } 
			        // 특수문자 제거
		        	strDir = strDir + "{'index':'" + i + 
		        	"','filename':'" + 
		        	entries[i].name.replace("'","^^1").replace("\&","^^3").replace("\n","^^2").replace("'","^^4") + 
		        	"','isFile':'" + 
		        	entries[i].isFile + "','path':'" + 
		        	entries[i].fullPath.replace("'","^^1").replace("\&","^^3").replace("\n","^^2").replace("'","^^4") + 
		        	"'}";
		        	i_dir = i_dir+1;
		        }
		    }	
		    // 읽어온 폴더와 파일을 store에 저장한뒤 정렬하여 리스트에 출력
		    fileListSize = size;
		    fileData = Ext.decode("[" + str + "]");
		    dirData = Ext.decode("[" + strDir + "]");
		    storeFileList.setData(dirData);
            storeFileList.addData(fileData);
            storeFileList.sort([
                {
                    property : 'isFile',
                    direction: 'ASC'
                },{
                    property : 'filename',
                    direction: 'ASC'
                }
            ]);
            Ext.getCmp('phonelist').setStore(storeFileList);
            file.releaseMask();		    
		}
		function failDir(error) {
		    alert("Failed to list directory contents: " + error.code);
		    file.releaseMask();
		}
		// 부모 폴더를 변수에 보관 (Parent 버튼을 누를때 이동하기 위함)		
		function successParent(parent){
			parentPath = parent.fullPath;			
		}
		function failParent(error){
			alert('error:' + error.code);
		}		
		// 파일 읽기
		function successFileSystem(directoryEntry){
			dirEntry=directoryEntry; 
			if(rootPath == ''){
				rootPath = dirEntry.fullPath;
				currentPath = rootPath;
				file.setPath();
			}	
			directoryEntry.getParent(successParent, failParent);
			directoryReader = directoryEntry.createReader();
			directoryReader.readEntries(successDir,failDir);
		}
		function failFileSystem(error){
			alert('error:' + error.code);
			file.releaseMask();
		}
		// 경로를 읽어와 처리함
		function getDir( inputpath ){
			inputPath = inputpath.replace("^^1", "'").replace("^^3", "\&").replace("^^2", "\n").replace("^^4", "'");			
			currentPath = inputPath;
			file.setPath();
			fileListSize = 0;
			file.loadingMask();
			window.resolveLocalFileSystemURI(inputPath, successFileSystem, 
			failFileSystem); 	
        }      
        // 처음시작시 ROOT 경로를 읽어와 처리함
		function getRootDir( inputpath ){
			fileListSize = 0;
			file.loadingMask();
		    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
		    	function(fileSystem){
		    		root= fileSystem.root;
		    		successFileSystem(root);
		    	},
		    	function(evt){
		    		alert('file read error!! : ' + evt.target.error.code);
		    		console.log(">>>>" + evt.target.error.code);
		    		file.releaseMask();
		    	}
		    );
        }
        // 디바이스가 준비될 경우 발생하는 이벤트 
        // ROOT 경로를 읽어오고, 메뉴버튼과 벡버튼을 특정 이벤트로 변환한다.
        function onDeviceReady() {
			getRootDir();
	        document.addEventListener("menubutton", onMenuButton, false);
	        document.addEventListener("backbutton", onBackButton, false);			
        }
		// 메뉴버튼이 누를 경우 팝업메뉴를 보여준다.
	    function onMenuButton() {
	        file.overlayMenu.setCentered(true);
	        file.overlayMenuToolbar.setTitle('메뉴');
	        file.popupState = 1;  
	        file.overlayMenu.show();
	    }	    
	    // 백버튼을 띄울 경우 팝업상태의 창을 닫거나 상위 폴더로 이동한다.
	    function onBackButton() {
	    	if(file.popupState == 1){
	    		file.popupState = 0;
	    		file.overlay.hide();
	    		file.overlayMenu.hide();
	    		file.overlaySearch.hide();
	    	}else{
	        	file.popupState = 0;
	            file.getDir(parentPath);
	        }
	    }	
		// 디바이스가 준비되면  onDeviceReady 이벤트를 호출한다.
		document.addEventListener("deviceready", onDeviceReady, false);
        function win(r) {
        }
        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
        } 
		// 파일처리 종료 ---------------------
		// 플러그인 함수 ---------------------   
		// 플러그인 개체를 생성한다.
		function ExecFile() {
		};
		ExecFile.install = function(){
    		return window.plugins.ExecFile;
		}; 
		cordova.addConstructor(function() {
		    cordova.addPlugin("ExecFile", new ExecFile());
		});	
		//플러그인 에러시처리할 메소드
		ExecFile.prototype._onError = function(data) {
		    if (typeof window.plugins.execfile.onError === "function") {
		        window.plugins.childBrowser.onError(data);
		    }
		};		
		//플러그인 실행시 메도스
		ExecFile.prototype.exec = function(url, options) {
		    cordova.exec( '', '', "ExecFile", "exec", [url, options]);
		};
		// 패키지 리스트를 불러온뒤 리턴될 함수
		ExecFile.onPackageList = function(data) {
            storePackageList.setData(Ext.decode(data));
            Ext.getCmp('packagelist').setStore(storePackageList);
            storePackageList.load();			
		};		
		//플러그인의 패키지 리스트를 불러온다.		
		ExecFile.prototype.getPackageList = function(url, options) {
		    cordova.exec( ExecFile.onPackageList, '', "ExecFile", "getPackageList", [url, options]);
		};
		// 조회리스트를 불러온뒤 리턴될 함수
		ExecFile.onSearchList = function(data) {
            storeSearchList.setData(Ext.decode(data));
            Ext.getCmp('searchlist').setStore(storeSearchList);
            storeSearchList.load();	
            file.sreleaseMask();		
		};			
		// 플러그인의 조회결과를 호출한다.
		ExecFile.prototype.searchFile = function(url, options) {
			file.sloadingMask();
		    cordova.exec( ExecFile.onSearchList, '', "ExecFile", "searchFile", [url, options]);
		};	

		// 공통함수--------------------------------------------
		function changeState(){
			setTimeout('file.popupState=0',1000);
		}
		function getShortName(inputValue){
			if(inputValue.length > 40)
				inputValue = inputValue.substring(0,20) + "<BR/>" + inputValue.substring(20,40) + "<BR/>" + inputValue.substring(40);
			else if(inputValue.length > 20)
				inputValue = inputValue.substring(0,20) + "<BR/>" + inputValue.substring(20);
			return inputValue
		}
		// 폴더 복사 함수------------------------------
		function successCopy(entry){
			copyToDirLoop();
		}		
		function failCopy(error){
			alert("Copy Error:" + copyedArray[copyedLoopNum] + ":" + error.code);
			copyedLoopNum = 0;
		}
		function successCopyFileSystem(directoryEntry){
			if(directoryEntry.isFile==true){
				var tempFileEntry=directoryEntry; 
				var tempCurrentName = currentPath.substring(currentPath.lastIndexOf("/") + 1);
				var tempCurrentEntry = new DirectoryEntry(tempCurrentName, currentPath);
				tempFileEntry.copyTo(tempCurrentEntry, tempFileEntry.name , successCopy, failCopy);				
			} else{
				var tempDirEntry=directoryEntry; 
				var tempCurrentName = currentPath.substring(currentPath.lastIndexOf("/") + 1);
				var tempCurrentEntry = new DirectoryEntry(tempCurrentName, currentPath);
				tempDirEntry.copyTo(tempCurrentEntry, tempDirEntry.name , successCopy, failCopy);
			}
		}		
		function failCopyFileSystem(error){
			alert('File Read Error:' + copyedArray[copyedLoopNum] + ":" + error.code);
			copyedLoopNum = 0;
		}
		function copyToDir( inputpath ){
			window.resolveLocalFileSystemURI(inputpath, successCopyFileSystem, 
				failCopyFileSystem); 	
        }	
		function copyToDirLoop(){
			copyedLoopNum = copyedLoopNum -1;
			if(copyedLoopNum < 0){
				alert('Copy '+ copyedNum + ' Complete!!');
				Ext.getCmp("menuImage").setHtml("");				
				copyedNum = 0;
				copyedArray = new Array();
				copyedLoopNum = 0;
				copyMode ='0';
				copyedFiles = "";	
				file.getCurrentDir();	
                file.overlay.hide();
                changeState();						
				return;
			}	
			copyToDir(copyedArray[copyedLoopNum]);
		}        
		// 폴더 이동 함수------------------------------
		function successMove(entry){
			moveToDirLoop();
		}		
		function failMove(error){
			alert("Move File Error:" + copyedArray[copyedLoopNum] + ":" +  error.code);
			copyedLoopNum = 0;
		}
		function successMoveFileSystem(directoryEntry){
			if(directoryEntry.isFile==true){
				var tempFileEntry=directoryEntry; 
				var tempCurrentName = currentPath.substring(currentPath.lastIndexOf("/") + 1);
				var tempCurrentEntry = new DirectoryEntry(tempCurrentName, currentPath);
				tempFileEntry.moveTo(tempCurrentEntry, tempFileEntry.name , successMove, failMove);				
			} else {
				var tempDirEntry=directoryEntry; 
				var tempCurrentName = currentPath.substring(currentPath.lastIndexOf("/") + 1);
				var tempCurrentEntry = new DirectoryEntry(tempCurrentName, currentPath);
				tempDirEntry.moveTo(tempCurrentEntry, tempDirEntry.name , successMove, failMove);
			}
		}		
		function failMoveFileSystem(error){
			alert('File Read Error:' + copyedArray[copyedLoopNum] + ":" + error.code);
			copyedLoopNum = 0;
		}
		function moveToDir( inputpath ){
			window.resolveLocalFileSystemURI(inputpath, successMoveFileSystem, 
				failMoveFileSystem); 	
        }	
		function moveToDirLoop(){
			copyedLoopNum = copyedLoopNum -1;
			if(copyedLoopNum < 0){
				alert('Move '+copyedNum + ' Files. Complete!!');
				Ext.getCmp("menuImage").setHtml("");
				copyedNum = 0;
				copyedArray = new Array();
				copyedLoopNum = 0;
				copyMode ='0';
				copyedFiles = "";			
				file.getCurrentDir();	
                file.overlay.hide();
                changeState();				
				return;
			}	
			moveToDir(copyedArray[copyedLoopNum]);
		}       
		// 폴더 삭제 함수------------------------------
		function successRemove(entry){
			removeToDirLoop();
		}		
		function failRemove(error){
			alert("Remove File Error:" + copyedArray[copyedLoopNum] + ":" + error.code);
		}
		function successRemoveFileSystem(directoryEntry){
			if(directoryEntry.isFile==true){
				var tempFileEntry=directoryEntry; 
				var tempCurrentName = currentPath.substring(currentPath.lastIndexOf("/") + 1);
				var tempCurrentEntry = new DirectoryEntry(tempCurrentName, currentPath);
				tempFileEntry.remove(successRemove, failRemove);				
			} else {			
				var tempDirEntry=directoryEntry; 
				var tempCurrentName = currentPath.substring(currentPath.lastIndexOf("/") + 1);
				var tempCurrentEntry = new DirectoryEntry(tempCurrentName, currentPath);
				tempDirEntry.remove(successRemove, failRemove);
			}
		}		
		function failRemoveFileSystem(error){
			alert('File Read Error:' + copyedArray[copyedLoopNum] + ":" + error.code);
		}
		function removeToDir( inputpath ){
			window.resolveLocalFileSystemURI(inputpath, successRemoveFileSystem, 
				failRemoveFileSystem); 	
        }	
		function removeToDirLoop(){
			copyedLoopNum = copyedLoopNum -1;
			if(copyedLoopNum < 0){
				alert('Remove '+ copyedNum + ' Files. Complete!!');
				Ext.getCmp("menuImage").setHtml("");
				copyedNum = 0;
				copyedArray = new Array();
				copyedLoopNum = 0;
				copyMode ='0';
				copyedFiles = "";
				file.getCurrentDir();
                file.overlay.hide();
                changeState();				
				return;
			}	
			removeToDir(copyedArray[copyedLoopNum]);
		}        		
    }
});