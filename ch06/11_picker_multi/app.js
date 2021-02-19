

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
        var degree_picker = new Ext.create('Ext.Picker',{
            useTitles:true, 
            slots: [
            {
                 name : 'degree_data1',
                 title:'����',
                 data : [
                     {text: '10��', value: '1'},
                     {text: '20��', value: '2'},
                     {text: '30��', value: '3'},
                     {text: '40��', value: '4'}
                 ]
             },
             {
                 name : 'degree_data2',  
                 title:'������',
                       
                 data : [
                     {text: 'A��', value: '1'},
                     {text: 'B��', value: '2'},
                     {text: 'AB��', value: '3'},
                     {text: 'O��', value: '4'}
                 ]
             },
             {
                 name : 'degree_data3',  
                 title:'����',          
                 data : [
                     {text: '����', value: '1'},
                     {text: '���', value: '2'},
                     {text: '�Ķ�', value: '3'},
                     {text: '�ʷ�', value: '4'}
                 ]
             },
             {
                 name : 'degree_data4',   
                 title:'����',                   
                 data : [
                     {text: '����', value: '1'},
                     {text: '����', value: '2'},
                 ]
             }                 
            ],
            listeners:{
                "hide":function(picker){              
                    Ext.getCmp("degree_field").setValue(
                        picker.getValue().degree_data1 + 
                        picker.getValue().degree_data2 + 
                        picker.getValue().degree_data3 + 
                        picker.getValue().degree_data4);
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
                label:'���ð�',
                placeHolder:'��ư Ŭ��!!',
                autoCapitalisze:true,
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '�����ϼ���',
                handler: function() {
                    degree_picker.show();
                }
            }]
        });
    }
});