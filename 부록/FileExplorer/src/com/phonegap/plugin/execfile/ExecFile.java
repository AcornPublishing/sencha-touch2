package com.phonegap.plugin.execfile;

import java.io.File;
import java.util.List;
import java.util.Vector;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;
import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
 
// 플러그인 클래스
public class ExecFile extends Plugin {
	private final String packageName="";

    public PluginResult execute(String action, JSONArray args, String callbackId) {
        PluginResult.Status status = PluginResult.Status.OK;
        String result = "";
        try {
            if (action.trim().equals("exec")) {
            	result = this.exec(args.getString(0), args.optJSONObject(1).getString("package"));
            }
            else if (action.equals("getPackageList")) {
            	result = this.getPackageList(args.getString(0));
            }   
            else if (action.equals("searchFile")) {
            	result = this.searchFile(args.getString(0), args.getString(1));
            }   
            return new PluginResult(status, result);
        } catch (Exception e) {
            return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
        }
    }
    // 연결프로그램 샐행 메소드 
    public String exec(String inputFile, String inputPackage) {
    	/*
    	"video/*"
    	"message/*"
    	"model/*"
    	"multipart/*"    	
    	"image/*"
    	"text/*"
    	"audio/*"
    	"text/html"
    	"text/css"
    	"text/xml"
    	"text/vnd.curl"
    	"application/pdf"
    	"application/rtf"
    	"application/vnd.ms-wxcel"
    	 */
    	try
    	{
        	String mimeType = "";
        	int S = inputFile.lastIndexOf(".");
        	String extName = inputFile.substring(S);
        	extName = extName.toLowerCase();	
        	if( extName.equals(".gif") ||
        		extName.equals(".jpg") ||
        		extName.equals(".jpeg") ||
        		extName.equals(".png") ||
        		extName.equals(".tif") ||
        		extName.equals(".tiff") ||
        		extName.equals(".bmp"))
        	{
        		mimeType = "image/*";
        	}
        	else if( extName.equals(".mp3")||
        			 extName.equals(".ogg") ||
        			 extName.equals(".3ga"))
        	{
        		mimeType = "audio/*";
        	}
        	else if( extName.equals(".mp4") ||
        			 extName.equals(".kmv") || 
        			 extName.equals(".avi"))
        	{
        		mimeType = "video/*";
        	}
        	else if( extName.equals(".html") ||
        			extName.equals(".xml") ||
        			extName.equals(".css") ||
        			extName.equals(".htm"))
        	{
        		mimeType = "text/html";
        	}        	
        	else if( extName.equals(".text") ||
        			extName.equals(".txt") ||
        			extName.equals(".doc") ||
        			extName.equals(".info"))
        	{
        		mimeType = "text/*";
        	}        	
        	else if( extName.equals(".pdf"))
        	{
        		mimeType = "application/pdf";
        	}  
        	else if( extName.equals(".rtf"))
        	{
        		mimeType = "application/rtf";
        	}
        	else if( extName.equals(".xls") ||
        			extName.equals(".xlsx"))
        	{
        		mimeType = "application/vnd.ms-wxcel";
        	}          	
        	Intent intent = new Intent(android.content.Intent.ACTION_VIEW);
        	intent.addCategory(intent.CATEGORY_DEFAULT);
        	intent.setDataAndType(Uri.parse(inputFile), mimeType);
    		this.ctx.startActivity(intent);    		
    	}
    	catch(Exception ex)
    	{
    		Toast.makeText(this.ctx.getContext() , "Can't Open File", 5000).show();
    	}
    	return "";
    }
    // 폰에 들어있는 패키지를 가져옴
    public String getPackageList(String inputFile) {
    	PackageManager pm = this.ctx.getContext().getPackageManager();
    	List<ApplicationInfo> packs = pm.getInstalledApplications(
    			PackageManager.GET_META_DATA);
    	String result = "[";
    	int count_i = 0;
    	for(int i=0; i<packs.size(); i++ ){
    		ApplicationInfo app= (ApplicationInfo)packs.get(i);
    		if(app.packageName.contains("com.android") || app.packageName.contains("com.google"))
    		{
	    		if(count_i != 0)
	    			result = result + ",";
	    		result = result + "{'l': '" + app.loadLabel(pm).toString() + "'," +
	    				"'p':'" + app.packageName + "'}";
	    		count_i++;
    		}
    	}
    	result = result + "]";
		Log.i("","최종:" + result + ":");
		result = result.replace("\n","");
    	return result;
    }    
    
    // 파일을 조회함
    public String searchFile(String inputValue, String pathName)
    {
    	pathName = pathName.replace("file://", "");
    	String result = "";
		FileEntity fileList = new FileEntity();
		try
		{
			fileList.getFileList(pathName, inputValue);
			File[]  files = fileList.getFiles();
			int size = files.length;
			
			if(size > 100)
				size = 100;
			
			for(int i=0; i<size;i++)
			{
				if(i != 0)
				{
					result =  result + ",";
				}
				String fileName = files[i].getAbsolutePath();
				String filePath = fileName.substring(0, fileName.lastIndexOf("/"));
				fileName = fileName.replace("'","^^1").replace("&","^^3")
							.replace("\n","^^2").replace("'","^^4");
				filePath = filePath.replace("'","^^1").replace("&","^^3")
							.replace("\n","^^2").replace("'","^^4");
				result = result + "{'filename':'" + fileName + "', 'path':'" + filePath + "'}";
			}
		}
		catch(Exception exTemp){
			Log.i("", "exTemp:" + exTemp.toString());
		}			
		Log.i("", "result:" + result);
    	return "[" + result + "]";
    }

    // 파일을 가져오기위한 내부클래스
    class FileEntity 
    {
    	Vector vecFileList;
    	FileEntity()
    	{
    		vecFileList = new Vector(); 
    	}
    	public File[] getFiles()
    		throws Exception
    	{
    		File[] files = new File[vecFileList.size()];
    		for(int i=0; i<vecFileList.size(); i++)
    		{
    			files[i] = (File)vecFileList.get(i);
    		}
    		return files;
    	}
    	// 경로의 파일읠 가져온다.
    	public File[] getFileList(String path, String searchText)
    		throws Exception 
    	{
    		File dir = new File(path);
    		File[] files = dir.listFiles();
    		for(int i=0; i<files.length; i++)
    		{
    			File file = files[i];
    			String fileName = file.getName();
    			if(file.isFile()){
    				if(	fileName.contains(searchText))
    				{
    					vecFileList.add(file.getAbsoluteFile());
    				}				
    			}
    			else if(file.isDirectory()){
    				if(	fileName.contains(searchText))
    				{
    					vecFileList.add(file.getAbsoluteFile());
    				}    				
    				getFileList(file.getCanonicalPath().toString(), searchText);
    			}
    		}
    		return files;
    	}
    }	
}

