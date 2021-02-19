Ext.ns("Accelerator");

Ext.application({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    requires:[
        'Ext.Panel',
        'Ext.Anim',
        'Ext.Toolbar',
        ],
    launch: function() {
        
        var enddegree;
        
        Ext.apply( Ext.anims ,{ 
            rotate: new Ext.Anim({
                degree:0,
                //enddegree:0,
                before: function(el) {
                    this.from = {
                        '-webkit-transform': 'rotate(' + this.degree + 'deg)',
                    };
                    this.to = {
                        '-webkit-transform': 'rotate(' + enddegree + 'deg)'
                       
                    };
                },
                after:function(el){

                    if(enddegree <=60)
                        alert('야외취침');
                    else if(enddegree <=120)
                        alert('라면');
                    else if(enddegree <=180)
                        alert('횡성한우 시식');
                    else if(enddegree <=240)
                        alert('실내취침');
                    else if(enddegree <=300)
                        alert('백구포도 시식');
                    else 
                        alert('찬물입수');
                },
                duration: 1000
            })
        });
        
        var panel_ani = new Ext.create('Ext.Panel',{
            width:400,
            height:400,
            centered:true,
            html:'<img src="./img/bokbulbok.png" width="100%" height="100%">',
        });
        
        var panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            items: [
            {
                docked : 'top',
                xtype: 'toolbar',
                title:'센차터치  복불복',
                items:[
                {
                    xtype:'button',
                    text:'돌려',
                    handler:function()
                    {
                        enddegree = Math.floor(Math.random() * 360);
                        Ext.Anim.run(panel_ani, 'rotate',{
                            degree:0,
                            enddegree:enddegree
                        });  
                    }
                }                                                                                                 
                ]                    
            },
            panel_ani  
            ]          
        });    
    }
});
