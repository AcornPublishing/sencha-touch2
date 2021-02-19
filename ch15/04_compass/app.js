Ext.ns('compass');

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
        
        var rot={};
        var obj;
        var cur=0;
        var tgt = 0;
        

        compass.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            style:'background-color:white',
            html:'<br><center><img id="img1" src="./img/compass.png" width="80%">',
            items: [
            {
                docked : 'top',
                xtype: 'toolbar',
                title:'센차터치 나침반',
                items:[
                {
                    xtype:'button',
                    text:'90도 이동',
                    handler:function()
                    {
                        tgt=90;
                    }
                },
                {
                    xtype:'spacer'
                },
                {
                    xtype:'button',
                    text:'-90도 이동',
                    handler:function()
                    {
                        tgt=-90;
                    }
                }                                                                                                                 
                ]                    
            }]          
        });  
        obj = document.getElementById("img1");
        compass.rotate=function()
        {
            if(tgt > cur)
                cur=cur+3;
            if(tgt < cur)
                cur=cur-3;
            rot = "rotate(" + cur + "deg)";
            obj.style.webkitTransform = rot;            
            setTimeout('compass.rotate()', 50);
        }
        compass.rotate();          
    }
});
