Ext.application({
    name: 'PanelApp',
    requires: [
    ],
    views: ['PanelView', 'TopView', 'BottomView'],
    launch: function() {        
        panelView = Ext.create('PanelApp.view.PanelView');
        Ext.Viewport.add(panelView);
        
        topView = Ext.create('PanelApp.view.TopView');        
        panelView.add(topView);
        
        bottomView = Ext.create('PanelApp.view.BottomView');        
        panelView.add(bottomView);     
    }
});