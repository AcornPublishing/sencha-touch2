<%@ page contentType="text/html;charset=euc-kr"  %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%

String returnStr="";
String err="'err':''";
String psnList = "'psn_list':''";
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try
{
    request.setCharacterEncoding("euc-kr");
    String paramPage =request.getParameter("paramPage");
    
    Class.forName("com.mysql.jdbc.Driver");

    conn = DriverManager.getConnection(
        "jdbc:mysql://127.0.0.1:3306/test?" + 
       		"useUnicode=true&characterEncoding=euckr", 
        "root", 
        "1234");
    stmt = conn.createStatement();
    String sql = "select id, subject, img from gallery limit " + paramPage + ", 3";
    System.out.println(sql);                  		
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
                .append("','img':'")
                .append(rs.getString("img"))
                .append("'}");
        i++;
    }    
    if(i==0)
    {       
        err = "'err': '해당 사진이 존재하지 않습니다.'";
    }
    psnList = "'artlist':[" + tempList.toString() + "]";
}
catch(Exception ex)
{
    err = "'err': '오류.. 적절히 처리'";
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}
returnStr = "{'data':{" + psnList + "," + err + "}}";

out.println(returnStr.replace('\'','\"').trim());
%>

