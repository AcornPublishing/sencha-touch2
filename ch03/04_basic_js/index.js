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
	btnSet.value="����";
	btnSet.width=100;
	btnSet.setAttribute("class", "button1");
	btnSet.onclick=function(){
		customer.setName('ȫ�浿');
		alert('���������Ͽ����ϴ�.');
	};		
	btnGet = document.createElement("input");	
	btnGet.type="button";
	btnGet.value="�о����";
	btnGet.width=100;	
	btnGet.setAttribute("class", "button2");	
	btnGet.onclick=function(){
		alert(customer.getName());
	};
	elementDiv1 = document.documentElement.getElementsByTagName("body")[0];
	elementDiv1.appendChild(btnSet);
	elementDiv1.appendChild(btnGet);
}
