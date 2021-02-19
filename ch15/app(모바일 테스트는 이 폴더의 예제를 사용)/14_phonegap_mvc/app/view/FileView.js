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
            title:'파일탐색기',
            items: [{
                text: '상위메뉴로',
                handler: function(btn,event){
                    //file.getDir(parentPath);
                }
            }]
        }]      
    }
});
