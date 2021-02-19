Ext.application({
    name:'overlay2',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.data.Store',
        'Ext.List'],
    launch:function(){
        
        var overlayToolbar = new Ext.create('Ext.Toolbar',{
           docked: 'top',
            items:[{
                xtype:'button',
                text:'Close',
                handler : function(btn) {
                    overlay.hide();
                }
            }]             
        });

        Ext.define('school', {
            extend:'Ext.data.Model',
            config:{
                fields: ['schoolgrade', 'shoolclass', 'name']
            }
        });
        
        var schoollist = new Ext.create('Ext.List',{
            width:380,
            height:340,
            itemTpl: '<div>{schoolgrade}학년{shoolclass}반 이름: <B>{name}</B> </div>',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('schoolgrade') + '학년' +  record.get('shoolclass') + '반 '  + record.get('name') + " 학생이 선택되었습니다. , index:" + index);
                }
            },
            store: new Ext.create('Ext.data.Store',{
                model: 'school',
                sorters: 'schoolgrade',
                data: [
                    {schoolgrade: '1', shoolclass: '1', name: '홍길동'},
                    {schoolgrade: '1', shoolclass: '2', name: '임꺽정'},
                    {schoolgrade: '1', shoolclass: '3', name: '이순신'},
                    {schoolgrade: '1', shoolclass: '4', name: '둘리'},
                    {schoolgrade: '1', shoolclass: '5', name: '손오공'},
                    {schoolgrade: '2', shoolclass: '1', name: '원더우먼'},
                    {schoolgrade: '2', shoolclass: '2', name: '슈퍼맨'},
                    {schoolgrade: '2', shoolclass: '3', name: '배트맨'},
                    {schoolgrade: '3', shoolclass: '1', name: '장화'},
                    {schoolgrade: '3', shoolclass: '2', name: '홍련'},
                ]
            })
        });
                
        var overlay = new Ext.create('Ext.Panel',{
            modal: true,
            centered: false,
            width: schoollist.width,
            height: schoollist.height,
            items:[ overlayToolbar,
            schoollist]
        });

        var dockedItems = [{
            docked: 'top',
            xtype: 'toolbar',
            items: [{
                text: '학생리스트 보여주기',
                handler: function(btn,event){
                    overlay.setCentered(false);
                    overlayToolbar.setTitle('학생리스트');
                    overlay.showBy(btn);                    
                }
            }, 
            {xtype: 'spacer'}, 
            {
                text: '학생리스트 보여주기',
                handler: function(btn,event){
                    overlay.setCentered(true);
                    overlayToolbar.setTitle('학생리스트');
                    overlay.show();                 
                }
            }]
        }];
        
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            items: dockedItems,
            html: "Overlay를 보여주는 예제입니다."
        });
    }
});