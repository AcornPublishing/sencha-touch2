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
        itemTpl: '<div width="300"><img src="./resources/img/{photo}.jpg" width="100%" ><font color="blue"><BR>����:{grade}�� ����  <BR>����:{price} <BR>�̸�: <B>{name}</B> </font></div>',
        scrollable: 'horizontal',
        inline: {
            wrap: false
        },
    }    
});

