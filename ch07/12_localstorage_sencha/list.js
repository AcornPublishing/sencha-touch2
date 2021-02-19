Ext.ns("list");

list.init = function()
{   
    common.empStorageStore.load();
    
    list.panel = new Ext.create('Ext.Panel',
    {
        flex:1,
        layout: {
            type: 'vbox',
            pack: 'center',
            align:'stretch',
        },            
        items: [
        ],      
    });
    list.empList = Ext.create('Ext.List',{
        flex:1,
        id:'empList',
        store:common.empStorageStore,
        onItemDisclosure: {
            handler: function(record, btn, index) {
                alert(record.get('name') + "을 삭제합니다.");
                common.empStorageStore.removeAt(index);
                common.empStorageStore.sync();
                list.empList.setStore(common.empStorageStore);  
            }
        },
        itemTpl:'<div><strong>{num}</strong>{name}</div>',
    });
    list.panel.add(list.empList);
}
list.loadData=function()
{
    common.empStorageStore.load();
    list.empList.setStore(common.empStorageStore); 
}