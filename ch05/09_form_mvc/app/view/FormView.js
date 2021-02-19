Ext.define("FormApp.view.FormView", {
    extend: 'Ext.form.Panel',   
    xtype:'formview',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.DatePicker',
        'Ext.field.Spinner',
        'Ext.field.Select',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.Slider',
        'FormApp.store.MaleFamaleStore'
    ],
    config: {
        fullscreen:true,
        standardSubmit : false,
        items: [{
            xtype: 'fieldset',
            title: '�Ի�������',
            instructions: '�� �׸��� ��� �λ�ο� �����ϼ���.',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth:100,
            },
            items: [                
            {
                xtype: 'textfield',
                name : 'name',
                label: '�̸�',
                clearIcon: true,
            }, {
                xtype: 'datepickerfield',
                name : 'birthday',
                label: '�������',
                   // value: date1,
                    picker: {
                        yearFrom: 1980
                    }
            },{
                xtype: 'checkboxfield',
                name : 'mili',
                label: '���ʿ���',
                value: true
            }, {
                xtype: 'spinnerfield',
                name : 'spinner',
                label: '���'
            }, {
                layout:
                {
                    type:'hbox',                    
                },
                items:[
                {
                    flex:1,
                    xtype: 'selectfield',
                    //id:'malefamale',
                    name : 'malefamale',
                    label: '����',
                    valueField:'malefamale',
                    displayField:'title',
                }, {
                    flex:1,
                    xtype: 'numberfield',
                    //id:'age',
                    name: 'number',
                    labelWidth:'50%',
                    label: '����',
                    value:20,
                    max : 20,
                    min : 2
                }]
            }, {
                xtype: 'emailfield',
                name : 'email',
                label: 'E-����',
                placeHolder: 'hong_kil_dong@google.com',
                clearIcon: true
            }, {
                xtype: 'urlfield',
                name : 'url',
                //id:'url',
                label: 'Ȩ������',
                placeHolder: 'http://www.hong_kil_dong.com',
                clearIcon: true
            }, {
                xtype: 'sliderfield',
                name : 'pay',
                value:5000,
                max: 10000,
                min: 0,
                label: '�������'
            }, ]
        },{
            layout: {
                type: 'hbox',
                pack: 'center',
            
            },                      
            items:[{
                xtype: 'button',
                width:100,
                name:'regForm',
                bgcolor:'red',
                align:'center',
                text: '���'
            },
            { 
                xtype:'spacer',width:'10%'
            }, 
            {
                xtype: 'button',
                name:'cancelForm',
                width:100,
                text: '���',
            }]
        }]        
    }    
});
