
Ext.application({
    name:'LIST',
    requires:[
        'Ext.Panel',
        'Ext.List',
        'Ext.data.TreeStore',
        'Ext.NestedList',
        'Ext.TitleBar'
        ],
    launch:function(){

        Ext.define('ListItem',{
            extend:'Ext.data.Model',
            config:{
                fields:['text']
            }
        });
        
        var store = new Ext.create('Ext.data.TreeStore', {
            model:'ListItem',           
            autoLoad:true,
            defaultRootProperty:'items',
            root:{
                items:[
                    {
                        text: '��ä��',
                        items: [
                        {
                            text: '������',
                            items: [
                            {
                                text: '<font color="red">����</font> ',
                                leaf:true
            
                            },
                            {
                                text: '<font color="orange">������</font> ',
                                leaf:true
            
                            }]
                        },{
                            text: 'Ǫ����',
                            items: [
                            {
                                text: '<font color="blue">�Ķ�</font> ',
                                leaf:true
            
                            },
                            {
                                text: '<font color="green">���</font> ',
                                leaf:true
            
                            }]
                        }]
                    },
                    {
                        text: '��ä��',
                        items: [
                        {
                            text: '<font color="white">���</font> ',                           
                            leaf:true
            
                        },
                        {
                            text: '<font color="grey">ȸ��</font> ',                            
                            leaf:true
            
                        },
                        {
                            text: '<font color="black">������</font> ',                         
                            leaf:true
            
                        }                       
                        ]
                    }
                ]
            }   
        });

        var nestedList = new Ext.create('Ext.NestedList',{      
            flex:1,
            fullscreen: true,  
            displayField: 'text',
            title:'�ȷ�Ʈ',
            store: store,
            listeners: {
                leafitemtap: function(me, list, index, item, e) {
                    var store = list.getStore(),
                        record  = store.getAt(index);
                        console.log(record);
                        alert(record.data.text + '�Դϴ�.');
                }
            }           
        });
    }
});