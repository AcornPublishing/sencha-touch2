
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
        alert('������ �峭���� ' +  
            Ext.getStore('MyToyStore').data.items[index].data.grade + '��������  ' + 
            Ext.getStore('MyToyStore').data.items[index].data.name + '�Դϴ�.');

    }
});