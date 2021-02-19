Ext.application({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    requires:['Ext.Panel'],
    launch: function() {
        Ext.require('Ext.Panel');
        var panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            items:[
                {
                    docked : 'top',
                    style:'background-color:blue;font-size:40px',
                    xtype: 'panel',
                    html: 'TOP'
                },
                {
                    docked : 'bottom',
                    xtype: 'panel',
                    style:'background-color:green;font-size:40px',
                    html: '<font color="yellow">BOTTOM</font>'
                }               
            ],
            html: 'Panel �����Դϴ�.<BR>�̰��� ���ڰ� �������ϴ�.'  + 
                  '<BR><font color="red">���� ������ �����?</font>' + 
                  '<BR><BR><BR><center><img src="./img/user.png" width=100>'
        });    
    }
});
