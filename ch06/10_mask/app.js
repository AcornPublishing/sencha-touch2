Ext.application({
    name:'MASK',
    requires:[
        'Ext.Panel',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Mask'
        ],
    launch:function(){  
        var maskBodyLoading;
        var maskMyDivLoading;   

        panel = new Ext.create('Ext.Panel',{
            fullscreen:true,
            items:[{ 
                xtype:'spacer'
            },{
                xtype:'button',
                id:'button1',
                text:'mask贸府', 
                height:160,               
                handler:function()
                {
                    panel.setMasked(maskBodyLoading);
                    maskBodyLoading.show();
                    setTimeout("panel.releaseBodyMask()", 1000);
                }
            },{ 
                xtype:'spacer',
                height:10
            },{
                xtype:'button',
                id:'button2',
                height: 160,
                text:'mask贸府',   
                mask:{
                   message:"Loading (MyDiv)..."
                },             
                handler:function()
                {
                    maskMyDivLoading = new Ext.LoadMask(
                    {
                        message:"Loading (MyDiv)..."                        
                    });                  
                    Ext.Viewport.setMasked(maskMyDivLoading);                                   
                    maskMyDivLoading.show();
                    setTimeout("panel.releaseDivMask()", 1000);
                }
            },{ 
                xtype:'spacer',
                height:10
            },{
                xtype:'button',
                id:'button3',
                height: 160,
                text:'mask贸府',                
                handler:function()
                {
                    maskMyDivLoading = new Ext.LoadMask( 
                    {
                        message:"Loading (MyDiv)...",
                        messageCls:"x-loading-spinner",
                        //x-loading-spinner
                        //x-loading-msg
                        //x-loading-grey                        
                    });    
                    panel.setMasked(maskMyDivLoading);                     
                    maskMyDivLoading.show();
                    setTimeout("panel.releaseDivMask()", 1000);
                }
            }],
            releaseBodyMask:function()
            {
                maskBodyLoading.hide();                
            },
            releaseDivMask:function()
            {
                maskMyDivLoading.hide();
            }           
        }); 
        maskBodyLoading= new Ext.LoadMask( 
        {
            message:"Loading..."
        
        });
    }
});
