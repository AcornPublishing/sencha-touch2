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
            title: '첫번째 페이지',
            instructions: 'Sencha Touch 페이지이동',    
            items:[
            {   
                xtype: 'textfield',
                name:'inputvalue',
                value:'입력값'
            },                  
            {   
                xtype: 'spacer',
                height: 50
            },                  
            {
                xtype:'button',
                name:'callview',
                text:'두번째 페이지 호출',
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

