Ext.ns("second");

second.init = function()
{
    second.panel = new Ext.create('Ext.Panel',
    {
        flex: 1,
        layout: {
            type: 'vbox',
            pack: 'center',
            align:'stretch',
        },            
        items: [
        {
            xtype: 'fieldset',
            title: '두번째 페이지',
            instructions: 'Sencha Touch 페이지이동',        
       
            items:[
            {   xtype: 'spacer',
                height: 50
            },                  
            {
                xtype:'button',
                text:'첫번째 페이지 호출',
                handler:function(){
                    first.panel.show();
                    second.panel.hide();
                    
                }
            },
            {   
                xtype: 'spacer',
                height: 50
            }],
        }],     
    });
}


