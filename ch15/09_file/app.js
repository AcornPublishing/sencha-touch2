Ext.ns("file");

Ext.application({
    name:'file',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.List',
        'Ext.data.Store',
        ],
        
    launch:function(){
        
        Ext.define('filelist', {
            extend:'Ext.data.Model',
            config:{
             fields: ['filename']
            }
        });
        var orgData= [{filename: '파일1' },
                      {filename: '파일2' },
                      {filename: '파일3' }];

        var storeFileList =   new Ext.create('Ext.data.Store',{
                model: 'filelist',
                sorters: 'filename',                
                data: orgData,
                autoLoad:true,
        });             

            
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
                        alert('가져오기');
                        storeFileList.setData(orgData);
                        Ext.getCmp('phonelist').setStore(storeFileList);
                    }
                }]
            },
            {
                xtype:'list',
                id:'phonelist',
                flex:1,             
                itemTpl: '<div ><table width="100%"><tr><td width="20%"><img src="./img/doc.png"></td><td width="60%">{filename}</td><td width="20%"><a href="javascript:onMoveDir()"><img src="./img/code3.png"></a></td></tr></table> </div>',         
            }]
        });    
    }
});