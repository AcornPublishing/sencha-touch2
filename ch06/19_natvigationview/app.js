Ext.ns("main");

Ext.application({
  name:'NavigationView',
  requires:[
    'Ext.Panel',
    'Ext.Toolbar',
    'Ext.form.FieldSet',
    'Ext.NavigationView',
    'first'],
  launch:function(){
    main = this;
    i=0;  
    first.panel = new Array(20);

    main.panel = new Ext.create('Ext.NavigationView',{
      fullscreen:true,
      
      layout:{
        type:'card',
        animation:"flip",
      },                   
      items :[
      {
        docked: 'top',
        xtype: 'toolbar',
        items: [
        {
            xtype:'button',
            text: '�г� �߰�',
            handler : function(btn) {
                if(i==20)
                {
                    alert('�ִ� ������ 20�� ���� �Դϴ�.');
                    return;
                }
                //main.panel.setActiveItem(first.panel);
                first.init(i);
                main.panel.push(first.panel[i]);
                i=i+1;
            }
        }]
      }], 
    });     
  }
});




