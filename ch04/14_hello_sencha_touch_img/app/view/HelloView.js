Ext.define("HelloSenchaTouch.view.HelloView", {
    extend: 'Ext.Panel',
    requires: [
    ],
    config: {
        style:"background-image:url('./img/flower.png');",
        html:[
            'Hello<BR>',
            'My Name is Lee<BR>',
            'And This is Sencha Touch2'
        ].join(" ")
    }
});
