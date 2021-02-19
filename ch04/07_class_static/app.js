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
            statics:{
            	company:'HaHaHa Motors',
            	staticSize:function(val)
            	{
            		this.size=val;
            	}
            },
            config:{
            	size:'normal',
           	},
        });        

        var robot1 = Ext.create('Transformer',{
            name:'Robot'
        });
        var robot2 = Ext.create('Transformer',{
            name:'Robot'
        });
        Transformer.company ='Another Motors';
        
        console.log(Transformer.company);
        
        Transformer.staticSize('big');
        
        console.log(Transformer.size);
        
    }
});