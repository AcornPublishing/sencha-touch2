Ext.application({
    name: 'MyEventApp',
    requires: [
    ],
    controllers:['MyEventController'],
    views: ['MyEventView'],
    launch: function() {        
        //Ext.Viewport.add(Ext.create('MyEventApp.view.MyEventView'));    
    }
});