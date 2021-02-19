package com.book.myhybridsqlite;

import android.app.Activity;
import android.app.AlertDialog;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;
import android.webkit.JsResult;
import android.widget.Toast;
import android.os.Handler;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.Window;

import com.book.myhybridsqlite.UtilCamera;
import com.book.myhybridsqlite.UtilMoviePlayer;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class MyHybridSQLiteActivity extends Activity {

	public static final int NATIVE_VIEW = 1000;	
	public static final int CAMERA_VIEW = 2000;
	public static final int FILECHOOSER_RESULT = 3000;
	
	private Context mContext;
	private Handler mHandler = new Handler();
	private boolean bCmdProcess = false; 
	public WebView mWebView;	

	private ProgressBar prgrBar;
	private ValueCallback<Uri> mUploadMessage;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);        
        setContentView(R.layout.main);
        
 
        mContext = this;
       	mWebView = (WebView)findViewById(R.id.webView1);
		WebSettings ws = mWebView.getSettings();
		ws.setJavaScriptEnabled(true); 
		ws.setPluginsEnabled(true);
 		ws.setCacheMode(WebSettings.LOAD_NO_CACHE);

 		mWebView.setNetworkAvailable(true);
		mWebView.setWebChromeClient(new ChromeClient(this));
		mWebView.setWebViewClient( new webviewClient(this) );
		mWebView.addJavascriptInterface(
				new NativeBridge(mContext), "NativeBridge");
		mWebView.setScrollbarFadingEnabled(true);
		mWebView.setVerticalScrollBarEnabled(false);
		mWebView.setHorizontalScrollBarEnabled(false);		
		
		String strUrl = "file:///android_asset/www/index.html";
	    mWebView.loadUrl(strUrl);
	    
	    

	    prgrBar = new ProgressBar(this);    
	}
    
    @Override
    protected void onActivityResult(int requestCode, 
    							    int resultCode, 
    							    Intent data) {
    	super.onActivityResult(requestCode, resultCode, data);
    	try
    	{
	    	if(requestCode == NATIVE_VIEW)
	    	{
	    		String strInput = 
	    			data.getStringExtra("RESULT");
	    		String strCallbackFunc = 
	    			data.getStringExtra("CALLBACKFUNC");
	    		String strJavaScript = 
	    			strCallbackFunc + "('" + strInput + "')";
		    	mWebView.loadUrl("javascript:" + strJavaScript);     		
	    	}
	    	else if(requestCode == CAMERA_VIEW)
	    	{
	    		String strInput = 
	    			data.getStringExtra("RESULT");
	    		String strCallbackFunc = 
	    			data.getStringExtra("CALLBACKFUNC");
	    		String strJavaScript =  
	    			strCallbackFunc + "('" + strInput + "')";
		    	mWebView.loadUrl("javascript:" + strJavaScript);    		
	    	}
	    	else if(requestCode == FILECHOOSER_RESULT)
	    	{
	    		if(null == mUploadMessage)
	    			return;
	    		Uri result = data.getData();
	    		mUploadMessage.onReceiveValue(result);
	    		mUploadMessage = null;
	    	}
    	}
    	catch(Exception exResult)
    	{
    		Log.i("eee:", exResult.toString());
    	}
    	bCmdProcess = false;
    }

    // ChromeClient for Alert
    private final class ChromeClient extends WebChromeClient {
    	public Context pCtx;
    	
    	public ChromeClient(Context cxt) {
    		pCtx = cxt;
    	}

		@Override
		public boolean onJsAlert(WebView view, 
								 String url, 
								 String message, 
								 final JsResult result) {
			new AlertDialog.Builder(pCtx)
			.setTitle("알림").setMessage(message)
			.setNeutralButton(android.R.string.ok,  
                    new DialogInterface.OnClickListener() {  
                        public void onClick(DialogInterface dialog, 
                        					int which) { 
                        	result.confirm();
                        }
            		})
			.setCancelable(false).show();
			return true;
		}

		@Override
		public boolean onJsConfirm(	WebView view, 
									String url, 
									String message, 
									final JsResult result) {
			new AlertDialog.Builder(pCtx)
			.setTitle("확인").setMessage(message)
			.setPositiveButton(android.R.string.ok,  
                    new DialogInterface.OnClickListener() {  
                        public void onClick(DialogInterface dialog, 
                        					int which) { 
                        	result.confirm();
                        }
            		})
            .setNegativeButton(android.R.string.cancel,  
                    new AlertDialog.OnClickListener() {  
                        public void onClick(DialogInterface dialog, 
                        					int which) { 
                        	result.confirm();
                        }
            		})
			.setCancelable(false).show();
			return true;
		}
		
		public void openFileChooser(ValueCallback<Uri> uploadMsg) {
			mUploadMessage = uploadMsg;
			Intent i = new Intent(Intent.ACTION_GET_CONTENT);
			i.addCategory(Intent.CATEGORY_OPENABLE);
			i.setType("image/*");
			((Activity)pCtx).startActivityForResult(i, FILECHOOSER_RESULT);
		}
    }
    
    
    private class webviewClient extends WebViewClient {
    	private Context 	pCtx;
    	
    	public webviewClient(Context ctx) {
    		pCtx = ctx;    		
    	}    	
    	@Override
		public boolean shouldOverrideUrlLoading(WebView view, 
												String url)
		{
			view.loadUrl(url);
    		return true;
		}    	
    	@Override
        public void onPageStarted(	WebView view, 
        							String url, 
        							Bitmap favicon) 
        {
        	super.onPageStarted(view, url, favicon);

        	prgrBar.Show();    		
        	
        }
    	
    	 @Override
         public void onPageFinished(WebView view, 
        		 					String url) 
         {
    		 super.onPageFinished(view, url);
    		 prgrBar.Hide();
         }
    	 
    	 @Override
         public void onReceivedError(	WebView view, 
        		 						int errorCode, 
        		 						String description, 
        		 						String failingUrl)
         {    		 
    		 new AlertDialog.Builder(pCtx)
    			.setTitle("에러")
    			.setMessage("오류발생")
    			.setCancelable(false)
    			.setNeutralButton(android.R.string.ok,   
    				new DialogInterface.OnClickListener() {   
    					public void onClick(DialogInterface dialog, 
    										int whichButton)
    					{
    						finish();
    					}
    		      	})
    		   .show();
         }
    }    
    private class NativeBridge{
    	
    	// SQLite
    	DbHelper mDatabase;
    	SQLiteDatabase db; 
	    NativeBridge(Context context)
	    {
	    	mDatabase = new DbHelper(context);
		    db = mDatabase.getWritableDatabase();    	
	    }
    
	
		public void querySQL(final String sql, final String strCallbackFunc, final String strCallbackError ) {    		
			Log.e("querySQL", "START");
			Log.e("querySQL", sql);
			try
			{
	    		if(bCmdProcess)	return;
	    		
	    		bCmdProcess = true;
				mHandler.post(new Runnable() {
			    	public void run() {		    		
			    		try
			    		{
			    			String rtnData = "";
			    			Cursor c = db.rawQuery(sql, null);
			    			int columnCount = 0;
			    			int size = 0;
			    			int i=0;
			    			rtnData = "[";
			    			while(c.moveToNext()){
			    				if(i==0)
			    				{
			    					columnCount = c.getColumnCount();
			    				}
			    				if( i != 0)
			    				{
			    					rtnData = rtnData + ",";
			    				}				
			    				String rtnTemp = "{";
			    				for(int j=0;j< columnCount;j++)
			    				{	
			    					if(j !=0)
			    					{
			    						rtnTemp = rtnTemp + ",";
			    					}					
			    					rtnTemp = rtnTemp + "'" +  c.getColumnName(j) + "':'" + c.getString(j) + "'";
			    						
			    				}
			    				rtnTemp = rtnTemp + "}";
			    				
			    				rtnData = rtnData + rtnTemp;
			    				i++;
			    			}
			    			rtnData = rtnData + "]";
			    			rtnData= rtnData.replace("'", "\"");
			    			Log.e("", "�ㅻ쪟:" + rtnData);
			    			
			    			String strJavascript = strCallbackFunc + "('" + rtnData + "')";
			    	    	mWebView.loadUrl("javascript:" + strJavascript); 
			    		}
			    		catch(Exception ex)
			    		{
			    			String strJavascript = strCallbackError + "('" + ex.toString().replace("\"", " ").replace("'" , " ").replace("\n" , "\\n") + "')";
	    	    	    	mWebView.loadUrl("javascript:" + strJavascript);     		    		
			    		}
			    	}
				});
			}
			catch(Exception ex)
			{
				bCmdProcess = false;
				Log.e("Error", ex.toString());
			}
			finally
			{
				bCmdProcess = false;
			}
		}		
		
    	public void execSQL(final String sql, final String strCallbackFunc, final String strCallbackError ) {    		
    		Log.e("execSQL", "START");
    		Log.e("execSQL", sql);
    		try
    		{
        		if(bCmdProcess)	return;
        		
        		bCmdProcess = true;
    			mHandler.post(new Runnable() {
    		    	public void run() {
    		    		
    		    		try
    		    		{
    		    			db.execSQL(sql);
    		    			String strJavascript = strCallbackFunc + "()";
        	    	    	mWebView.loadUrl("javascript:" + strJavascript);      		    			
    		    		}
    		    		catch(Exception ex)
    		    		{
    		    			String strJavascript = strCallbackError + "('" + ex.toString().replace("\"", " ").replace("'" , " ").replace("\n" , "\\n") +  "')";
        	    	    	mWebView.loadUrl("javascript:" + strJavascript);     		    		
    		    		}
    		    	}
    			});
    		}
    		catch(Exception ex)
    		{
    			bCmdProcess = false;
    			Log.e("Error", ex.toString());
    		}
    		finally
    		{
    			bCmdProcess = false;
    		}
    	}    	
     }
}