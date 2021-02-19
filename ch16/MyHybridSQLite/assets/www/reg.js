Ext.ns("reg");

reg.init = function(){

    reg.panel_reg = new Ext.create('Ext.form.FormPanel',{
        useCurrentLocation: true,               
        scroll:'vertical',
        
    
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch',
            cardSwitchAnimation:"flip",
        },
                                
        items:[{
            xtype: 'fieldset',
            title: '등록',
            instructions: 'SQLITE 연동 테스트',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '40%'
            },
            items:[
            {
                xtype:'textfield',
                id:'user_id',
                label:'아이디',
                placeHolder:'ID',
                autoCapitalisze:true,
                clearIcon:false
            },{
                
                xtype:'textfield',
                id:'user_name',
                label:'이름',
                placeHolder:'이름',
                autoCapitalisze:true,
                clearIcon:false
            },{
                
                xtype:'textfield',
                id:'user_tel',
                label:'전화번호',
                placeHolder:'전화번호',
                autoCapitalisze:true,
                clearIcon:false
            }]
        },
        {
            layout: {
                type: 'hbox',
                pack: 'center',
            },              
            items:[{
                xtype:'button',
                ui: 'decline-round',
                name:'button_login',
                handler:function(){                 
    
                    var strSql = "insert into user (user_id, user_name, user_tel) values (" + 
                            "'" + Ext.getCmp("user_id").getValue() + "'," + 
                            "'" + Ext.getCmp("user_name").getValue() + "'," + 
                            "'" + Ext.getCmp("user_tel").getValue() + "')" ;
            //파라미터 전달
                    execSql(strSql, 'reg.panel_reg.receiveSql', 'reg.panel_reg.errorSql');                    
                },    
                text:'등록'
            }]                                       
        }],  
         
        receiveSql:function()
        {      
            Ext.Msg.alert('등록되었습니다.');
        },
        errorSql:function(input)
        {      
            Ext.Msg.alert(input);
        }
        
    }); 

}