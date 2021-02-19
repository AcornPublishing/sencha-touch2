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
            config:{
            	size:'normal',
           	},
            /*
            setSize:function(size)
            {
            	this.size = size;
            },
            getSize:function()
            {
            	return this.size;
            },
            */
            applySize:function(newSize, oldSize)
            {            	
            	return confirm('Change size to:' + newSize);
            }
        });        

        var robot = Ext.create('Transformer',{
            name:'Robot'
        });
        robot.run();
        robot.setSize('big'); 
        console.log(robot.getSize());
    }
});