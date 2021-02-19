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
            title: '입사지원서',
            instructions: '각 항목을 적어서 인사부에 제출하세요.',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth:100,
            },
            items: [                
            {
                xtype: 'textfield',
                name : 'name',
                label: '이름',
                clearIcon: true,
            }, {
                xtype: 'datepickerfield',
                name : 'birthday',
                label: '생년월일',
                   // value: date1,
                    picker: {
                        yearFrom: 1980
                    }
            },{
                xtype: 'checkboxfield',
                name : 'mili',
                label: '군필여부',
                value: true
            }, {
                xtype: 'spinnerfield',
                name : 'spinner',
                label: '경력'
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
                    label: '성별',
                    valueField:'malefamale',
                    displayField:'title',
                }, {
                    flex:1,
                    xtype: 'numberfield',
                    //id:'age',
                    name: 'number',
                    labelWidth:'50%',
                    label: '나이',
                    value:20,
                    max : 20,
                    min : 2
                }]
            }, {
                xtype: 'emailfield',
                name : 'email',
                label: 'E-메일',
                placeHolder: 'hong_kil_dong@google.com',
                clearIcon: true
            }, {
                xtype: 'urlfield',
                name : 'url',
                //id:'url',
                label: '홈페이지',
                placeHolder: 'http://www.hong_kil_dong.com',
                clearIcon: true
            }, {
                xtype: 'sliderfield',
                name : 'pay',
                value:5000,
                max: 10000,
                min: 0,
                label: '희망연봉'
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
                text: '등록'
            },
            { 
                xtype:'spacer',width:'10%'
            }, 
            {
                xtype: 'button',
                name:'cancelForm',
                width:100,
                text: '취소',
            }]
        }]        
    }    
});
