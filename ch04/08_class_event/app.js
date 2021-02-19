Ext.application({
    name:'EventExtend',
    requires:['Ext.Panel',
              'Ext.Button'],
    launch: function() {
        Ext.define('userButton',{
            extend: 'Ext.Button',
            config:     
            {               
                width:200,
                height:200,
                text:'가운데로',
                listeners:{
                    tap:function(){
                        this.fireEvent("pupu");
                    }
                },
            }           
        });
        
        var panel = Ext.create("Ext.Panel", {
            fullscreen: true,
            html:'Hello Sencha Touch 2.0',
            style:"background-image:url('./img/flower.png');",
        });
        
        var myButton = Ext.create('userButton',{
            extends:'userButton',   
            text:'가운데로 이동',     
        });
        
        myButton.on('pupu',function(){
            console.log('pupu...');
            myButton.setCentered(true);
        });
        
        panel.add(myButton);
    }
});