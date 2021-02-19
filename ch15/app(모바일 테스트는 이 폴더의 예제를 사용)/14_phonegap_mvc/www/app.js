
Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.application({
    name: 'FileApp',
    requires:['PhoneGap'],
    models: ['FileModel'],
    stores: ['FileStore'],
    controllers:['FileController'],
    views: ['FileView'],
    launch: function() { 
 
    }
});