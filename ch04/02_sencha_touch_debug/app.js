Ext.application({
    name:'HelloSenchaTouch',
    launch: function() {
        Ext.create("Ext.Panel", {
            fullscreen: true,
            html:'Hello Sencha Touch 2.0',
            unknownError:'Occur!!! '''',	// ������ ������ ����Ų��
	    	style:"background-image:url('./img/flower.png');",
        });		
        console.log('log write!!');
    }
});