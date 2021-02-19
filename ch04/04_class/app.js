Ext.ns("main");
Ext.application({
    name:'class',
    launch:function(){
        Ext.define('Motor',{
            config:{
                name:null
            },
            constructor:function( config){
                this.initConfig(config);
            },
            run:function(){
                document.write(this.getName() + ' running ');
            },
            speed:function()
            {
                document.write(this.getName() + ' normal speed ');
            }
        });
        
        var bus = Ext.create('Motor',{
            name:'Bus'
        });
        bus.run();
        
        var tax = Ext.create('Motor',{
            name:'Tax'
        });
        tax.run();
    }
});