Ext.ns("art");

art.init = function(i)
{
    art.panel[i] = new Ext.create('Ext.Panel',{
        fullscreen:true,        
        layout: {
            type: 'vbox',
            align:'stretch',
        }, 
        items:[
        {
            flex:1,
            xtype: 'fieldset',
            items:[
            {
                id:'imgSrc',
                xtype: 'image',
                src: '',
                width:200,
                height:300,
                centered:true,            
                flex: 1
            },              
            {
                id:'subject',
                xtype:'textfield',
                text:'',
            }],
        }],
        setPage:function(count, subject, img)
        {
            Ext.ComponentQuery.query("#imgSrc")[0].setSrc('./img/' + img);
            Ext.ComponentQuery.query("#subject")[0].setValue(subject);
        }
    }); 
}

