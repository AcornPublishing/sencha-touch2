Ext.require('Ext.Ajax');
Ext.require('Ext.data.AjaxProxy');
Ext.require('Ext.data.Store');
Ext.require('Ext.List');
Ext.require('Ext.form.FieldSet');
Ext.require('Ext.data.reader.Xml');

Ext.application({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    requires:[
        'Ext.Panel',
        'Ext.Ajax',
        'Ext.data.AjaxProxy',
        'Ext.data.Store',
        'Ext.Toolbar',
        'Ext.List',
        'Ext.form.FieldSet'],
    launch: function() {
        Ext.define('User', {
            name:'user',
            extend:'Ext.data.Model',
            config:{
                fields: [                  
                    {name: 'name',  type: 'string'},
                    {name: 'tel',       type: 'string'},
                    {name: 'id',       type: 'auto'}
                ],
                hasMany: 'Hobby',
            }
        });
        Ext.define('Hobby', {
            name:'hobby',
            extend:'Ext.data.Model',            
            config:{
                fields: [    
                    {name: 'id', type: 'auto'},
                    {name: 'play', type: 'string'},
                    {name: 'tv',  type: 'string'}
                ],
            }
        });          
        var myStore = new Ext.create('Ext.data.Store',{
            model: 'User',
            
            proxy: {
                type: 'ajax',
                url : 'ajaxdata.jsp',
                reader: {
                    type: 'json',
                    rootProperty: 'users',
                    associationKey:'id'
                }
            },
        });
        myStore.load();


        panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:'fit',
            id: 'content',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title: '복잡한 데이터 처리',
            }]
            
        });
        
        var template = new Ext.XTemplate([
                '<div>{id} {name} {tel} ',
                    '<tpl for="hobby">',
                        '<div><font color="blue"><small>{play} {tv}</small></font></div>',
                    '</tpl>',
                '</div>'

                ]);        
        list = new Ext.create('Ext.List',{
            store:myStore,
            flex:1,
            itemTpl:template,
        });    
        
        panel.add(list);        
    }
});