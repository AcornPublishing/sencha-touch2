
Ext.define('FormApp.store.MaleFamaleStore', {
    extend  : 'Ext.data.Store',
    
    requires: ['FormApp.model.MaleFamaleModel'],
    config: {
       	data : [
            { malefamale : '1', title : '남'},
            { malefamale : '2', title : '여'}
       	],    	
        model   : 'FormApp.model.MaleFamaleModel',
       	autoLoad : true,
       	autoDestroy : true        
    }
});

