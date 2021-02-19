Ext.application({
    name:'AJAXREQUEST',
    requires:[
        'Ext.Panel',
        'Ext.Ajax',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Toolbar'],
    launch:function(){
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                items: [
                {
                    text: 'AJAX를 이용해 JSON데이타 가져오기',
                    handler: function()
                    {
                        Ext.Ajax.request({
                            url: 'ajaxdata.jsp',
                            params:{
                                param1:'value1',
                                param2:'value2'
                            },
                            success: function(response, opts) {
                                var JsonData = Ext.decode(response.responseText);
                                console.log(response.responseText);
                                console.log(JsonData);
                                console.log(JSON.stringify(JsonData));
                               
                                Ext.ComponentQuery.query('#ResponseText')[0].setValue(response.responseText);
                                Ext.ComponentQuery.query('#Name')[0].setValue(JsonData.Name);
                                Ext.ComponentQuery.query('#Age')[0].setValue(JsonData.Age);
                                Ext.ComponentQuery.query('#Skill1')[0].setValue(JsonData.Skills[0].Skill);
                                Ext.ComponentQuery.query('#Skill2')[0].setValue(JsonData.Skills[1].Skill);
                                Ext.ComponentQuery.query('#Skill3')[0].setValue(JsonData.Skills[2].Skill);
                                Ext.ComponentQuery.query('#Skill4')[0].setValue(JsonData.Skills[3].Skill);
                                Ext.ComponentQuery.query('#img')[0].setHtml('<center><img src="' + JsonData.img + '" height="100%" >');
                            }
                        });                   
                    }
                }]
            },
            {
                xtype:'fieldset',
            
                items:[
                {
                    xtype:'textfield',
                     name:'ResponseText',
                    id:'ResponseText',
                    label:'JSON값'                    
                },
                {
                    xtype:'textfield',
                    id:'Name',
                    label:'이름'                    
                },
                {
                    xtype:'textfield',
                    id:'Age',
                    label:'나이'                    
                },
                {
                    xtype:'textfield',
                    id:'Skill1',
                    label:'보유기술1'                    
                },                                    
                {
                    xtype:'textfield',
                    id:'Skill2',
                    label:'보유기술2'                    
                },
                {
                    xtype:'textfield',
                    id:'Skill3',
                    label:'보유기술3'                    
                },            
                {
                    xtype:'textfield',
                    id:'Skill4',
                    label:'보유기술4'                    
                }]
            },
            {
                height:100,
                id:'img',               
            }]
        });
    }
});