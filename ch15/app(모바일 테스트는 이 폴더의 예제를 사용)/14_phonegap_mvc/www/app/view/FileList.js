Ext.define("FileApp.view.FileList", {
    extend: 'Ext.List',   
    xtype:'filelist',
    id:'filelist',
    config:{
        flex:1,
        itemTpl:['<tpl for=".">',
                '<tpl if="isFile==\'true\'">',
                '<div ><table width="100%"><tr><td width="20%"><img src="./img/doc.png"></td><td width="60%">{filename}</td><td width="20%"><onClick="javascript:file.onUpload({path})"><img src="./img/doc_up.png"></a></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="isFile==\'false\'">',
                '<div ><table width="100%"><tr><td width="20%"><img src="./img/folder_add.png"></td><td width="60%">{filename}</td><td width="20%"><onClick="javascript:this.getMyDir({path})"><img src="./img/code3.png"></a></td></tr></table> </div>',            
                '</tpl>',             
            '</tpl>']
    }
});