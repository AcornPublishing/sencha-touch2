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
                { malefamale : '1', title : '��'},
                { malefamale : '2', title : '��'}
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
                    title: '�Ի�������',
                    instructions: '�� �׸��� ��� �λ�ο� �����ϼ���.',
                    defaults: {
                        required: true,
                        labelAlign: 'left',
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
                            value: date1,
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
                        width:'100%',
                        items:[
                        {
                            xtype: 'selectfield',
                            name : 'mailfamale',
                            width: '60%',
                            label: '����',
                            valueField:'malefamale',
                            displayField:'title',
                            store: malefamaleStore,
                            /*
                            options:[
                            { text:'����', value:'1' },
                            { text:'����', value:'2' }
                            ]
                            */

                        }, {
                            xtype: 'numberfield',
                            id:'age',
                            name: 'number',
                            labelWidth:'50%',
                            label: '����',
                            width: '40%',
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
                        id:'url',
                        label: 'Ȩ������',
                        placeHolder: 'http://www.hong_kil_dong.com',
                        clearIcon: true
                    }, {
                        xtype: 'sliderfield',
                        id:'pay',
                        name : 'pay',
                        value:5000,
                        max: 10000,
                        min: 0,
                        label: '�������'
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
                            text: '���',
                            handler:function()
                            {
                                alert("����մϴ�.");
				// loadModel�� ����ϴ� ���
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
                                        'name'       : 'ȫ�浿',
                                        'mili'           : true,
                                        'birthday'   : date
                                    }, 'formModel');
                                    
                              	    formPanel.loadModel(formData);                                    	    
                              	    
                              	    // id�� �̿��ϴ� ��� 
                              	    Ext.getCmp('age').setValue('25');                              	    
                              	    
                              	    // query�� ����ϴ� ���
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
                            text: '���',
                            handler:function()
                            {
                                alert("����մϴ�.");
                                formPanel.reset();
                            }
                        }]
                    }]
            }]
        });

    }
});