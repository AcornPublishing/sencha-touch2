
Ext.application({
    name:'LIST',
    requires:[
        'Ext.Panel',
        'Ext.data.Store',
        'Ext.List'
        ],
    launch:function(){
        Ext.define('company', {
            extend:'Ext.data.Model',
            config:{
                fields: ['pic', 'companygrade', 'companyclass', 'name', 'history']
            }
    });

        Ext.define('history', {
            extend:'Ext.data.Model',
            config:{
                    fields: ['degree']
                }
        });

        var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '<div><table border="1" width="100%" ><tr><td rowspan="2" width="25%">({#})<img src="{pic}" height=70></td><td> {[this.getDegree(company.companygrade)]} ����:{companygrade}</td><td>�μ�:{companyclass}</td></tr><td colspan="2">�̸�: <B>{name}</B>',
                '<tpl for="history">',
                    '<small> {[xindex]}/{[xcount]} </small>',
                '</tpl>',                
                '</td></tr></table> </div>',            
            '</tpl>',
            {
                getDegree:function(input)
                {
                    if(input=="����")
                        return '<font color="blue">';
                    else 
                        return '';
                }           
            }        
        ); 

        company_list = new Ext.create('Ext.List',{
        flex:1,
            itemTpl: itemTemplate,

            store: new Ext.data.Store({
                model: 'company',
                sorters: 'companygrade',
             
                data: [
                    {pic:'./img/psn1.jpg', companygrade: '���', companyclass: '����1��', name: 'ȫ�浿', history:[{degree:'���'}]},
                    {pic:'./img/psn2.jpg', companygrade: '�븮', companyclass: '����2��', name: '�Ӳ���',history:[{degree:'����'},{degree:'�븮'}]},
                    {pic:'./img/psn3.jpg', companygrade: '����', companyclass: '�λ��', name: 'ȫ�α�',history:[{degree:'����'},{degree:'�븮'}, ,{degree:'����'}]},
                    {pic:'./img/psn4.jpg', companygrade: '����', companyclass: '�ѹ���', name: '�Ѹ�' ,history:[{degree:'����'},{degree:'�븮'}, ,{degree:'����'}]}
                ]
            })
        });
        new Ext.create('Ext.Panel',{
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center',
            },
            items: company_list
        });             
    }
});
