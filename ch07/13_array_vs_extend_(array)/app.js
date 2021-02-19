Ext.ns("main");

Ext.application({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    requires:[
        'Ext.Panel',
        'Ext.Carousel',
        'Ext.Img',
        'Ext.Ajax',
        'art',
        ],
    launch: function() {
    	art.panel = new Array(20);
    	main.count = 0;
        main.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center',

            },
            items:[{
                xtype: 'toolbar',
                docked: 'top',
                title:'사진목록(Array)',
                defaults: {
                    ui: 'plain'
                },                
                layout: {
                    pack: 'center'
                },
            },{  
                flex:1,
                xtype:'carousel',     
                id:'carouselArt',     
                defaults: {
                    cls: 'card'
                },
                indicator:true,
                items: [
                    
                ],
                listeners:{
                    activeitemchange:function( a, index1,index2){
                        console.log( );
                        console.log(index1);
                        //alert('hi' + index1 );
                        var curIndex = Ext.ComponentQuery.query('#carouselArt')[0].getActiveIndex();
                        if(curIndex == main.count-1 &&  main.count >1 &&  main.count <50)
                        {
                            callArtFromServer()
                        }
                    }
                }
            }]
        });
        addArt = function(count, subject, img){
            art.panel[count];
            art.init(count);
            Ext.ComponentQuery.query('#carouselArt')[0].add(art.panel[count]);
            art.panel[count].setPage(count,subject,img);
            main.count++;
        }
        callArtFromServer = function(){
            Ext.Ajax.request({
                url: './jsp/artlist.jsp?paramPage=' + main.count,
                success: function(response, opts) { 
                    var JsonData = JSON.parse(response.responseText);
                    for(i=0; JsonData.data.artlist.length;i++)
                    {
                        var art = JsonData.data.artlist[i];
                        addArt(art.id, art.subject,   art.img);  
                    } 
                }
            });
        }
        callArtFromServer();
    }
});