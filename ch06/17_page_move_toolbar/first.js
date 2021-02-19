Ext.ns("first");

first.init = function()
{
  	first.panel = new Ext.create('Ext.form.Panel',{
	    flex:1,        
	    requires:['Ext.form.Panel',
	    		'Ext.field.Text',
	    		],
	    layout: {
	      type: 'vbox',
	      pack: 'center',
	      align:'stretch',
	    }, 
	    items: [
	    {
	      	xtype: 'fieldset',
	      	title: '첫번째 페이지',
	      	instructions: 'Sencha Touch 페이지이동',	
	      	items:[
	      	{   
	        	xtype: 'textfield',
	        	name:'inputvalue',
	        	value:'입력값'
	      	},                  
	      	{   
	        	xtype: 'spacer',
	        	height: 50
	      	},                  
	      	{
	      		xtype:'button',
	      		text:'두번째 페이지 호출',
	        	handler:function(){                 
					main.panel.setActiveItem(second.panel);
					console.log(Ext.ComponentQuery.query('[name=inputvalue]',first.panel));
					second.panel.setValue(Ext.ComponentQuery.query('[name=inputvalue]',first.panel)[0].getValue());
	        	}
	      	},
	      	{   
	      		xtype: 'spacer',
	      		height: 50
	      	}],
    	}]
	}); 
}

