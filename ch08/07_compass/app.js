Ext.ns("scrollList");

Ext.application({
    name:'LIST',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.List',
        'Ext.data.Store',
        ],
    launch:function(){
        Ext.define('friend', {
            extend:'Ext.data.Model',
            config:{
             	fields: ['write_time', 'friend_class', 'name', 'write']
            }
        });
        // �� ������
        var orgData= [{write_time: '09/20 11:11:11', name: 'lee', write:'�ȳ��ϼ��� ������ ������ ���׿�' },
                      {write_time: '09/20 11:12:11', name: 'choi', write:'�� �´ٳ׿�'},
                      {write_time: '09/20 11:13:22', name: 'lee', write:'������ �������� ���ڳ�'},
                      {write_time: '09/20 11:14:33', name: 'choi', write:'���� ��ũ�� ���µ�....����'},
                      {write_time: '09/20 11:15:11', name: 'kim', write:'���� ��������...'},
                      {write_time: '09/20 11:17:05', name: 'choi', write:'��~~ ���õ� �߱��ε�..'}];
        // �߰��� ����Ÿ                
        var addData= [{write_time: '09/20 11:21:55', name: 'kim', write:'��� �����߾��..'},
                      {write_time: '09/20 11:22:43', name: 'lee', write:'12�ñ��� ���̱�� ���ݾ�!!'},
                      {write_time: '09/20 11:23:56', name: 'lee', write:'�����ֵ� ȸ�� �߰�!!'},
                      {write_time: '09/20 11:24:00', name: 'kim', write:'�׷��� ��� �־��..'}];
        
        var store = new Ext.data.Store({
            model: 'friend',
            sorters: 'wirte_time',                
            data: orgData,
            autoLoad:true,
        });             

    
        var friend_list = new Ext.create('Ext.List',{
            name:'friend_list',
            blockRefresh:true,
            height:400,
            itemTpl: '<div><table width="100%"><tr><td><img src="./img/{name}.png" width="35", height="50">&nbsp;&nbsp;</td><td>{write}<BR><font size="2"> {write_time} �̸�: {name}</font></td></tr></table> </div>',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert('���:' + record.get('write_time') + ' ����:' + record.get('friend_class') + ' �̸�:'  + record.get('name') + "���� ��ȭ�մϴ�. , index:" + index);
                }
            },          
            store:store,
        });

        var myScroller;
        scrollList.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            //html:'<BR><font size="2">����Ʈ�� �Ʒ��� �巡�� �ϸ� ����Ÿ�� �߰��մϴ�.',
            items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title:'CSS ',
                items: [{
                    text: '������',
                    handler: function(btn,event){
                        myScroller.scrollTo({x:0,y:0});
                    }
                }]
            },
            friend_list,
            {
                docked: 'bottom',
                xtype: 'toolbar',
                title:'�����κ���',
                ui:'light',
				items: [{
                    text: '������',
                    handler: function(btn,event){
                        myScroller.scrollTo({x:0,y:0});
                    }
                }]                
            }],
            addScrollList:function(a,b,c)
            {
                console.log(a);
                console.log(b);
                console.log(c);
                if(c != 0)
                    store.add(addData);
            }
        });   
        
        myScroller = friend_list.getScrollable().getScroller();
        myScroller.on('scrollend', scrollList.panel.addScrollList, this);       
    }
});