Ext.ns("result");

result.init= function(){
	var UserList;
	var Userstore;
	
	Ext.define('Users', {
		extend:'Ext.data.Model',
		config:{
	    		fields: ['user_id','user_name','user_tel']
		}
	});     
	
	Userstore = new Ext.create('Ext.data.Store',{
	    model :'Users',               
	    data:[
	            // 공백
	    ],
	});     
	    
	UserList = new Ext.create('Ext.List',{
	        id:'UserList',
	        flex:1,
	        onItemDisclosure: false,
	        store:Userstore,                      
	        itemTpl:'<div><strong>{user_id}</strong>  <font color="blue">{user_name}</font> tel:{user_tel} </div>',
	});        
	 
	result.panel_result = new Ext.create('Ext.Panel',{
	        useCurrentLocation: true,               
	        scroll:'vertical',
	        cardSwitchAnimation:"slide",
	        fullscreen:true,
	
	        layout: {
	            type: 'vbox',           
	            align: 'stretch'
	        },
	        scroll: 'vertical',
	        items:UserList,
	        setUsersList:function(Jv_data) {
	       
		        Userstore = new Ext.data.Store({
		            model :'Users',
		            data:Jv_data,
		        });
		        Ext.getCmp('UserList').bindStore(Userstore);    
	        }     
	});

}