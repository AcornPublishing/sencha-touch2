Ext.ns("package1.sub1");

package1.sub1.obj=
{
    init:function(){
        package1.sub1.panel = new Ext.create('Ext.Panel',{
            flex:1,
            html:'Package1->Sub1 페이지입니다.<BR><BR>' + 
                 '나중에 호출되어야 정상입니다.',
        }); 
    }
}