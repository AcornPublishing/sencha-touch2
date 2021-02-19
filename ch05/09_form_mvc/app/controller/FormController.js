
Ext.define('FormApp.controller.FormController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            formView: 'formview',
            formViewMaileFamale : 'formview [name=malefamale]',
            formModel   : 'formModel',
            maleFamale  : 'MaleFamale',            
            regForm     : 'formview [name=regForm]',
            regForm     : 'formview [name=cancelForm]'
        },
        control: {
            regForm: {
                tap: 'onRegForm'
            }
        }
    },
    launch: function() {
        Ext.getStore('MaleFamaleStore').load({
            callback: this.onMaleFamaleLoad,
            scope: this
        });
    },
    onMaleFamaleLoad: function() {
        this.getFormViewMaileFamale().setStore(Ext.getStore('MaleFamaleStore'));
    },    
    onRegForm:function(){
        console.log('regForm');

        var date = new Date();
        date.setMonth(2);
        date.setYear(2012);
        date.setDate(4);
                                
       formData = Ext.ModelMgr.create({
            'name'       : 'ȫ�浿',
            'mili'           : true,
            'birthday'   : date
        }, 'FormApp.model.FormModel');
        this.getFormView().setRecord(formData);     
    }
});