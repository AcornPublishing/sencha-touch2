
Ext.define('ProxyApp.store.ProxyStore', {
    extend  : 'Ext.data.Store',    
    requires: ['ProxyApp.model.ProxyModel'],
    config:{
        model:'ProxyApp.model.ProxyModel',
        proxy:{
            type:'ajax',
            url: './jsp/ajaxdata.jsp',
            reader:{
                type:'json',
                rootProperty:'Skills',
            }
        },
        autoLoad:true,          
    }
});

