Ext.define("MyToyApp.view.MyToyView", {
    extend: 'Ext.Panel',   
    xtype:'mytoyview',
    requires:[
        'Ext.Panel',
        'Ext.data.Store',
        'Ext.DataView',
        'MyToyApp.view.MyToyDataView'],
    config: {

        fullscreen: true,
        layout: {
        type: 'vbox',
        align: 'stretch',
        },
        items:{
            xtype:'mytoydataview',
            style:'background-color:black',
        }
    }    
});
