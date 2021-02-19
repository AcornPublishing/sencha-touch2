function execSql(sql, receiveExeSql, errorExeSql)
{
    if(window.NativeBridge == undefined) 
    {
        alert('모바일단말과 연결되어 있지 않습니다.'); 
        return;
    }
    window.NativeBridge.execSQL(sql, receiveExeSql, errorExeSql);               
}   
function receiveExecSql(input)
{
    alert(input);
}
function errorExecSql(input)
{
    alert(input);
}
function querySql(sql, receiveQuerySql, errorQuerySql)
{
    if(window.NativeBridge == undefined) 
    {
        alert('모바일 단말과 연결되어 있지 않습니다.');
        return;
    }
    window.NativeBridge.querySQL(sql, receiveQuerySql, errorQuerySql);              
}
function receiveQuerySql(input)
{
    console.log(input);
    alert(input);
}
function errorQuerySql(input)
{
    alert(input);
}