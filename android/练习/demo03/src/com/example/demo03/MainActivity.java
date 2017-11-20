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
		//����wv����ִ��js
		wv.getSettings().setJavaScriptEnabled(true);
		
		//��ǰ�ζ���־
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
