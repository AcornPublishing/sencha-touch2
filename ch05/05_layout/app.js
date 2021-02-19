Ext.application({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',    
    glossOnIcon: false,
    requires:['Ext.Panel'],
    launch: function() {
        var panel = new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox',
                align:'stretch',
            },
            items:[
            {
                flex:1,                   
                style:'background-color:red;font-size:40px',
                html: '첫번째'
            },
            {
                flex:3,
                style:'background-color:green;font-size:40px',
                html: '두번째'
            },
            {
                flex:1,
                //html: '세번째',
                style:'background-color:blue;font-size:40px',     
                layout:{
                type:'hbox',
                align:'stretch',
                },                                   
                items:[
                {
                    flex:3,                     
                    style:'background-color:yellow;;font-size:40px',
                    html: '네번째'
                },              
                {
                    flex:5,
                    style:'background-color:orange;font-size:40px',
                    html: '다섯번째'
                }]
            }]
        });    
    }
});