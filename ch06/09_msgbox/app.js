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
                
                text:'���â',
                handler:function(){
                    Ext.Msg.alert('���','���â�Դϴ�.', 
                    Ext.emptyFn);
                }
            },{ 
                flex:1,
                xtype:'spacer'
            },{
                flex:1,
                xtype:'button',
                
                text:'������Ʈ',                
                handler:function(){
                    Ext.Msg.prompt('����','��ȭ��ȣ�� �Է��ϼ���?', 
                     panel.promptMsg);
                }
            },{ 
                flex:1,
                xtype:'spacer'
            },{
                flex:1,
                xtype:'button',
               
                text:'Ȯ��â',
                handler:function(){
                    Ext.Msg.confirm('Ȯ��','���б� ��ϱ��� ������ �Ѵٰ� �����մϱ�?', 
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
