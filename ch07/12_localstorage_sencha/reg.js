Ext.ns("reg");

reg.init = function()
{
    reg.panel = new Ext.create('Ext.form.Panel',{
        flex:1,
        layout: {
          type: 'vbox',
          pack: 'center',
          align:'stretch',
        }, 
        items: [
        {
          xtype: 'fieldset',
          title: '로컬스토리지 등록',
          items:[
          {
            label: '번호',   
            xtype: 'textfield',
            name:  'num'
          },                  
          {   
            label: '이름',
            xtype: 'textfield',
            name: 'name'
          }],
        },
        {
            xtype:'button',
            text:'등록',
            handler:function(){
                console.log(reg.panel.getValues());
                common.empStorageStore.add(reg.panel.getValues());
                common.empStorageStore.sync();
            }
        }]
    }); 
}

