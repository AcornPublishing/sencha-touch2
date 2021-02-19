Ext.application({
    name:'FORM',
    launch:function(){
        
        var date1 =  new Date();
        Ext.define('MaleFamale',{
            extend: 'Ext.data.Model',
            config:{
	            fields: [
	                {name: 'malefamale',     type: 'string'},
	                {name: 'title',    type: 'string'}
	            ]
           }
        });
        var malefamaleStore = new Ext.create('Ext.data.Store',{
           data : [
                { malefamale : '1', title : '남'},
                { malefamale : '2', title : '여'}
           ],
           model : 'MaleFamale',
           autoLoad : true,
           autoDestroy : true
        });
        var formPanel = new Ext.create('Ext.form.Panel',{
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
                        value: date1,
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
                        name : 'mailfamale',
                        label: '성별',
                        valueField:'malefamale',
                        displayField:'title',
                        store: malefamaleStore,
                    }, {
                        flex:1,
                        xtype: 'numberfield',
                        id:'age',
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
                    id:'url',
                    label: '홈페이지',
                    placeHolder: 'http://www.hong_kil_dong.com',
                    clearIcon: true
                }, {
                    xtype: 'sliderfield',
                    id:'pay',
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
                    bgcolor:'red',
                    align:'center',
                    text: '등록',
                    handler:function()
                    {
                        Ext.define('formModel', {
                            extend: 'Ext.data.Model',
                    		config:{
	                            fields: [    
	                                { name:'name',      type:'string'},
	                                { name:'mili' ,         type:'boolean'},
	                                { name:'birthday',  type:'date'}
	                            ]
	                        }
                        });
                        
                       
                        
                        var date = new Date();
                        date.setMonth(2);
                        date.setYear(2012);
                        date.setDate(4);
                                                
                       	formData = Ext.ModelMgr.create({
                            'name'       : '홍길동',
                            'mili'           : true,
                            'birthday'   : date
                        }, 'formModel');
                        
                        
                        formPanel.setRecord(formData);
                        
                        console.log(formPanel.getValues());
                        
                        formPanel.setValues(
	                        {
	                        	url:'http://www.sencha.com'
	                        }
	                    );
                        
                    }
                },
                { 
                    xtype:'spacer',width:'10%'
                }, 
                {
                    xtype: 'button',
                    width:100,
                    text: '취소',
                }]
            }]
        });
    }
});