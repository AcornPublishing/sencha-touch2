
Ext.define('MyToyApp.controller.MyToyController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            myToyView: 'mytoyview',
            myToyDataView : 'mytoydataview',
        },
        control: {
            myToyDataView: {
                itemtap: 'onMyToyDataViewItemTap'
            }
        }
    },
    launch: function() {
        
        toyPanel = Ext.create('MyToyApp.view.MyToyView'); 

        Ext.getStore('MyToyStore').load({
            callback: this.onMyToyStoreLoad,
            scope: this
        });
    },
    onMyToyStoreLoad: function() {
        this.getMyToyDataView().setStore(Ext.getStore('MyToyStore'));
    },    
    onMyToyDataViewItemTap:function(list, index, item){
        alert('선택한 장난감은 ' +  
            Ext.getStore('MyToyStore').data.items[index].data.grade + '세이하의  ' + 
            Ext.getStore('MyToyStore').data.items[index].data.name + '입니다.');

    }
});