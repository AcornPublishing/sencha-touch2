package com.lbo.imageviewer;

import com.google.ads.*;
import android.app.Activity;
import android.content.res.Configuration;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import org.apache.cordova.*;

public class ImageViewerActivity extends DroidGap implements SensorEventListener {
    /** Called when the activity is first created. */
	
	AdView adView = null;
	LinearLayout layout = null;
	boolean isInit = false;
    @Override
    public void onCreate(Bundle savedInstanceState) {    	
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");          
        adView = new AdView(this, AdSize.BANNER, "a1504841c828d31");
        layout = super.root;
    	layout.addView( adView );
    	adView.setVisibility(View.VISIBLE);
    	adView.loadAd(new AdRequest());        
        if(getResources().getConfiguration().orientation ==Configuration.ORIENTATION_LANDSCAPE)
        {
        	try
        	{
        		layout.removeView( adView );
        	}
        	catch(Exception e){}
        }
        isInit = true;
    }
    
    @Override
    public void onConfigurationChanged(Configuration newConfig){
    	android.util.Log.i("", "--------------------come in");
    	super.onConfigurationChanged(newConfig);
    	if(isInit == true)
    	{
	    	if(newConfig.orientation == Configuration.ORIENTATION_PORTRAIT){
	    		try
	    		{
	    			layout.removeView(adView);
	    		}
	    		catch(Exception exTemp){}
	    		layout.addView(adView);
	    	}
	    	else if(newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE){
	    		try
	    		{
	    			layout.removeView(adView);
	    		}
	    		catch(Exception ex){}
	    	}
    	}
    }
	@Override
	public void onAccuracyChanged(Sensor arg0, int arg1) {
	}

	@Override
	public void onSensorChanged(SensorEvent arg0) {
	}
}