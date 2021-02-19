Ext.require('Ext.data.Store');
Ext.require('Ext.List') ;
Ext.application({
	name:'LIST',
	launch:function(){
		
	        Ext.define('company', {
	            extend:'Ext.data.Model',
	            config:{
	                fields: ['grade', 'ban', 'name']
	           }
	        });
	        
	        var companyStore = Ext.create('Ext.data.Store',{

		                model: 'company',
		                sorters: 'grade',
		                /*
		                grouper: function(record) {
		                    return record.get('grade') + " grade ";
		                }, 
		                */		                
		                data: [
		                    {grade: '1', ban: '1', name: '아무게'},
		                    {grade: '1', ban: '2', name: '아무게'},
		                    {grade: '1', ban: '3', name: '아무게'},
		                    {grade: '2', ban: '1', name: '아무게'},
		                    {grade: '2', ban: '2', name: '아무게'},
		                    {grade: '2', ban: '3', name: '아무게'},
		                    {grade: '3', ban: '1', name: '아무게'},
		                    {grade: '3', ban: '2', name: '아무게'},
		                    {grade: '4', ban: '1', name: '아무게'},
		                    {grade: '4', ban: '2', name: '아무게'},
		                ],
			    groupField: 'grade',
			    groupDir: 'DESC'
	        })	        	
	        
		var companyList = new Ext.create('Ext.List', {
			flex:1,
			itemTpl: '<div>학년:{grade} 반:{ban} 이름: <B>{name}</B> </div>',
	                grouped:true,
	            	onItemDisclosure: {
	                	handler: function(record, btn, index) {
	                    		alert('학년:' + record.get('grade') + '반:' + record.get('ban') + ' 이름:'  + record.get('name') + "손들어... , index:" + index);
		            	}
		        },
	    		store: companyStore
	    	});

	        var panel = new Ext.create('Ext.Panel', {
	            fullscreen: true,
	            layout: {
	                type: 'vbox',
	                align: 'stretch',
	            },
	            items: companyList
	        });
	}
});

