Ext.ns('main');
Ext.application({
    name:'HelloSenchaTouch',
    requires:['Ext.Panel'],
    launch: function() {
        var myData = {
            "data1":[
            {
                "bookname":"누구를 위하여 종을 울리나",
                "writer":"헤밍웨이"
            },
            {
                "bookname":"데미안",
                "writer":"헤르만헤세"
            },            
            {
                "bookname":"센차터치2.0",
                "writer":"이병옥,최성민"
            },
            {
                "bookname":"소나기",
                "writer":"황순원"
            }]
        };
        main.javascriptFunc=function()
        {
            alert('센차 함수를 호출하셨습니다.');
        },
        Ext.create("Ext.Panel", {
            fullscreen: true,
            layout:
            {
                type:'vbox',
                align:'strech',
            },
            style:'background-color: #fff',
            items:[
            {
                flex:1,
                xtype:'panel',
                data:myData,
                tpl:[
                    '<center>',
                    '<BR>',
                    '<B>감명깊게 읽은 책</B><BR><BR>',
                    '<table width=90% border=1>',
                    '<tpl for="data1">',
                    '<tr><td class="c1">책명: {bookname} </td><td class="c2">저자: {writer} </td></tr>',
                    '</tpl>',
                    '</table><BR><BR>',
                    '<input type="button" class="button1" value="입력" onClick="javascript:main.javascriptFunc();">'
                ]
            }]              
        });     
    }
});