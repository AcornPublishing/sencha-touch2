Ext.application({
    name:'HelloSenchaTouch',
    launch: function() {
        Ext.create("Ext.Panel", {
            fullscreen: true,
            html:'Hello Sencha Touch 2.0',
            unknownError:'Occur!!! '''',	// 강제로 오류를 일으킨곳
	    	style:"background-image:url('./img/flower.png');",
        });		
        console.log('log write!!');
    }
});