

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
                    title: '고객등급',
                    data : [
                        {text: '최고등급', value: 'VIP1'},
                        {text: '우수등급', value: 'VIP2'},
                        {text: '우량등급', value: '우량'},
                        {text: '보통등급', value: '일반'}
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
                label:'고객등급',
                placeHolder:'버튼 클릭!!',
                autoCapitalisze:true,
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '고객등급',
                handler: function() {
                    degree_picker.show();
                }
            },            
            {
                xtype:'textfield',
                id:'date_field',
                label:'날짜',
                placeHolder:'버튼 클릭!!',
                autoCapitalisze:true,
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '날짜',
                handler: function() {
                    date_picker.show();
                }
            }]
        });

    }
});