
Ext.application({
    name:'MyDataView',
    requires:[
        'Ext.Panel',
        'Ext.data.Store',        
        'Ext.DataView'],    
    launch:function(){
    
        Ext.define('company', {
            extend:'Ext.data.Model',
            config:{
                fields: ['grade', 'price', 'name', 'photo']
            }
        });
            
        var companyStore = Ext.create('Ext.data.Store',{
            model: 'company',
            sorters: 'grade',                       
            data: [
                {grade: '7', price: '1000', name: 'Toy1', photo:'t1'},
                {grade: '7', price: '2000', name: 'Toy2', photo:'t2'},
                {grade: '7', price: '3000', name: 'Toy3', photo:'t3'},
                {grade: '7', price: '4000', name: 'Toy4', photo:'t4'}
            ]                   
        });             
        
        var toyView = new Ext.create('Ext.DataView', {
            flex:1,
            style:'background-color:black',
            store: companyStore,
            itemTpl: '<div style="float:left" width="30%"><img src="./img/{photo}.jpg" width="100%" ><font color="blue"><BR>����:{grade}�� ����  <BR>����:{price} <BR>�̸�: <B>{name}</B> </font></div>',
                
            listeners:{
                itemtap:function(list,index, item)
                {
                    console.log(companyStore);
                    alert('��� ������ ' +  
                    companyStore.data.items[index].data.grade + '��������  ' + 
                    companyStore.data.items[index].data.name + '�Դϴ�.');
                }
            },
            scrollable: 'vertical',        
        });
        var panel = new Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: {
            type: 'vbox',
            align: 'stretch',
            },
            items: toyView
        });
    }
});

