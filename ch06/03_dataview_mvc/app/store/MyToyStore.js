
Ext.define('MyToyApp.store.MyToyStore', {
    extend  : 'Ext.data.Store', 
    requires: ['MyToyApp.model.MyToyModel'],
    config: {
        model: 'MyToyApp.model.MyToyModel',
        sorters: 'grade',                       
        data: [
            {grade: '7', price: '1000', name: 'Toy1', photo:'t1'},
            {grade: '7', price: '2000', name: 'Toy2', photo:'t2'},
            {grade: '7', price: '3000', name: 'Toy3', photo:'t3'},
            {grade: '7', price: '4000', name: 'Toy4', photo:'t4'}
        ]
    }
});

