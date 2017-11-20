package com.example.demo02;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.webkit.WebView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// 创建WebView组件
		WebView wv = new WebView(getApplicationContext());

		// 加载某一个页面
		wv.loadUrl("file:///android_asset/demo02.html");

		// 将WebView组件显示在内容栈中
		setContentView(wv);

		// setContentView(R.layout.activity_main);
	}

}
