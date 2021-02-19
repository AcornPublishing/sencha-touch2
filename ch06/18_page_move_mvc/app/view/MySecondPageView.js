Ext.define("MyPageApp.view.MySecondPageView", {
    extend: 'Ext.form.Panel',   
    xtype:'mysecondpageview',
    requires:[
        'Ext.Panel',
        'Ext.data.Store'],
    config: {
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
            {   
                xtype: 'textfield',
                name:'inputvalue',
                value:'�Է°�'
            },          
            {   xtype: 'spacer',
                height: 50
            },                  
            {
                xtype:'button',
                text:'ù��° ������ ȣ��',
                name:'callview',
            },
            {   
                xtype: 'spacer',
                height: 50
            }],
        }], 
        setValue:function(val)
        {
            console.log('val:' + val);
            Ext.ComponentQuery.query('[name=inputvalue]', second.panel)[0].setValue( val);
        }   
    }    
});

