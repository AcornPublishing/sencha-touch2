Ext.application({
    name:'LIST',
    requires:[
        'Ext.form.Panel',
        'Ext.Spacer',
        'Ext.Button',
        'Ext.MessageBox',
    ],  
    launch:function(){
        panel = new Ext.create('Ext.form.Panel',{    
            fullscreen:true,
            layout: {
                type: 'vbox',
                pack: 'center',         
            },
            items:[
            { 
                flex:1,
                xtype:'spacer'
            },{
                flex:1,
                xtype:'button',
                
                text:'경고창',
                handler:function(){
                    Ext.Msg.alert('경고','경고창입니다.', 
                    Ext.emptyFn);
                }
            },{ 
                flex:1,
                xtype:'spacer'
            },{
                flex:1,
                xtype:'button',
                
                text:'프롬프트',                
                handler:function(){
                    Ext.Msg.prompt('질문','전화번호를 입력하세요?', 
                     panel.promptMsg);
                }
            },{ 
                flex:1,
                xtype:'spacer'
            },{
                flex:1,
                xtype:'button',
               
                text:'확인창',
                handler:function(){
                    Ext.Msg.confirm('확인','대학교 등록금이 내려야 한다고 생각합니까?', 
                      panel.confirmMsg);
                }
            },{ 
                flex:1,
                xtype:'spacer'
            }],
            confirmMsg:function(btn,text)
            {
                alert(btn + ":"  + text);
            }  ,
             promptMsg:function(btn,text)
            {
                alert(btn + ":" + text);
            }           
        });   
    }
});
