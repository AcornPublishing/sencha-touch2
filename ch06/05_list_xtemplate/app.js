

Ext.application({
    name:'listComplex',
    requires:[
        'Ext.Panel',
        'Ext.data.Store',
        'Ext.dataview.List',
        'Ext.List'
    ],  
    
    launch:function(){

    Ext.define('school', {
        extend:'Ext.data.Model',
        config:{
            fields: ['grade', 'ban', 'name']
        }
    });
        
    var schoolStore = Ext.create('Ext.data.Store',{
        model: 'school',
        sorters: 'grade',                       
        data: [
            {grade: '1', ban: '1', name: '����������'},
            {grade: '1', ban: '2', name: '�޳�����'},
            {grade: '1', ban: '3', name: '��������'},
            {grade: '2', ban: '1', name: '�������'},
            {grade: '2', ban: '2', name: '�����ѹ�'},
            {grade: '2', ban: '3', name: '�شԴ޴Թ�'},
            {grade: '3', ban: '1', name: 'ȣ�߹�'},
            {grade: '3', ban: '2', name: '��Ǫ����'},
            {grade: '4', ban: '1', name: '��ȭ��'},
            {grade: '4', ban: '2', name: '�����ϳ���'},
        ],      
        grouper: {
            groupFn: function(record) {
                return record.get('grade')[0] + '�г�';
            }
        },              
        });             
        var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '<tpl if="grade==\'1\'">',
                '<div><table border="1" width="100%"><tr><td>�г�:{grade}</td><td>��:{ban}</td></tr><td colspan="2">���̸�: <B>{name}</B></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="grade==\'2\'">',
                '<div><table border="1" width="100%"><tr><td>�г�:{grade}</td><td>��:{ban}</td></tr><td colspan="2">���̸�: <B>{name}</B></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="grade==\'3\'">',
                '<div><table border="1" width="100%"><tr><td>�г�:{grade}</td><td>��:{ban}</td></tr><td colspan="2">���̸�: <B>{name}</B></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="grade==\'4\'">',
                '<div><table border="1" width="100%"><tr><td>�г�:{grade}</td><td>��:{ban}</td></tr><td colspan="2">���̸�: <B>{name}</B></td></tr></table> </div>',            
                '</tpl>',            
            '</tpl>'
            );          
        var schoolList = new Ext.create('Ext.List', {
            flex:1,
            store: schoolStore,
            style:"background-image:url('./img/flower.png');",          
            grouped:true,
            itemTpl:itemTemplate,
            listeners:{
                itemtap:function(list,index, item)
                {
                    alert('������ ' +  
                        schoolStore.data.items[index].data.grade + '�г��� ' + 
                        schoolStore.data.items[index].data.name + '�Դϴ�.');
                }
            },
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert('�г�:' + record.get('grade') + '��:' + record.get('ban') + ' �̸�:'  + record.get('name') + "��� , index:" + index);
                }
            }
        });

        var panel = new Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: {
            type: 'vbox',
            align: 'stretch',
            },
            items: [
            schoolList,
            {
                xtype:'list',
                flex:1,
                store: schoolStore,
                itemTpl: '<div><font color="green">�г�:{grade} ��:{ban}</div><div><small> �̸�: <B>{name}</B> </small></font></div>',
                grouped:true,
                 
                listeners:{
                    itemtap:function(list,index, item)
                    {
                        alert('������ ' +  
                        schoolStore.data.items[index].data.grade + '�г��� ' + 
                        schoolStore.data.items[index].data.name + '�Դϴ�.');
                    }
                },
                onItemDisclosure: {
                    handler: function(record, btn, index) {
                        alert('�г�:' + record.get('grade') + '��:' + record.get('ban') + ' �̸�:'  + record.get('name') + "���... , index:" + index);
                    }
                }
            }]
        });
    }
});




