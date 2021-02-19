Ext.ns("first");

first.init = function(i)
{
  first.panel[i] = new Ext.create('Ext.Panel',{
    flex:1,        
    layout: {
      type: 'fix',
      pack: 'center',
      //align:'stretch',
    }, 
    html:'<cetner>' + i + '번째 패널'
  }); 
}

