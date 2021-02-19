Ext.ns("contacts");

Ext.application({
    name:'Contacts',
    requires:[
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.List',
        'Ext.data.Store',
        ],
        
    launch:function(){
    	
        Ext.define('tellist', {
            extend:'Ext.data.Model',
            config:{
             fields: ['name', 'tel']
            }
        });
        var orgData= [{tel: '010-2623-9687', name: '홍길동' },
        			  {tel: '010-2623-9687', name: '홍길동' },
        			  {tel: '010-2623-9687', name: '홍길동' }];

        var store1 =   new Ext.create('Ext.data.Store',{
                model: 'tellist',
                sorters: 'name',                
                data: orgData,
                autoLoad:true,
        });             

            
        contacts.panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
            	type:'vbox'
            },
            items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title:'전화번호부',
                items: [{
                    text: '맨위로',
                    handler: function(btn,event){
                        alert('가져오기');
                        store.setData(orgData);
                        Ext.getCmp('phonelist').setStore(store);
                    }
                }]
            },
            {
            	xtype:'list',
            	id:'phonelist',
	        	flex:1,	        	
	            itemTpl: '<div><img src="./img/phone2.png" width="35", height="50">&nbsp;&nbsp;{name}   <a href="tel:{tel}"><img src="./img/phone1.png" width="35", height="50"></a> </div>',         
	            store:store1,
        	}]
        });    
    }
});