Ext.application({
    name:'Carousel',
    requires:['Ext.Panel',
              'Ext.Toolbar',
              'Ext.carousel.Carousel'],
    launch:function(){
        var carousel1 = new Ext.create('Ext.Carousel',{
           //direction:'vertical',
            flex:1,
            indicator:true,
            items: [{
                title: 'Tab 1',
                html: '<center><BR><img src="./img/1.jpg" width="70%"><BR>�Ѹ���</center>'
            },
            {
                title: 'Tab 2',
                html: '<center><BR><img src="./img/2.jpg" width="70%"><BR>�θ���</center>'
            },
            {
                title: 'Tab 3',
                html: '<center><BR><img src="./img/3.jpg" width="70%"><BR>������</center>'
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
            {
                xtype:'toolbar',
                title:'�̺�Ʈ ó��',
            },
            carousel1
            ]
        });
    }
});