
Ext.application({
    name:'myDataView',
    requires:[
        'Ext.Panel',
        'Ext.data.Store',
        'Ext.DataView'],
    launch:function(){
        Ext.define('toy', {
            extend:'Ext.data.Model',
            config:{
                fields: ['grade', 'price', 'name', 'photo']
            }
        });
        var toyStore = Ext.create('Ext.data.Store',{
            model: 'toy',
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
            store: toyStore,
            itemTpl: '<div width="300"><img src="./img/{photo}.jpg" width="100%" ><font color="blue"><BR>연령:{grade}세 이하  <BR>가격:{price} <BR>이름: <B>{name}</B> </font></div>',
                
            listeners:{
                itemtap:function(list,index, item)
                {
                    console.log(toyStore);
                    alert('경고','선택은 ' +  
                    toyStore.data.items[index].data.grade + '세이하의  ' + 
                    toyStore.data.items[index].data.name + '입니다.');
                }
            },
            scrollable: 'horizontal',
            inline: {
                wrap: false
            },
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert('연령:' + record.get('grade') + '가격:' + record.get('price') + ' 이름:'  + record.get('name') + "선택 index:" + index);
                }
            }
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

