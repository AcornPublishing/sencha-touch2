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
            itemTpl: '<div>{schoolgrade}�г�{shoolclass}�� �̸�: <B>{name}</B> </div>',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('schoolgrade') + '�г�' +  record.get('shoolclass') + '�� '  + record.get('name') + " �л��� ���õǾ����ϴ�. , index:" + index);
                }
            },
            store: new Ext.create('Ext.data.Store',{
                model: 'school',
                sorters: 'schoolgrade',
                data: [
                    {schoolgrade: '1', shoolclass: '1', name: 'ȫ�浿'},
                    {schoolgrade: '1', shoolclass: '2', name: '�Ӳ���'},
                    {schoolgrade: '1', shoolclass: '3', name: '�̼���'},
                    {schoolgrade: '1', shoolclass: '4', name: '�Ѹ�'},
                    {schoolgrade: '1', shoolclass: '5', name: '�տ���'},
                    {schoolgrade: '2', shoolclass: '1', name: '�������'},
                    {schoolgrade: '2', shoolclass: '2', name: '���۸�'},
                    {schoolgrade: '2', shoolclass: '3', name: '��Ʈ��'},
                    {schoolgrade: '3', shoolclass: '1', name: '��ȭ'},
                    {schoolgrade: '3', shoolclass: '2', name: 'ȫ��'},
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
                text: '�л�����Ʈ �����ֱ�',
                handler: function(btn,event){
                    overlay.setCentered(false);
                    overlayToolbar.setTitle('�л�����Ʈ');
                    overlay.showBy(btn);                    
                }
            }, 
            {xtype: 'spacer'}, 
            {
                text: '�л�����Ʈ �����ֱ�',
                handler: function(btn,event){
                    overlay.setCentered(true);
                    overlayToolbar.setTitle('�л�����Ʈ');
                    overlay.show();                 
                }
            }]
        }];
        
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            items: dockedItems,
            html: "Overlay�� �����ִ� �����Դϴ�."
        });
    }
});