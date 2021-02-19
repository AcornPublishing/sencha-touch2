Ext.application({
    name:'LIST',
    requires:[
        'Ext.Panel',
        'Ext.data.Store',
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
            getGroupString : function(record) {
                return record.get('grade') + " �г� ";
            },                      
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
            ]
        });
        
        var schoolList = new Ext.create('Ext.List', {
            flex:1,
            itemTpl: '<div>�г�:{grade} ��:{ban} ���̸�: <B>{name}</B> </div>',
                grouped:true,
                onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert('�г�:' + record.get('grade') + '��:' + record.get('ban') + ' ���̸�:'  + record.get('name') + "��� , index:" + index);
                }
            },
            store:schoolStore
        });
        var panel = new Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center',

            },
            items: schoolList
        });
    }
});

