Ext.ns('common');

common.init= function()
{
    common.empModel = Ext.define('emps', {
        extend:'Ext.data.Model',
        config:{
        	fields: ['num', 'name']
        }
    });            
    common.empStorageStore = new Ext.create('Ext.data.Store', {
        model:'emps',
        autoLoad:true,
        autoSave:true,
        proxy:{
            type:'localstorage',
            id: 'empsStoreStorage'
        }
    }); 	
}