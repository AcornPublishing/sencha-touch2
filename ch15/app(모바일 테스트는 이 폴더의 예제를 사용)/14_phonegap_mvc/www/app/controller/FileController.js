Ext.define('FileApp.controller.FileController', {
    extend: 'Ext.app.Controller',
    parentPath:"file:///sdcard",
    dirEntry:'',
	directoryReader:'',
	me:this,
	fileList:'',
    config: {
        refs: {
            fileView: 'fileview',
            fileList: 'filelist',
            searchFile:'fileview [name=searchfile]',
        },
        control: {
            fileList: {
                itemtap: 'onFileList'
            },
            searchFile:{
            	tap:'onGetMyDir',
            }
        }
    },
    launch: function() {         
        panel= Ext.create('FileApp.view.FileView');
    	Ext.Viewport.add(panel);
    	fileList = Ext.create('FileApp.view.FileList');
    	panel.add(fileList);
    	me = this;
        this.startPhoneGap();
    },    
    onGetMyDir:function(btn,event)
    {    	
    	this.getMyDir(parentPath);
    },
	getMyDir:function(inputpath)
	{
		me.getDirPath(inputpath);
	},
	onUpload:function(uri)
	{ 
		me.uploadPhoto(uri);
	},    
    onFileList:function(list, index, item){
    	if(Ext.getStore('FileStore').data.items[index].data.isFile == 'true')
    	{
        	file.onUpload(storeFileList.data.items[index].data.path);
        }
        else
        {
        	alert('hi1');
        	me.getMyDir(Ext.getStore('FileStore').data.items[index].data.path);	                    
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
	    alert(str);
	    var fileData = Ext.decode("[" + str + "]");
	    me.setListData(fileData);
	},
	failDir:function(error) {
	    alert("Failed to list directory contents: " + error.code);
	},
	setListData:function(data)
	{
	    Ext.getStore('FileStore').setData(data);
	    Ext.getStore('FileStore').load({
            callback: this.onFileLoad,           
            scope: this
        });
	},
	onFileLoad:function()
	{
		this.getFileList().setStore(Ext.getStore('FileStore'));
	},
	successParent:function(parent)
	{
		parentPath = parent.fullPath;
	},
	failParent:function(parent)
	{

	},		
	successFileSystem:function(directoryEntry){
		//alert('hizzz');
		me.dirEntry=directoryEntry; 
		directoryEntry.getParent(me.successParent, me.failParent);
		//alert('hizzz2');
		me.directoryReader = directoryEntry.createReader();
		//alert('hizzz2');
		me.directoryReader.readEntries(me.successDir,me.failDir);
	},
	failFileSystem:function(){
		alert('오류');
	},
	getDirPath:function(inputpath )
	{
		//alert('getDir호출');
		window.resolveLocalFileSystemURI(inputpath, me.successFileSystem, 
			me.failFileSystem); 	
	},
	onDeviceReady:function() {
		//alert('hi21');
		console.log(this);
		me.getMyDir("file:///sdcard");
	},	
	startPhoneGap:function()
	{
		document.addEventListener("deviceready", me.onDeviceReady, false);
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
	    ft.upload(imageURI, "http://some.server.com/upload.php", me.win, me.fail, options);
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
	},    
});
