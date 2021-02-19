

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
                 title:'연령',
                 data : [
                     {text: '10대', value: '1'},
                     {text: '20대', value: '2'},
                     {text: '30대', value: '3'},
                     {text: '40대', value: '4'}
                 ]
             },
             {
                 name : 'degree_data2',  
                 title:'혈액형',
                       
                 data : [
                     {text: 'A형', value: '1'},
                     {text: 'B형', value: '2'},
                     {text: 'AB형', value: '3'},
                     {text: 'O형', value: '4'}
                 ]
             },
             {
                 name : 'degree_data3',  
                 title:'색상',          
                 data : [
                     {text: '빨강', value: '1'},
                     {text: '노랑', value: '2'},
                     {text: '파랑', value: '3'},
                     {text: '초록', value: '4'}
                 ]
             },
             {
                 name : 'degree_data4',   
                 title:'성별',                   
                 data : [
                     {text: '남성', value: '1'},
                     {text: '여성', value: '2'},
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
                label:'선택값',
                placeHolder:'버튼 클릭!!',
                autoCapitalisze:true,
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: '선택하세요',
                handler: function() {
                    degree_picker.show();
                }
            }]
        });
    }
});