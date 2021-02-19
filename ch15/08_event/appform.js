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
                        width:'100%',
                        items:[
                        {
                            xtype: 'selectfield',
                            name : 'mailfamale',
                            width: '60%',
                            label: '성별',
                            valueField:'malefamale',
                            displayField:'title',
                            store: malefamaleStore,
                            /*
                            options:[
                            { text:'남자', value:'1' },
                            { text:'여자', value:'2' }
                            ]
                            */

                        }, {
                            xtype: 'numberfield',
                            id:'age',
                            name: 'number',
                            labelWidth:'50%',
                            label: '나이',
                            width: '40%',
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
                    }, {
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
                                alert("등록합니다.");
				// loadModel을 사용하는 방법
				    Ext.define('formModel', {
				        extend: 'Ext.data.Model',		
				        config:{		
				        fields: [    
					        { name:'name',  	type:'string'},
					        { name:'mili' ,     	type:'boolean'},
					        { name:'birthday', 	type:'date'}
				        ]}
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
                                    
                              	    formPanel.loadModel(formData);                                    	    
                              	    
                              	    // id를 이용하는 방법 
                              	    Ext.getCmp('age').setValue('25');                              	    
                              	    
                              	    // query를 사용하는 방법
                              	    console.log(Ext.ComponentQuery.query('emailfield')[0]);
                              	    console.log(Ext.ComponentQuery.query('emailfield', formPanel)[0]);                              	    
                              	    Ext.ComponentQuery.query('emailfield', formPanel)[0].setValue('query@gmail.com');                              	    
                              	    Ext.ComponentQuery.query('#url', formPanel)[0].setValue('http://www.sencha.com');
                              	    
                              	    formPanel.query('#pay')[0].setValue(3000);

                              }
                        },
                        { 
                        	xtype:'spacer',width:'10%'
                        }, 
                        {
                            xtype: 'button',
                           
                            
                            width:100,
                            text: '취소',
                            handler:function()
                            {
                                alert("취소합니다.");
                                formPanel.reset();
                            }
                        }]
                    }]
            }]
        });

    }
});