Ext.define('art',{
	extend:'Ext.Panel',
    fullscreen:true,    
    requires:[
    	'Ext.form.FieldSet',
    	'Ext.Toolbar',
    	'Ext.field.Text',
    	'Ext.Img',    	
    	],    
    config:{
	    layout: {
	      	type: 'vbox',
	      	align:'stretch',
	    }, 
	    items: [
	    {
	      	flex:1,
	      	xtype: 'fieldset',
	      	items:[
			{
			    name:'imgSrc',
	            xtype: 'image',
	            src: '',
	            width:200,
	            height:300,
	            centered:true,            
	            flex: 1
	        },              
	      	{
		      	name:'subject',
		      	xtype:'textfield',
		      	text:'',
	      	}],
	    }],
	},
    setPage:function(count, subject, img)
    {
    	Ext.ComponentQuery.query("[name=imgSrc]", this)[0].setSrc('./img/' + img);
    	Ext.ComponentQuery.query("[name=subject]", this)[0].setValue(subject);
    } 	
});

