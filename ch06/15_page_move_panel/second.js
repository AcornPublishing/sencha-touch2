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
            title: '�ι�° ������',
            instructions: 'Sencha Touch �������̵�',        
       
            items:[
            {   xtype: 'spacer',
                height: 50
            },                  
            {
                xtype:'button',
                text:'ù��° ������ ȣ��',
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


