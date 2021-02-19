Ext.ns("scrollList");

Ext.application({
    name:'LIST',
    requires:[
        'Ext.Panel',
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
        // 원 데이터
        var orgData= [{write_time: '09/20 11:11:11', name: 'lee', write:'안녕하세요 오늘은 날씨가 덥네요' },
                      {write_time: '09/20 11:12:11', name: 'choi', write:'비가 온다네요'},
                      {write_time: '09/20 11:13:22', name: 'lee', write:'날씨가 좋았으면 좋겠네'},
                      {write_time: '09/20 11:14:33', name: 'choi', write:'낼모래 워크샵 가는데....ㅎㅎ'},
                      {write_time: '09/20 11:15:11', name: 'kim', write:'나도 데려가요...'},
                      {write_time: '09/20 11:17:05', name: 'choi', write:'휴~~ 오늘도 야근인데..'}];
        // 추가할 데이타                
        var addData= [{write_time: '09/20 11:21:55', name: 'kim', write:'방금 도착했어요..'},
                      {write_time: '09/20 11:22:43', name: 'lee', write:'12시까지 모이기로 했잖아!!'},
                      {write_time: '09/20 11:23:56', name: 'lee', write:'늦은애들 회비 추가!!'},
                      {write_time: '09/20 11:24:00', name: 'kim', write:'그러게 어디 있어요..'}];
        
        var store =   new Ext.data.Store({
                model: 'friend',
                sorters: 'wirte_time',                
                data: orgData,
                autoLoad:true,
        });             

    
        var friend_list = new Ext.create('Ext.List',{
            name:'friend_list',
            blockRefresh:true,
            height:400,
            itemTpl: '<div><table><tr><td><img src="./img/{name}.png" width="35", height="50">&nbsp;&nbsp;</td><td>{write}<BR><font size="2"> {write_time} 이름: {name}</font></td></tr></table> </div>',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                        alert('등급:' + record.get('write_time') + ' 구분:' + record.get('friend_class') + ' 이름:'  + record.get('name') + "에게 전화합니다. , index:" + index);
                }
            },          
            store:store,
        });

        var myScroller;             
        scrollList.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            html:'<BR><font size="2">리스트를 아래로 드래그 하면 데이타를 추가합니다.',
            
            items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title:'LIST ADD ',
                items: [{
                    text: '맨위로',
                    handler: function(btn,event){
                        myScroller.scrollTo({x:0,y:0});
                    }
                }]
            },
            friend_list],
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