
Ext.application({
    name:'XML',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.Ajax',
        'Ext.data.AjaxProxy',
        'Ext.data.Store',
        'Ext.List',
        'Ext.form.FieldSet',
        'Ext.data.reader.Xml'],
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
                fields: [
                    {name: 'id',    type: 'int'},
                    {name: 'name',  type: 'string'},
                    {name: 'tel',   type: 'string'}
                ]
            }
        });     
        UserStore = new Ext.create('Ext.data.Store',{
            autoLoad:true,          
            fields:[
                {name:'user', type:'string'}
            ],
             proxy:{
                type:'ajax',
                url: 'ajaxdata.jsp',
                reader:{
                    type:'xml',
                    rootProperty:'users',
                        record: 'user'                  
                }
            },            
            model:'Users',
        });   
        UserList = new Ext.create('Ext.List',{
            flex:1,
            store:UserStore,
            SelectedItemCls:'x-list-oAge',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('name') + "선택 index:" + index);
                }
            },
            itemTpl:'<div><strong>{id}</strong><strong>{name}</strong><strong>{tel}</strong></div>',
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
                title:'XML처리',
            },
            UserList]
        });
    }
});