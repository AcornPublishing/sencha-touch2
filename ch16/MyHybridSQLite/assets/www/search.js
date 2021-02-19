Ext.ns("search");

search.init = function(){

	search.panel_search = new Ext.create('Ext.Panel',{
		useCurrentLocation: true,               
		cardSwitchAnimation:"slide",
		
		layout: {
		    type: 'vbox',
		    pack: 'center',
		    align: 'stretch'
		},
		scrollable: 'vertical',
		items:
		[{
			xtype: 'fieldset',
			title: '직원 조회',
			//instructions: '직원명을 입력하시고 조회버튼을 클릭하십시요',
			defaults: {
			required: true,
			labelAlign: 'left' }
			,
			items:[{
				layout: {
				type: 'hbox',
				pack: 'center',
				
				},  
				items:[{
						xtype:'textfield',
						id:'user_name',
						width:'50%',
						placeHolder:'사용자입력',
						autoCapitalisze:true,
						useClearIcon:false
					},{
						xtype:'spacer',
						width:'10%',
					},{
						xtype:'button',
						ui: 'decline-round',
						name:'button_search',
						width:'30%',
						handler:function(){ 
							var strSql = "select user_id, user_name, user_tel from user where user_name like '" + Ext.getCmp("user_name").getValue() + "%'";
							//하이브리드 호출  
							querySql(strSql, 'search.panel_search.receiveSql', 'search.panel_search.errorSql');               
							//Jv_data = JSON.parse('[{"user_id":"1", "user_name":"홍길동", "user_tel":"010-1111-1111"},{"user_id":"2", "user_name":"임걱정", "user_tel":"010-1111-1111"}]');                  
							//search.panel_search.receiveSql(Jv_data)
					},                      
					text:'조회'
				}]                                      
			}]
		}],
		receiveSql:function(data)
		{      
			console.log(data);
			data= JSON.parse(data);
			result.panel_result.setUsersList(data);		
			list.carousel.setActiveItem(result.panel_result); 
	
		},
		errorSql:function(input)
		{      
			Ext.Msg.alert(input);
		}        
	});
}