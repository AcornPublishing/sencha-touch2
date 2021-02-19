Ext.define("FileApp.view.FileView", {
    extend: 'Ext.Panel',   
    xtype:'fileview',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'FileApp.view.FileList',
        ],      
    config:{
        fullscreen: true,
        layout:{
            type:'vbox',
            
        },
        items: [
        {
            docked: 'top',
            xtype: 'toolbar',
            title:'파일 탐색기',
            items: [{
                name: 'searchfile',
 			    text: '상위폴더',
            }]
        }]      
    }
});