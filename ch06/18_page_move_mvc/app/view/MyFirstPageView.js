Ext.define("MyPageApp.view.MyFirstPageView", {
    extend: 'Ext.form.Panel',   
    xtype:'myfirstpageview',
    requires:[
        'Ext.form.Panel',
        'Ext.data.Store',
        'Ext.DataView'],
    config: {
        layout: {
          type: 'vbox',
          pack: 'center',
          align:'stretch',
        }, 
        items: [
        {
            xtype: 'fieldset',
            title: 'ù��° ������',
            instructions: 'Sencha Touch �������̵�',    
            items:[
            {   
                xtype: 'textfield',
                name:'inputvalue',
                value:'�Է°�'
            },                  
            {   
                xtype: 'spacer',
                height: 50
            },                  
            {
                xtype:'button',
                name:'callview',
                text:'�ι�° ������ ȣ��',
                /*
                handler:function(){                 
                    main.panel.setActiveItem(second.panel);
                    console.log(Ext.ComponentQuery.query('[name=inputvalue]',first.panel));
                    second.panel.setValue(Ext.ComponentQuery.query('[name=inputvalue]',first.panel)[0].getValue());
                }
                */
            },
            {   
                xtype: 'spacer',
                height: 50
            }],
        }]
    }    
});

