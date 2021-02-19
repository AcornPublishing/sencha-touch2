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
            title:'����Ž����',
            items: [{
                text: '�����޴���',
                handler: function(btn,event){
                    //file.getDir(parentPath);
                }
            }]
        }]      
    }
});
