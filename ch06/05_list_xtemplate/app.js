

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
        ],      
        grouper: {
            groupFn: function(record) {
                return record.get('grade')[0] + '학년';
            }
        },              
        });             
        var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '<tpl if="grade==\'1\'">',
                '<div><table border="1" width="100%"><tr><td>학년:{grade}</td><td>반:{ban}</td></tr><td colspan="2">반이름: <B>{name}</B></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="grade==\'2\'">',
                '<div><table border="1" width="100%"><tr><td>학년:{grade}</td><td>반:{ban}</td></tr><td colspan="2">반이름: <B>{name}</B></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="grade==\'3\'">',
                '<div><table border="1" width="100%"><tr><td>학년:{grade}</td><td>반:{ban}</td></tr><td colspan="2">반이름: <B>{name}</B></td></tr></table> </div>',            
                '</tpl>',
                '<tpl else if="grade==\'4\'">',
                '<div><table border="1" width="100%"><tr><td>학년:{grade}</td><td>반:{ban}</td></tr><td colspan="2">반이름: <B>{name}</B></td></tr></table> </div>',            
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
                    alert('선택은 ' +  
                        schoolStore.data.items[index].data.grade + '학년의 ' + 
                        schoolStore.data.items[index].data.name + '입니다.');
                }
            },
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert('학년:' + record.get('grade') + '반:' + record.get('ban') + ' 이름:'  + record.get('name') + "우승 , index:" + index);
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
                itemTpl: '<div><font color="green">학년:{grade} 반:{ban}</div><div><small> 이름: <B>{name}</B> </small></font></div>',
                grouped:true,
                 
                listeners:{
                    itemtap:function(list,index, item)
                    {
                        alert('선택은 ' +  
                        schoolStore.data.items[index].data.grade + '학년의 ' + 
                        schoolStore.data.items[index].data.name + '입니다.');
                    }
                },
                onItemDisclosure: {
                    handler: function(record, btn, index) {
                        alert('학년:' + record.get('grade') + '반:' + record.get('ban') + ' 이름:'  + record.get('name') + "우승... , index:" + index);
                    }
                }
            }]
        });
    }
});




