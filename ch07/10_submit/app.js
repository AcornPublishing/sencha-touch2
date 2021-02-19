Ext.require('Ext.form.Panel');
Ext.require('Ext.form.FieldSet');

Ext.application({
	name:'LIST',
	launch:function(){
		
        panel = new Ext.create('Ext.form.Panel',{
            
            id:'panelsubmit',
            fullscreen:true,
            standardSubmit: false,
            
            items: [
            {
                xtype: 'fieldset',
                title: 'SUBMIT...',
                instructions: 'Submit 테스트입니다.',
                items:
                [
                {
                    xtype:'textfield',
                    name:'user_id',
                    label:'ID',                 
                },  
                {
                    xtype:'textfield',
                    name:'user_name',
                    label:'이름',
                }]
           },                    
            {
                xtype:'button',
                text:'submit',
                handler:function()
                {   
                    panel.submit({
                        url: "./submitdata.jsp",
                        success: function(result, request) {
                            console.log("성공");
                            console.log(result);
                            console.log(request);
                            alert(request.success);
                        },
                        failure:function(result, request) {
                            console.log("실패");
                            console.log(result);
                            console.log(request);
                            alert(request.success);
                            alert("응답오류");
                        }               
                    });                 
                }
            }]
        }); 
      
    }
});