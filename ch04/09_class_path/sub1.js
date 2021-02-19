Ext.ns("sub1");
sub1.obj = {
    init:function(){
        Ext.require('Ext.Panel');
        sub1.panel = new Ext.create('Ext.Panel',{
            
            flex:1,
            html:'Sub1 페이지입니다.<BR>' + 
                 '나중에 호출되어야 정상입니다.',
        }); 
    }
}




