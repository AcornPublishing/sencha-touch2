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
            html: 'Panel 바탕입니다.<BR>이곳에 글자가 쓰여집니다.'  + 
                  '<BR><font color="red">이제 시작해 볼까요?</font>' + 
                  '<BR><BR><BR><center><img src="./img/user.png" width=100>'
        });    
    }
});
