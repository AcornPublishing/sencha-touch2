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


public class ExecFile extends Plugin {

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
            	result = this.searchFile(args.getString(0), args.getString(1)); //.optJSONObject(1).getString("rootPath"));
            }   
            else if (action.equals("searchDir")) {
            	result = this.searchDir(args.getString(0), args.getString(1)); //.optJSONObject(1).getString("rootPath"));
            }             
            return new PluginResult(status, result);
        } catch (Exception e) {
            return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
        }
    }
    public String exec(String inputFile, String inputPackage) {
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
    public String getPackageList(String inputFile) {
    	Log.i("", "getPackageList:" + inputFile);
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
		result = result.replace("\n","");
    	return result;
    }    
    
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
		
			for(int i=0; i< size-1; i++)
			{
				String fileName = files[i].getAbsolutePath();
				for(int j=i+1; j < size; j++)
				{
					if(fileName.compareTo(files[j].getName()) < 0)
					{
						File tempFile = files[i];
						files[i] = files[j];
						files[j] = tempFile;
					}
				}
			}
			for(int i=0; i<size;i++)
			{
				if(i != 0)
				{
					result =  result + ",";
				}
				String fileName = files[i].getAbsolutePath();
				String fileNameSmpl = files[i].getName();
				String filePath = fileName.substring(0, fileName.lastIndexOf("/"));
				fileName = fileName.replace("'","^^1").replace("&","^^3").replace("\n","^^2").replace("'","^^4");
				filePath = filePath.replace("'","^^1").replace("&","^^3").replace("\n","^^2").replace("'","^^4");
				result = result + "{'id':'" + i + "', 'subject':'" + fileNameSmpl + "', 'content':'" + filePath + "', 'img':'" + fileName + "'}";
			}
		}
		catch(Exception exTemp){
			Log.i("", "exTemp:" + exTemp.toString());
		}			
    	return "[" + result + "]";
    }
    public String searchDir(String inputValue, String pathName)
    {
    	pathName = pathName.replace("file://", "");
    	String result = "";
		FileEntity fileList = new FileEntity();
		try
		{
			fileList.getFolderList(pathName, inputValue);
			File[]  files = fileList.getFiles();
			int size = files.length;
			int divRowSize = 0;
			String[][] pathDiv = new String[size][20];			
			String[][] fileDiv = new String[size][20];
			int[] divSize = new int[size];
			for(int i=0; i<size;i++)
			{
				String fileName = files[i].getAbsolutePath();
				String filePath = fileName.substring(0, fileName.lastIndexOf("/"));
				fileName = fileName.replace("'","^^1").replace("&","^^3").replace("\n","^^2").replace("'","^^4");
				filePath = filePath.replace("'","^^1").replace("&","^^3").replace("\n","^^2").replace("'","^^4");
				Log.i("", "filePath:" + filePath);
				Log.i("", "fileName:" + fileName);
				boolean isExist = false;	
				
				
				
				for(int j=0; j< divRowSize; j++)				
				{
					if(pathDiv[j][0].equals(filePath))
					{
						pathDiv [j][divSize[j]] = filePath;
						fileDiv [j][divSize[j]] = fileName;
						divSize[j]++;
						isExist = true;
						break;
					}
				}
				if(isExist== false)
				{
					pathDiv [divRowSize][0] = filePath;
					fileDiv [divRowSize][0] = fileName;
					divSize[divRowSize]++;
					divRowSize++;
				}
			}
			result = "";
			for(int i=0; i< divRowSize;i++)
			{			
				if(i != 0)
				{
					result = result + ",";
				}
				result = result + "{ 'path': '" + pathDiv[i][0] + "',";
				for(int j=0;j<divSize[i];j++)
				{
					result = result + "'img" + j + "':'" + fileDiv[i][j] + "',";
				}
				for (int j=divSize[i]; j <5; j++)
				{
					result = result + "'img" + j + "':'./img/blank.png',";
				}
				result= result + " 'isFile':'N'}";
			}
		}
		catch(Exception exTemp){
			Log.i("", "exTemp:" + exTemp.toString());
		}			
    	return "[" + result + "]";
    }    
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
    	public File[] getFileList(String path, String searchText)
    		throws Exception 
    	{
    		File dir = new File(path);
    		File[] files = dir.listFiles();
    		for(int i=0; i<files.length; i++)
    		{
    			File file = files[i];

    			if(file.isFile())
    			{
        			String fileName = file.getName();
        			int temp_i = fileName.lastIndexOf(".");
        			if(temp_i > 0)
        			{
	        			String extName = fileName.substring(temp_i);     				
	    				if(	extName.equals(".jpg") ||
	    						extName.equals(".jpeg") ||
	    						extName.equals(".png") ||
	    						extName.equals(".tif") ||
	    						extName.equals(".tiff") ||
	    						extName.equals(".bmp") ||
	    						extName.equals(".gif"))        				
	       				{
	    					vecFileList.add(file.getAbsoluteFile());
	    				}
        			}
    			}
    		}
    		return files;
    	}
    	public File[] getFolderList(String path, String searchText)
        	throws Exception 
    	{
    		File dir = new File(path);
    	
    		Log.i("", "" + path);
    		File[] files = dir.listFiles();
    
    		int tempCount = 0;
    		for(int i=0; i<files.length; i++)
    		{
    			File file = files[i];

    			if(file.isFile())
    			{
        			String fileName = file.getName();
        			int temp_i = fileName.lastIndexOf(".");
        			if(temp_i > 0)
        			{
	        			String extName = fileName.substring(temp_i);    				
	    				if(	extName.equals(".jpg") ||
	    						extName.equals(".jpeg") ||
	    						extName.equals(".png") ||
	    						extName.equals(".tif") ||
	    						extName.equals(".tiff") ||
	    						extName.equals(".bmp") ||
	    						extName.equals(".gif"))         				
	    				{
	    					if(tempCount < 3)
	    					{
	        					vecFileList.add(file.getAbsoluteFile());
	    					}
	    					tempCount++;
	    				}   
        			}
    			}
    			else if(file.isDirectory())
    			{
    				getFolderList(file.getCanonicalPath().toString(), searchText);
    			}
    		}
    		return files;
    	}
    }	
}

