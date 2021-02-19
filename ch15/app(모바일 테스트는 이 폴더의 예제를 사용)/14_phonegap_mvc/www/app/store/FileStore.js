Ext.define('FileApp.store.FileStore', {
    extend  : 'Ext.data.Store',    
    requires: ['FileApp.model.FileModel'],
    config:{
        model:'FileApp.model.FileModel',
		sorter:'filename',
        autoLoad:true,          
    }
});