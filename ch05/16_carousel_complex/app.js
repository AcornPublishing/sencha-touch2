
Ext.application({
    name:'Carousel',
    requires:['Ext.Panel',
              'Ext.Toolbar',
              'Ext.carousel.Carousel'], 
    launch:function(){
        var carouselHamto = new Ext.create('Ext.Carousel',{
            direction:'vertical',
            flex:1,
            indicator:true,
            items: [{
                html: '<center><BR><img src="./img/1.jpg" width="90%"><BR>��1</center>'
            },
            {
                html: '<center><BR><img src="./img/2.jpg" width="90%"><BR>��2</center>'
            },
            {
                html: '<center><BR><img src="./img/3.jpg" width="90%"><BR>��3</center>'
            }],
            listeners:{
                'activeitemchange':function(a,b,c,d){
                }
            }
        });
        var carouselHamsun = new Ext.create('Ext.Carousel',{
            direction:'vertical',
            flex:1,
            indicator:true,
            items: [{
                html: '<center><BR><img src="./img/4.jpg" width="90%"><BR>�糪�� �ܼ���</center>'
            },
            {
                html: '<center><BR><img src="./img/5.jpg" width="90%"><BR>�Ժ� �ܼ���</center>'
            },
            {
                html: '<center><BR><img src="./img/6.jpg" width="90%"><BR>�Ϳ��� �ܼ���</center>'
            }],
            listeners:{
                'activeitemchange':function(a,b,c,d){
                }
            }
        });        
        var carouselMiki = new Ext.create('Ext.Carousel',{
            direction:'vertical',
            flex:1,
            indicator:true,
            items: [{
                html: '<center><BR><img src="./img/7.jpg" width="90%"><BR>J</center>'
            },
            {
                html: '<center><BR><img src="./img/8.jpg" width="90%"><BR>Q</center>'
            },
            {
                html: '<center><BR><img src="./img/9.jpg" width="90%"><BR>K</center>'
            }],
            listeners:{
                'activeitemchange':function(a,b,c,d){
                }
            }
        });
        var carouselTot = new Ext.create('Ext.Carousel',{            
            flex:1,
            indicator:true,
            listeners:{
                'activeitemchange':function(a,b,c,d){
                }
            }
        });
        carouselTot.add(carouselHamto);
        carouselTot.add(carouselHamsun);
        carouselTot.add(carouselMiki);
        
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
                    title:'������'
                },
                carouselTot
            ]
        });
    }
});