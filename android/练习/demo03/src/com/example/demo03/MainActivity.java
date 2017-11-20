package com.example.demo03;

import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.view.Menu;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		WebView wv=new WebView(getApplicationContext());
		wv.loadUrl("file:///android_asset/demo03.html");
		//设置wv让它执行js
		wv.getSettings().setJavaScriptEnabled(true);
		
		//看前段端日志
		wv.setWebChromeClient(new WebChromeClient(){
			@Override
			@Deprecated
			public void onConsoleMessage(String message, int lineNumber,
					String sourceID) {
				// TODO Auto-generated method stub
				super.onConsoleMessage(message, lineNumber, sourceID);
				
				Log.e("test","log is"+message+"lineNumber is"+lineNumber);
			}
			
		});
		setContentView(wv);
	}
}
