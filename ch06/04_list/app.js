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
                return record.get('grade') + " 학년 ";
            },                      
            data: [
                {grade: '1', ban: '1', name: '해찬나래반'},
                {grade: '1', ban: '2', name: '꿈나무반'},
                {grade: '1', ban: '3', name: '물오리반'},
                {grade: '2', ban: '1', name: '기운찬반'},
                {grade: '2', ban: '2', name: '정직한반'},
                {grade: '2', ban: '3', name: '해님달님반'},
                {grade: '3', ban: '1', name: '호야반'},
                {grade: '3', ban: '2', name: '늘푸른반'},
                {grade: '4', ban: '1', name: '평화반'},
                {grade: '4', ban: '2', name: '오직하나반'},
            ]
        });
        
        var schoolList = new Ext.create('Ext.List', {
            flex:1,
            itemTpl: '<div>학년:{grade} 반:{ban} 반이름: <B>{name}</B> </div>',
                grouped:true,
                onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert('학년:' + record.get('grade') + '반:' + record.get('ban') + ' 반이름:'  + record.get('name') + "우승 , index:" + index);
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

