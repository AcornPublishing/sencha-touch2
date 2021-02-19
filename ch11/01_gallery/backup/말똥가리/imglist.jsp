<%@ page contentType="text/html;charset=utf-8"  %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%

String returnStr="";
String err="'err':''";
String psnList = "'img_list':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
    //request.setCharacterEncoding("utf-8");
    String pageNum = "1";
    try
    {
    	pageNum = request.getParameter("pageNum");
    	if(pageNum == null)
    	{
    		pageNum = "1";
    	}
    }
    catch(Exception exTemp)
    {
    }	
    
    Class.forName("com.mysql.jdbc.Driver");

    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/test?" + "useUnicode=true&characterEncoding=utf-8"
        , 
        "root", 
        "1234");
    stmt = conn.createStatement();
    String sql = "select id,subject, content, img from gallery where id > " + ((Integer.parseInt(pageNum)-1) * 5  + 1) + " and id <= " + (Integer.parseInt(pageNum) * 5) + " order by id";
    
    //out.println(sql);
    
    rs= stmt.executeQuery(sql);
    StringBuffer tempList = new StringBuffer();
    int i=0;
    while(rs.next())
    { 
        if(i != 0)
        {
            tempList.append(",");
        }
        tempList.append("{'id':'")
        		.append(rs.getString("id"))
                .append("','subject':'")
                .append(rs.getString("subject"))
                .append("','content':'")
                .append(rs.getString("content"))
                .append("','img':'")
                .append(rs.getString("img"))
                .append("'}");
        i++;
    }    
    if(i==0)
    {       
        err = "'err': '데이터가 존재하지 않습니다.'";
    }
    psnList = "'imglist':[" + tempList.toString() + "]";
}
catch(Exception ex)
{
	out.println(ex.toString());
    err = "'err': '오류.. 적절히 처리'" ;
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" + psnList + "," + err + "}}";
returnStr = returnStr.replace("\n", "").replace("\t","").replace(" ", "");
out.println(returnStr.replace('\'','\"').trim());
System.out.println(returnStr.replace('\'','\"').trim());
%>