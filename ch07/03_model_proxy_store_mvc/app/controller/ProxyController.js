
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
        console.log('여기는 왔나요?');
        console.log(Ext.getStore('ProxyStore'));
        this.getProxyList().setStore(Ext.getStore('ProxyStore'));
    },
    onProxyList:function(list, index, item){

        alert(index + '번이 선택되었습니다.');
    }
});
