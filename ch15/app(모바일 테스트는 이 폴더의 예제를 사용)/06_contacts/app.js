Ext.ns("contacts");

Ext.Loader.setPath({
    'PhoneGap': 'cordova-1.8.1.js'
});

Ext.application({
    name:'Contacts',
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
             fields: ['name', 'tel']
            }
        });
        var orgData= [{tel: '010-2623-9687', typename: '홍길동' },
                      {tel: '010-2623-9687', typename: '홍길동' },
                      {tel: '010-2623-9687', typename: '홍길동' }];

        var storeTel =   new Ext.create('Ext.data.Store',{
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
                    text: '읽어오기',
                    handler: function(btn,event){
                        onSearchContacts();

                    }
                }]
            },
            {
                xtype:'list',
                id:'phonelist',
                flex:1,             
                itemTpl: '<div ><table width="100%"><tr><td>TEL:</td<td width="60%">{tel}</td><td width="20%"><a href="tel:{tel}"><img src="./img/phone1.png" width="35", height="50"></a></td></tr></table> </div>',         
            }]
        });   
         
	    // 폰갭의 준비에 기다린다. 
	    document.addEventListener("deviceready", onDeviceReady, false);
	
	    // 폰갭이 준비되면 전화번호를 조회해 온다. 
	    function onDeviceReady() {

	    }
	    
	    function onSearchContacts()
	    {
	        var options = new ContactFindOptions();
	        options.filter="";
	        options.multiple=true;
	        filter = ["displayName","phoneNumbers"];
	        navigator.contacts.find(filter, onSuccess, onError, options);	    
	    }
	    
	    // 전화버호를 성공적으로 가져왔을 때 수행할 메소드 이다. 
	    function onSuccess(contacts) {
	        var str="";
	        var k=0;
			try
			{
		        for (var i=0; i<contacts.length && i < 20 ; i++) {
		        	try
		        	{			
   	
		            	for (var j=0; j<contacts[i].phoneNumbers.length ; j++) {
			                try
		    				{
	
								if(contacts[i].phoneNumbers[j].type =='home' ||
								   contacts[i].phoneNumbers[j].type =='mobile')
								{
			    					if(k==1) 
				                	{
				                		str = str + "," + "{'typename':'" + contacts[i].phoneNumbers[j].type + "','tel':'" + contacts[i].phoneNumbers[j].value + "'}";
									}					
									else
									{				
										str = str + "{'typename':'" + contacts[i].phoneNumbers[j].type + "','tel':'" + contacts[i].phoneNumbers[j].value + "'}";
										k=1;
									}
								}
								
								   
							}catch(e){ console.log(e);}  
		            	}
		            }catch(e){ console.log(e);}
		        }
		    }catch(e){ console.log(e);}
	        
	        alert('[' + str + ']');
	       

	        orgData = Ext.decode('[' + str + ']') ;
	        storeTel.setData(orgData);
            Ext.getCmp('phonelist').setStore(storeTel);
	    };
	
	    // 에러발생시 호출할 메소드 이다.
	    function onError(contactError) {
	        alert('onError!');
	    }        
    }
});