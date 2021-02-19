
Ext.define('FormApp.model.FormModel', {
    extend: 'Ext.data.Model',
    config:{
        fields: [    
            { name:'name',      type:'string'},
            { name:'mili' ,         type:'boolean'},
            { name:'birthday',  type:'date'}
        ]
    }
});