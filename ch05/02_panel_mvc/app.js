Ext.application({
    name: 'PanelApp',
    requires: [
    ],
    views: ['PanelView'],
    launch: function() {
        Ext.Viewport.add(Ext.create('PanelApp.view.PanelView'));
    }
});