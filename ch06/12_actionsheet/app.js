

Ext.application({
    name:'ActionSheet',
    requires:[
        'Ext.form.Panel',
        'Ext.ActionSheet'
        ],
    launch:function(){
        var action_sheet = new Ext.create('Ext.ActionSheet',{
            useTitles: true,
            title:'�����ư',
            items:[{
                text:'ù°��ư',
                ui:'round',
                handler:function(){
                    Ext.getCmp("text_result").setValue("ù°��ư");
                    action_sheet.hide();
                }
            },{
                text:'��°��ư',
                ui:'decline',
                handler:function(){
                    Ext.getCmp("text_result").setValue("��°��ư");
                    action_sheet.hide();
                }
            },{
                text:'��°��ư',
                ui:'confirm',
                handler:function(){
                    Ext.getCmp("text_result").setValue("��°��ư");
                    action_sheet.hide();
                }
                
            }]
        });
        
        var action_sheet_small = new Ext.create('Ext.ActionSheet',{
            useTitles: true,
            title:'�����ư',
            items:[{
                text:'ù° ��ư',
                ui:'small',
                handler:function(){
                    Ext.getCmp("text_result").setValue("ù°������ư");
                    action_sheet_small.hide();
                }
                
            },{
                text:'��°��ư',
                ui:'decline-small',
                handler:function(){
                    Ext.getCmp("text_result").setValue("��°������ư");
                    action_sheet_small.hide();
                }
            },{
                text:'��°��ư',
                ui:'confirm-small',
                handler:function(){
                    Ext.getCmp("text_result").setValue("��°������ư");
                    action_sheet_small.hide();
                }
            }]
    });
        var panel = new Ext.create('Ext.form.FormPanel',{
            fullscreen: true,
            layout: {
                type: 'vbox',

            },
            items: [
            {
        xtype:'textfield',
        id:'text_result',
        label:'���',
        autoCapitalisze:true,
            },           
            {
                xtype: 'button',
                ui: 'normal',
                text: 'ū��ư',
                handler: function() {
                    action_sheet.show();
                }
            },
            {
                xtype: 'spacer',
                height:'20px',
            },            
            {
                xtype: 'button',
                ui: 'normal',
                text: '������ư',
                handler: function() {
                    action_sheet_small.show("pop");
                }
            }]
        });
    }
});