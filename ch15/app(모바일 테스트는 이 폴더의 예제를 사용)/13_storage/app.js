Ext.ns("storage");

Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.application({
    name:'storage',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.List',
        'Ext.data.Store',
        'PhoneGap',
        ],
        
    launch:function(){
        
        Ext.define('tellist', {
            extend:'Ext.data.Model',
            config:{
             fields: ['id', 'data']
            }
        });
        var orgData= [{id: '1', data: '홍길동' }];

        var storeStorage =   new Ext.create('Ext.data.Store',{
                model: 'tellist',
                sorters: 'name',                
                data: orgData,
                autoLoad:true,
        });              
        storage.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox'
            },
            items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title:'스토리지',
            },
            {
                xtype:'list',
                id:'storagelist',
                flex:1,             
                itemTpl: '<div >{id} {data}</div>',         
            }]
        }); 
        document.addEventListener("deviceready", onDeviceReady, false);
        function populateDB(tx) {
            tx.executeSql('DROP TABLE IF EXISTS DEMO');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (3, "Third row")');
        }
        function queryDB(tx) {
            tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
        }
        function querySuccess(tx, results) {
            var len = results.rows.length;
            var str="";
            console.log("DEMO table: " + len + " rows found.");
            for (var i=0; i<len; i++){
                //alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
                if( i != 0 )
                {
                    str = str + ",";
                }     
                str = str + "{'id':'" + results.rows.item(i).id + "','data':'" + results.rows.item(i).data + "'}";          
            }
            var storageData = Ext.decode("[" + str + "]");
            storeStorage.setData(storageData);
            Ext.getCmp('storagelist').setStore(storeStorage);               
        }
        function errorCB(err) {
            console.log("Error processing SQL: "+err.code);
        }
        function successCB() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryDB, errorCB);
        }
        function onDeviceReady() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(populateDB, errorCB, successCB);
        }         
    }
});