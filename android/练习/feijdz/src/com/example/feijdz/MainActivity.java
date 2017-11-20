package com.example.feijdz;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		WebView wv=new WebView(getApplicationContext());
		wv.loadUrl("file:///android_asset/PROJECT/index.html");
		wv.getSettings().setJavaScriptEnabled(true);
		
		wv.setWebChromeClient(new WebChromeClient(){
			@Override
			@Deprecated
			public void onConsoleMessage(String message, int lineNumber,
					String sourceID) {
				// TODO Auto-generated method stub
				super.onConsoleMessage(message, lineNumber, sourceID);
			}
		});
		
		setContentView(wv);
	}	
}
