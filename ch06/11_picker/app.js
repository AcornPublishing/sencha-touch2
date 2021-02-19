

Ext.application({
    name:'Picker',
    requires:[
        'Ext.DatePicker',
        'Ext.TitleBar',
        'Ext.form.Panel',
        'Ext.field.Text',
        ],
    launch:function()
    {
        var date_picker = new Ext.create('Ext.DatePicker',{
            useTitles: true,
            value: {
                day: 1,
                month: 1,
                year: 2012
            },
            dateFormat:'Y-m-d',
            listeners:{
                "hide":function(picker){
                    console.log(Ext.getCmp("date_field"));
                    Ext.getCmp("date_field").setValue(picker.getValue());
                }
            }         
        });
     
        var degree_picker = new Ext.create('Ext.Picker',{
            slots: [
                {
                    name : 'degree_data',
                    title: '�����',
                    data : [
                        {text: '�ְ���', value: 'VIP1'},
                        {text: '������', value: 'VIP2'},
                        {text: '�췮���', value: '�췮'},
                        {text: '������', value: '�Ϲ�'}
                    ]
                }
            ],
            listeners:{
                "hide":function(picker){
                    console.log(picker.getValue().degree_data);
                    Ext.getCmp("degree_field").setValue(picker.getValue().degree_data);
                }
            }           
        });
        var panel = new Ext.create('Ext.form.Panel',{
            fullscreen: true,
            layout: {
               
                align: 'center',
                pack: 'center'
            },
            items: [
            {
                xtype:'textfield',
                id:'degree_field',
                label:'�����',
                placeHolder:'��ư Ŭ��!!',
                autoCapitalisze:true,
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '�����',
                handler: function() {
                    degree_picker.show();
                }
            },            
            {
                xtype:'textfield',
                id:'date_field',
                label:'��¥',
                placeHolder:'��ư Ŭ��!!',
                autoCapitalisze:true,
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '��¥',
                handler: function() {
                    date_picker.show();
                }
            }]
        });

    }
});