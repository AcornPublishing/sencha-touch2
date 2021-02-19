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
		    title: '두번째 페이지',
		    instructions: 'Sencha Touch 페이지이동',		
	   
		    items:[
		    {   
		        xtype: 'textfield',
		        name:'inputvalue',
		        value:'입력값'
		    }, 		    
		    { 	xtype: 'spacer',
		    	height: 50
		    },		            
			{
				xtype:'button',
				text:'첫번째 페이지 호출',
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


