package com.example.demo02;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.webkit.WebView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// ����WebView���
		WebView wv = new WebView(getApplicationContext());

		// ����ĳһ��ҳ��
		wv.loadUrl("file:///android_asset/demo02.html");

		// ��WebView�����ʾ������ջ��
		setContentView(wv);

		// setContentView(R.layout.activity_main);
	}

}
