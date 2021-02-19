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
		                    {grade: '1', ban: '1', name: '�ƹ���'},
		                    {grade: '1', ban: '2', name: '�ƹ���'},
		                    {grade: '1', ban: '3', name: '�ƹ���'},
		                    {grade: '2', ban: '1', name: '�ƹ���'},
		                    {grade: '2', ban: '2', name: '�ƹ���'},
		                    {grade: '2', ban: '3', name: '�ƹ���'},
		                    {grade: '3', ban: '1', name: '�ƹ���'},
		                    {grade: '3', ban: '2', name: '�ƹ���'},
		                    {grade: '4', ban: '1', name: '�ƹ���'},
		                    {grade: '4', ban: '2', name: '�ƹ���'},
		                ],
			    groupField: 'grade',
			    groupDir: 'DESC'
	        })	        	
	        
		var companyList = new Ext.create('Ext.List', {
			flex:1,
			itemTpl: '<div>�г�:{grade} ��:{ban} �̸�: <B>{name}</B> </div>',
	                grouped:true,
	            	onItemDisclosure: {
	                	handler: function(record, btn, index) {
	                    		alert('�г�:' + record.get('grade') + '��:' + record.get('ban') + ' �̸�:'  + record.get('name') + "�յ��... , index:" + index);
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

