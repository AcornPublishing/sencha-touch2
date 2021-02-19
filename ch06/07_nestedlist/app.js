
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
                        text: 'À¯Ã¤»ö',
                        items: [
                        {
                            text: 'ºÓÀº»ö',
                            items: [
                            {
                                text: '<font color="red">»¡°­</font> ',
                                leaf:true
            
                            },
                            {
                                text: '<font color="orange">¿À·»Áö</font> ',
                                leaf:true
            
                            }]
                        },{
                            text: 'Çª¸¥»ö',
                            items: [
                            {
                                text: '<font color="blue">ÆÄ¶û</font> ',
                                leaf:true
            
                            },
                            {
                                text: '<font color="green">³ì»ö</font> ',
                                leaf:true
            
                            }]
                        }]
                    },
                    {
                        text: '¹«Ã¤»ö',
                        items: [
                        {
                            text: '<font color="white">Èò»ö</font> ',                           
                            leaf:true
            
                        },
                        {
                            text: '<font color="grey">È¸»ö</font> ',                            
                            leaf:true
            
                        },
                        {
                            text: '<font color="black">°ËÁ¤»ö</font> ',                         
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
            title:'ÆÈ·¹Æ®',
            store: store,
            listeners: {
                leafitemtap: function(me, list, index, item, e) {
                    var store = list.getStore(),
                        record  = store.getAt(index);
                        console.log(record);
                        alert(record.data.text + 'ÀÔ´Ï´Ù.');
                }
            }           
        });
    }
});