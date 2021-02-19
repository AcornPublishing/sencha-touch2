package com.lbo.fileexplorer;

import com.google.ads.*;
import android.app.Activity;
import android.os.Bundle;
import android.widget.LinearLayout;

import org.apache.cordova.*;

public class MobileExplorerActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {    	
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");          
        AdView adView = new AdView(this, AdSize.BANNER, "a1503b88c6abbdc");
        
        LinearLayout layout = super.root;
        layout.addView(adView);
        layout.setHorizontalGravity(android.view.Gravity.CENTER_HORIZONTAL);
        adView.loadAd(new AdRequest());
        
    }
}