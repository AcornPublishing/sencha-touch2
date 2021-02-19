Ext.application({
    name: 'FormApp',
    requires: [
    ],
    models: ['FormModel', 'MaleFamaleModel'],
    stores: ['MaleFamaleStore'],
    controllers:['FormController'],
    views: ['FormView'],
    launch: function() {        
        Ext.Viewport.add(Ext.create('FormApp.view.FormView'));    
    }
});