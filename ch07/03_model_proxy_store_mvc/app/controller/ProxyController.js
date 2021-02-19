
Ext.define('ProxyApp.controller.ProxyController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            proxyView: 'proxyview',
            proxyList: 'proxylist',
        },
        control: {
            proxyList: {
                itemTap: 'onProxyList'
            }
        }
    },
    launch: function() {
        Ext.getStore('ProxyStore').load({
            callback: this.onProxyLoad,
            scope: this
        });
    },
    onProxyLoad: function() {
        console.log('����� �Գ���?');
        console.log(Ext.getStore('ProxyStore'));
        this.getProxyList().setStore(Ext.getStore('ProxyStore'));
    },
    onProxyList:function(list, index, item){

        alert(index + '���� ���õǾ����ϴ�.');
    }
});
