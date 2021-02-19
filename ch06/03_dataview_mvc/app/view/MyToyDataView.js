Ext.define("MyToyApp.view.MyToyDataView", {
    extend: 'Ext.DataView',   
    xtype:'mytoydataview',
    requires:[
        'Ext.Panel',
        'Ext.data.Store',
        'Ext.DataView'],
    config: {
        flex:1,
        style:'background-color:black',
        itemTpl: '<div width="300"><img src="./resources/img/{photo}.jpg" width="100%" ><font color="blue"><BR>연령:{grade}세 이하  <BR>가격:{price} <BR>이름: <B>{name}</B> </font></div>',
        scrollable: 'horizontal',
        inline: {
            wrap: false
        },
    }    
});

