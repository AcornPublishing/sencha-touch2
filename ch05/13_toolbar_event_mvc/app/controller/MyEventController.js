
Ext.define('MyEventApp.controller.MyEventController', {
    extend: 'Ext.app.Controller',
    startx:0,
    endx:0,
    config: {
        refs: {
            myEventView: 'myeventview',
            btn1       : 'myeventview [name=button1]',
            btn2       : 'myeventview [name=button2]',
            lbl1       : 'myeventview [name=label1]',
            lbl2       : 'myeventview [name=label2]',
            lbl3       : 'myeventview [name=label3]',
            back       : 'myeventview [name=back]',            
            forward    : 'myeventview [name=forward]',            
        },
        control: {
            btn1: {
                tap: 'onTapBtn1'
            },
            btn2: {
                tap: 'onTapBtn2'
            },            
            lbl1: {
                tap: 'onTapLbl1'
            },            
            lbl2: {
                tap: 'onTapLbl2'
            },            
            lbl3: {
                tap: 'onTapLbl3'
            },   
            forward: {
                tap: 'onForward'
            },  
            back: {
                tap: 'onBack'
            },                                   
        }
    },
    launch: function() {
        var panel = Ext.create('MyEventApp.view.MyEventView');    
        
        this.getLbl1().element.addListener('myEvent', function(a,b,c){
            alert('label1이 클릭되었습니다.');
        });
        this.getLbl2().element.on('tap', function(){                      
        
            alert('label2가 클릭되었습니다. on 에서 이벤트를 잡았습니다.');         
        });
        var eventDispatcher = this.getEventDispatcher();
        startx=0;
        endx=0;

        //this.getLbl3()
        this.getLbl3().element.on('tapstart',  function(a,b,c,d){
            startx = a.pageX;
        
        });
        this.getLbl3().element.on('touchend',  function(a,b,c,d){
            console.log(endx  + "::" + startx);
            endx = a.pageX;
            
            if(startx-endx > 200)
            {
                console.log(endx  + ":" + startx);
                panel.setActiveItem(1);
            }
        
        });
        this.getLbl3().element.on('mouseup',  function(a,b,c,d){

            console.log(endx  + "::" + startx);
            endx = a.pageX;
            
            if(startx-endx > 200)
            {
                console.log(endx  + ":" + startx);
                panel.setActiveItem(1);
            }       
        }); 
    },
  
    onTapBtn1:function(){
        console.log('onTapBtn1');
        alert('첫번째 버튼입니다.');
  
    },
    onTapBtn2:function(){
        console.log('onTapBtn2');        
        this.getLbl1().element.fireEvent('myEvent','go event');
  
    },
    onTapLbl1:function(){
        console.log('onTapLbl1');
  
    },
    onTapLbl2:function(){
        console.log('onTapLbl2');
  
    },
    onTapLbl3:function(){
        console.log('onTapLbl3');
  
    },
    onBack:function()
    {
        this.getMyEventView().setActiveItem(0);
    },
    onForward:function()
    {
        this.getMyEventView().setActiveItem(1);
    }

});