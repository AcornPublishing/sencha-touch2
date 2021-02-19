package com.lbo.book.myphonegapplugin;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

//import com.spletart.mobile.WikitudeCamera;


public class MyPhoneGapPluginActivity extends DroidGap {
    /** Called when the activity is first created. */
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
       //setContentView(R.layout.main);
        super.loadUrl("file:///android_asset/www/index.html");
        //WikitudeCamera temp = new WikitudeCamera(this.getApplication(), this.getContext() );
    }
}