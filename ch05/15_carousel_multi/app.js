
Ext.application({
    name:'Carousel',
    requires:['Ext.Panel',
              'Ext.carousel.Carousel'], 
    launch:function(){
        var carousel1 = new Ext.create('Ext.Carousel',{
           //direction:'vertical',
            flex:1,
            indicator:true,
            items: [{
                title: 'Tab 1',
                html: '<center><BR><img src="./img/1.jpg" width="50%"><BR>한마리</center>'
            },
            {
                title: 'Tab 2',
                html: '<center><BR><img src="./img/2.jpg" width="50%"><BR>두마리</center>'
            },
            {
                title: 'Tab 3',
                html: '<center><BR><img src="./img/3.jpg" width="50%"><BR>세마리</center>'
            }],
            listeners:{
                'activeitemchange':function(a,b,c,d){
                }
            }
        });
        var carousel2 = new Ext.create('Ext.Carousel',{
           //direction:'vertical',
            flex:1,
            indicator:true,
            items: [{
                title: 'Tab 1',
                html: '<center><BR><img src="./img/1.jpg" width="50%"><BR>한마리</center>'
            },
            {
                title: 'Tab 2',
                html: '<center><BR><img src="./img/2.jpg" width="50%"><BR>두마리</center>'
            },
            {
                title: 'Tab 3',
                html: '<center><BR><img src="./img/3.jpg" width="50%"><BR>세마리</center>'
            }],
            listeners:{
                'activeitemchange':function(a,b,c,d){
                }
            }
        });        
        var carousel3 = new Ext.create('Ext.Carousel',{
           //direction:'vertical',
            flex:1,
            indicator:true,
            items: [{
                title: 'Tab 1',
                html: '<center><BR><img src="./img/1.jpg" width="50%"><BR>한마리</center>'
            },
            {
                title: 'Tab 2',
                html: '<center><BR><img src="./img/2.jpg" width="50%"><BR>두마리</center>'
            },
            {
                title: 'Tab 3',
                html: '<center><BR><img src="./img/3.jpg" width="50%"><BR>세마리</center>'
            }],

            listeners:{
                'activeitemchange':function(a,b,c,d){
                }
            }
        });
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center',
            },
            items:[
            carousel1,
            carousel2,
            carousel3
            ]
        });
    }
});