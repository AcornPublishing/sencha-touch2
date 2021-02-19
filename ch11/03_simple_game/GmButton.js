Ext.define('GmButton',{
    extend:'Ext.Button',
    xtype:'game_button',
    requires:['Ext.Button',
              'Ext.Anim'],
    gm_id: 0,
    gm_state:'0',
    gm_picnumber: 0,
    styleHtmlContent: true,
    flex:1,
    open:function()
    {
        this.gm_state = '1';
        this.show();
    },
    close:function()
    {
        Ext.Anim.run(this, 'pop', {
            duration:500
        });         
        this.gm_state = '0';
        this.show();
    },
    toggle:function()
    {
        if(this.gm_state != '0')
        {
            return;
        }
    
        if(this.gm_state == '0')
            this.gm_state = '1';
        this.show();
        this.eventChange(this.gm_id, this.gm_state, this.gm_picnumber);
    },  
    show:function()
    {
        if(this.gm_state =='1')
        {
            this.setText("<h1>" + this.gm_picnumber + "</h1>" );
        }
        else if(this.gm_state =='0')
        {
            this.setText("");
        }
        else if(this.gm_state =='2')
        {
            this.setText("<h1><font color='blue'>" + this.gm_picnumber + "</font></h1>" );
        }
    },
    findit:function()
    {
        Ext.Anim.run(this, 'fade', {
            duration:500
        });
        this.gm_state = '2';
        this.show();
    },
    eventChange:function(idnum,state, gm_picnumber)
    {
        console.log('aaa');
    },      
    initialize:function(){
        Ext.apply(this, {
            margin:0,
            cls:'x-btn-icon',
        }); 
        GmButton.superclass.initialize.apply(this,arguments);
        this.on('tap', function(){
            
            console.log('hi1');
            Ext.Anim.run(this, 'flip', {
                duration:500
            });  
            this.toggle();
        });
    }
});