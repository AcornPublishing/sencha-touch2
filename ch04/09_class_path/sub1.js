Ext.ns("sub1");
sub1.obj = {
    init:function(){
        Ext.require('Ext.Panel');
        sub1.panel = new Ext.create('Ext.Panel',{
            
            flex:1,
            html:'Sub1 �������Դϴ�.<BR>' + 
                 '���߿� ȣ��Ǿ�� �����Դϴ�.',
        }); 
    }
}




