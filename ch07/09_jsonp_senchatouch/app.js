
Ext.application({
    name:'JSONP',
    requires:[
        'Ext.Panel',
        'Ext.Ajax',
        'Ext.data.AjaxProxy',
        'Ext.data.JsonP',
        'Ext.data.Store',
        'Ext.List',
        'Ext.form.FieldSet',
        'Ext.Toolbar'],
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

        Ext.data.JsonP.request({
            url:'ajaxdata.jsp',
            callbackKey:'callback',
            root:'users',
            success:function(response)
            {
                console.log(response);
                data =  response.users;
                
                UserStore = Ext.create('Ext.data.Store', {
                   model: 'Users',
                   sorters: 'name',
                   data:data,
                });     

                panel = new Ext.create('Ext.Panel',{
                    fullscreen: true,
                    layout:{
                        type:'vbox',
                        
                    },
                    id: 'content',
                    items: [{
                        xtype: 'toolbar',
                        docked: 'top',
                        title:'JSONP ',
                    }]                  
                }); 
                userList = new Ext.create('Ext.List',{
                    flex:1,
                    store:UserStore,
                    onItemDisclosure: {
                        handler: function(record, btn, index) {
                            alert(record.get('name') + "º±≈√ index:" + index);
                        }
                    },
                    itemTpl:'<div><strong>{id}</strong>{name} {tel}</div>',
                });     
                panel.add(userList);            
            }
        });        
    }
});