Ext.ns("main");

Ext.application({
    name:'PAGE',
    requires:[
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Panel',
        'Ext.form.FieldSet',
        'first',
        'second',
    ],
    launch:function(){
        first.init();
        second.init();
		first.panel.show();
		second.panel.hide();
    }
});




