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
        'Ext.data.Store',
        'PhoneGap',
        ],
    viewport : {
        preventZooming : false
    },        
    launch:function(){
        
        var parentPath = "file:///sdcard";
        Ext.define('filelist', {
            extend:'Ext.data.Model',
            config:{
             fields: ['filename', 'isFile', 'path']
            }
        });
        var orgData= [{filename: '파일1' , isFile:'true', path:''}];

        var storeFileList =   new Ext.create('Ext.data.Store',{
                model: 'filelist',
                sorters: 'filename',                
                data: orgData,
                autoLoad:true,
               
        });             
		
		var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '<tpl if="isFile==\'true\'">',
                '<div ><table width="100%"><tr><td width="20%"><img src="./img/doc.png"></td><td width="60%">{filename}</td><td width="20%"><onClick="javascript:file.onUpload({path})"><img src="./img/doc_up.png"></a></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="isFile==\'false\'">',
                '<div ><table width="100%"><tr><td width="20%"><img src="./img/folder_add.png"></td><td width="60%">{filename}</td><td width="20%"><onClick="javascript:file.getDir({path})"><img src="./img/code3.png"></a></td></tr></table> </div>',            
                '</tpl>',             
            '</tpl>'
            );       
            
        file.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox'
            },
            items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title:'파일탐색기',
                items: [{
                    text: '상위메뉴로',
                    handler: function(btn,event){
                        file.getDir(parentPath);
                        //storeFileList.setData(orgData);
                        //Ext.getCmp('phonelist').setStore(storeFileList);
                    }
                }]
            },
            {
                xtype:'list',
                id:'phonelist',
                flex:1,             
                itemTpl: itemTemplate, //'<div ><table width="100%"><tr><td width="20%"><img src="./img/doc.png"></td><td width="60%">{filename}</td><td width="20%"><a href="javascript:onMoveDir()"><img src="./img/code3.png"></a></td></tr></table> </div>',
	            listeners:{
	                itemtap:function(list,index, item)
	                {
	                	if(storeFileList.data.items[index].data.isFile == 'true')
	                	{
	                    	file.onUpload(storeFileList.data.items[index].data.path);
	                    }
	                    else
	                    {
	                    	file.getDir(storeFileList.data.items[index].data.path);	                    
	                    }
	                }
	            },                          
            }]
        });    
        
        file.getDir=function(inputpath)
        {
        	getDir(inputpath);
        }
        
        file.onUpload=function(uri)
        { 
        	uploadPhoto(uri);
        }
		var dirEntry;
		var directoryReader;

        function successDir(entries) {
        
        	var fileData;
        	var str="";
		    var i;
		    for (i=0; i<entries.length; i++) {
		        console.log(entries[i].name);
		        if( i != 0 )
		        {
		        	str = str + ",";
		        } 
		        str = str + "{'filename':'" + entries[i].name + "','isFile':'" + entries[i].isFile + "','path':'" + entries[i].fullPath + "'}";
		    }
		    
		    fileData = Ext.decode("[" + str + "]");
            storeFileList.setData(fileData);
            Ext.getCmp('phonelist').setStore(storeFileList);		    
		    
		    
		}
		function failDir(error) {
		    alert("Failed to list directory contents: " + error.code);
		}
		
		function successParent(parent)
		{
			parentPath = parent.fullPath;
		}
		function failParent(parent)
		{
			alert('오류');
		}		
		function successFileSystem(directoryEntry){
			dirEntry=directoryEntry; 
			directoryEntry.getParent(successParent, failParent);
			
			directoryReader = directoryEntry.createReader();
			directoryReader.readEntries(successDir,failDir);
		}
		function failFileSystem(){
			alert('오류');
		}

		function getDir(inputpath )
		{
			window.resolveLocalFileSystemURI(inputpath, successFileSystem, 
			failFileSystem); 	
        }
        
        
        function onDeviceReady() {
			getDir("file:///sdcard");
        }
		
		document.addEventListener("deviceready", onDeviceReady, false);
		
        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://some.server.com/upload.php", win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }        
    }
});