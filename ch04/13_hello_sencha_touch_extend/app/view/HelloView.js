Ext.define("HelloSenchaTouch.view.HelloView", {
    extend: 'Ext.Panel',
    requires: [
    ],
    config: {
		html:[
			'Hello<BR>',
			'My Name is Lee<BR>',
			'And This is Sencha Touch2'
		].join(" ")
    }
});
