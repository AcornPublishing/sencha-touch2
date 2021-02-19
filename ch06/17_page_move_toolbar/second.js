Ext.ns("second");

second.init = function()
{
    second.panel = new Ext.create('Ext.form.Panel',
    {
		flex: 1,
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
		    title: '�ι�° ������',
		    instructions: 'Sencha Touch �������̵�',		
	   
		    items:[
		    {   
		        xtype: 'textfield',
		        name:'inputvalue',
		        value:'�Է°�'
		    }, 		    
		    { 	xtype: 'spacer',
		    	height: 50
		    },		            
			{
				xtype:'button',
				text:'ù��° ������ ȣ��',
				handler:function(){
					main.panel.setActiveItem(first.panel);
				}
			},
		    { 	
		    	xtype: 'spacer',
		    	height: 50
		    }],
		}],	
	    setValue:function(val)
	    {
	    	console.log('val:' + val);
	    	Ext.ComponentQuery.query('[name=inputvalue]', second.panel)[0].setValue( val);
	    }			
    });

}


