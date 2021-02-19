<%@ page contentType="text/html;charset=utf-8"  pageEncoding="UTF-8" %>
<%=request.getParameter("callback")%>({
    "users": [
        {
            "id": 1,
            "name": "이소희",
            "tel" : "010-1111-1111"
        },
        {
            "id": 2,
            "name": "이수현",
            "tel" : "010-2222-2222"
        },
        {
            "id": 3,
            "name": "이시형",
            "tel" : "010-3333-3333"
        }
    ]
});