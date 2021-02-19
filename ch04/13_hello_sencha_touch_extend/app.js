Ext.application({
    name: 'HelloSenchaTouch',
    requires: [
    ],
    views: ['HelloView'],
    launch: function() {
        Ext.Viewport.add(Ext.create('HelloSenchaTouch.view.HelloView'));
    }
});
