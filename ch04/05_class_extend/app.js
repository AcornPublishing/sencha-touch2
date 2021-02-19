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

        Ext.define('Transformer',{
            extend:'Motor',

        });        

        var robot = Ext.create('Transformer',{
            name:'Robot'
        });
        robot.run();
    }
});