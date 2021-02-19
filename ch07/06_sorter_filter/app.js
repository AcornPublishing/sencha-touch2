

Ext.application({
    name:'proxy',
    requires:[
        'Ext.Panel',
        'Ext.Ajax',
        'Ext.data.AjaxProxy',
        'Ext.data.Store',
        'Ext.List',
        'Ext.Toolbar',
        'Ext.form.FieldSet'],
    
    launch:function(){

        Ext.define('Users', {
            extend:'Ext.data.Model',
            config:{
             fields: ['users']
            }
        });     

        UserProxy = new Ext.create('Ext.data.AjaxProxy',{
            type:'ajax',
            url: 'ajaxdata.jsp',
            reader:{
                type:'json',
                rootProperty:'users',
            }
        });         
        
        UserStore = new Ext.create('Ext.data.Store',{
            autoLoad:true,          
            fields:[
                {name:'id', type:'int'},
                {name:'name', type:'string'},
                {name:'tel', type:'string'}
            ],
            proxy: UserProxy,
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
            itemTpl:'<div><strong>{id}</strong>{name}  {tel}</div>',
        });        

        new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox',
                
            },
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title:'Sorter,Filter',
                items:[
                {
                    xtype:'button',
                    text:'정렬',
                    handler:function()
                    {
                    
                        //UserStore.sort('name', 'desc');  

                        UserStore.sort([
                            {
                                property : 'name',
                                direction: 'ASC'
                            },
                            {
                                property : 'tel',
                                direction: 'DESC'
                            }
                        ]);
                      
                    }
                },{
                    xtype:'button',
                    text:'필터',
                    handler:function()
                    {                       
                        UserStore.filter('tel', '222', true);
                    }                  
                },{
                    xtype:'spacer'
                },{
                    xtype:'button',
                    text:'원래대로',
                    handler:function()
                    {
                        UserStore.clearFilter(false); 
                    }                  
                }]
            },
            UserList]            
        });
    }
});