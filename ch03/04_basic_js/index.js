var btnSet;
var btnGet;

var customer = {
	id:111,
	name:'-',
	getName:function()
	{
		return this.name;
	},
	setName:function(name)
	{
		this.name= name;
	}
};

window.onload = function()
{
                      
	btnSet = document.createElement("input");	
	console.log(btnSet);
	btnSet.type="button";
	btnSet.value="설정";
	btnSet.width=100;
	btnSet.setAttribute("class", "button1");
	btnSet.onclick=function(){
		customer.setName('홍길동');
		alert('값을설정하였습니다.');
	};		
	btnGet = document.createElement("input");	
	btnGet.type="button";
	btnGet.value="읽어오기";
	btnGet.width=100;	
	btnGet.setAttribute("class", "button2");	
	btnGet.onclick=function(){
		alert(customer.getName());
	};
	elementDiv1 = document.documentElement.getElementsByTagName("body")[0];
	elementDiv1.appendChild(btnSet);
	elementDiv1.appendChild(btnGet);
}
