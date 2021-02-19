Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.define('FileApp.lib.Hybrid',{
	xtype:'hybrid',
	dirEntry:'',
	directoryReader:'',
	requires:['PhoneGap'],
	
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
	    storeFileList.setData(fileData);
	    Ext.getCmp('phonelist').setStore(storeFileList);		    
	    
	    
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
		directoryReader.readEntries(successDir,failDir);
	},
	failFileSystem:function(){
		alert('오류');
	},
	
	getDir:function(inputpath )
	{
		window.resolveLocalFileSystemURI(inputpath, this.successFileSystem, 
		this.failFileSystem); 	
	},
	
	
	onDeviceReady:function() {
		getDir("file:///sdcard");
	},
	
	startPhoneGap:function()
	{
		document.addEventListener("deviceready", onDeviceReady, false);
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
	    ft.upload(imageURI, "http://some.server.com/upload.php", win, fail, options);
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