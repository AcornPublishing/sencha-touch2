
Ext.application({
    name:'PROXY',
    requires:[
        'Ext.Panel',
        'Ext.Ajax',
        'Ext.data.AjaxProxy',
        'Ext.data.Store',
        'Ext.List',
        'Ext.Toolbar',
        'Ext.field.Text',
        'Ext.form.FieldSet'],
    launch:function(){
        
        var SkillList;
        var SkillStore;
        var SkillProxy;
        var SkillModel;


        Ext.define('Skills', {
            extend:'Ext.data.Model',
            config:{
             fields: ['Skill']
            }
        });     

        SkillProxy = new Ext.create('Ext.data.AjaxProxy',{
            type:'ajax',
            url: 'ajaxdata.jsp',
            reader:{
                type:'json',
                rootProperty:'Skills',
            }
        });         
        
        SkillStore = new Ext.create('Ext.data.Store',{
            autoLoad:true,          
            fields:[
                {name:'Skill', type:'string'}
            ],
            proxy: SkillProxy               
        });   
        
        SkillList = new Ext.create('Ext.List',{
            flex:1,
            store:SkillStore,
            SelectedItemCls:'x-list-oAge',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('Skill') + "선택 index:" + index);
                }
            },
            itemTpl:'<div><strong>{Skill}</strong></div>',
        });        

        new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout:{
                type:'vbox',
                
            },
            id: 'content',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title:'Proxy 시작',
            },
            SkillList]
            
        });
    }
});