
Ext.application({
    name:'SCRIPTTAG',
    requires:[
        'Ext.Panel',
        'Ext.Ajax',
        'Ext.List',
        'Ext.form.FieldSet',
        'Ext.Toolbar',
        'Ext.data.AjaxProxy',
        'Ext.data.JsonP',
        'Ext.data.proxy.JsonP',
        'Ext.data.Store'],
    launch:function(){
        
        var UserList;
        var UserStore;
        var UserProxy;
        var UserModel;
        var NameStore;
        var AgeStore;

        Ext.define('Users', {
            extend:'Ext.data.Model',
            config:{
             fields: ['id', 'name','tel']
            }
        });     
         var UserStore = new Ext.data.Store({
            model: 'Users',
            proxy: {
                type: 'scripttag',
                url:'./ajaxdata.jsp',
                reader: {
                    type: 'json',
                    rootProperty: 'users'
                }
            },  
            autoLoad: true
        });    
        UserList = new Ext.create('Ext.List',{
            flex:1,
            store:UserStore,
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('name') + "선택 index:" + index);
                }
            },
            itemTpl:'<div><strong>{id}</strong>{name} {tel}</div>',
        });     
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox',
            },
            id: 'content',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title:'SCRIPT TAG ',
            },
            UserList
            ]
        }); 
    }
});