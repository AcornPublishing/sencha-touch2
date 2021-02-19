
Ext.define('FileApp.controller.FileController', {
    extend: 'Ext.app.Controller',
    parentPath:"file:///sdcard",
    requires:[ 
    	'FileApp.lib.Hybrid',
    ],
    config: {
        refs: {
            fileView: 'fileview',
            fileList: 'filelist',
            hybrid: 'hybrid',
        },
        control: {
            fileList: {
                itemTap: 'onFileList'
            }
        }
    },
    launch: function() {

		var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '<tpl if="isFile==\'true\'">',
                '<div ><table width="100%"><tr><td width="20%"><img src="./img/doc.png"></td><td width="60%">{filename}</td><td width="20%"><onClick="javascript:file.onUpload({path})"><img src="./img/doc_up.png"></a></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="isFile==\'false\'">',
                '<div ><table width="100%"><tr><td width="20%"><img src="./img/folder_add.png"></td><td width="60%">{filename}</td><td width="20%"><onClick="javascript:this.getDir({path})"><img src="./img/code3.png"></a></td></tr></table> </div>',            
                '</tpl>',             
            '</tpl>'
        );  
            
        panel= Ext.create('FileApp.view.FileView');
    	Ext.Viewport.add(panel);
    	panel.add(this.getFileList());

       	/*     	
        Ext.getStore('FileStore').load({
            callback: this.onProxyLoad,
            scope: this
        });
        */
        hybrid = Ext.create('FileApp.lib.Hybrid');
        
        
        this.startPhoneGap();
    },
	getDir:function(inputpath)
	{
		this.getDirPath(inputpath);
	},
	onUpload:function(uri)
	{ 
		this.uploadPhoto(uri);
	},    
    onFileList:function(list, index, item){

        alert(index + '번이 선택되었습니다.');

    	if(Ext.getStore('FileStore').data.items[index].data.isFile == 'true')
    	{
        	file.onUpload(storeFileList.data.items[index].data.path);
        }
        else
        {
        	alert('hi');
        	this.getDir(Ext.getStore('FileStore').data.items[index].data.path);	                    
        }
    },
	
	successDir:function(entries) {
	
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
	    this.getFileList().setData(fileData);
	    Ext.getStore('FileStore').setStore(storeFileList);		    
	    
	    
	},
	failDir:function(error) {
	    alert("Failed to list directory contents: " + error.code);
	},
	successParent:function(parent)
	{
		parentPath = parent.fullPath;
	},
	failParent:function(parent)
	{
		alert('오류');
	},		
	successFileSystem:function(directoryEntry){
		dirEntry=directoryEntry; 
		directoryEntry.getParent(successParent, failParent);
		
		directoryReader = directoryEntry.createReader();
		directoryReader.readEntries(this.successDir,this.failDir);
	},
	failFileSystem:function(){
		alert('오류');
	},
	getDirPath:function(inputpath )
	{
		alert('getDir호출');
		window.resolveLocalFileSystemURI(inputpath, this.successFileSystem, 
			this.failFileSystem); 	
	},
	onDeviceReady:function() {
		alert('hi21');
		getDir("file:///sdcard");
	},	
	startPhoneGap:function()
	{
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},
	uploadPhoto:function(imageURI) {
	    var options = new FileUploadOptions();
	    options.fileKey="file";
	    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	    options.mimeType="image/jpeg";
	
	    var params = new Object();
	    params.value1 = "test";
	    params.value2 = "param";
	
	    options.params = params;
	
	    var ft = new FileTransfer();
	    ft.upload(imageURI, "http://some.server.com/upload.php", this.win, this.fail, options);
	},
	win:function(r) {
	    console.log("Code = " + r.responseCode);
	    console.log("Response = " + r.response);
	    console.log("Sent = " + r.bytesSent);
	},
	fail:function(error) {
	    alert("An error has occurred: Code = " + error.code);
	    console.log("upload error source " + error.source);
	    console.log("upload error target " + error.target);
	}      
});
