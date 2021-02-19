
Ext.define('MyPageApp.controller.MyPageController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            myPageView:         'mypageview',
            myFirstPageView :   'myfirstpageview',
            mySecondPageView :  'mysecondpageview',
            btnFirst   :        'myfirstpageview [name=callview]',
            btnSecond  :        'mysecondpageview [name=callview]',            
            txtFirst   :        'myfirstpageview [name=inputvalue]',
            txtSecond  :        'mysecondpageview [name=inputvalue]',
            btnFirstTool   :    'mypageview [name=callfirstview]',
            btnSecondTool  :    'mypageview [name=callsecondview]',
        },
        control: {
            btnFirst: {
                tap: 'onCallSecondView'
            },
            btnSecond: {
                tap: 'onCallFirstView'
            },
            btnFirstTool: {
                tap: 'onCallFirstView'
            },
            btnSecondTool: {
                tap: 'onCallSecondView'
            }            
        }
    },
    launch: function() {
        console.log('launch');
        mainPanel = Ext.create('MyPageApp.view.MyPageView');
        Ext.Viewport.add(mainPanel); 
        firstPanel = Ext.create('MyPageApp.view.MyFirstPageView');
        secondPanel = Ext.create('MyPageApp.view.MySecondPageView');
        mainPanel.add(firstPanel);
        mainPanel.add(secondPanel);
        mainPanel.setActiveItem(firstPanel);
    },
    onCallSecondView:function(){
        this.getTxtSecond().setValue(this.getTxtFirst().getValue());
        this.getMyPageView().setActiveItem(this.getMySecondPageView());
    },
    onCallFirstView:function(){
        this.getMyPageView().setActiveItem(this.getMyFirstPageView());
    }
});