package com.codex.genrivia;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.os.Bundle;
import android.os.Vibrator;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends Activity {

    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("https://genrivia.vercel.app/");

        webView.addJavascriptInterface(new AndroidApiInterface(), "AndroidApi");
    }

    @Override
    public void onBackPressed() {
        webView.evaluateJavascript("window.onBackPressed()", value -> {
            if (!"true".equals(value)) {
                super.onBackPressed();
            }
        });
    }

    public class AndroidApiInterface {
        @android.webkit.JavascriptInterface
        public void SetStatusBarColor(String color) {
            runOnUiThread(() -> getWindow().setStatusBarColor(android.graphics.Color.parseColor(color)));
        }

        @android.webkit.JavascriptInterface
        public void SetNavigationBarColor(String color) {
            runOnUiThread(() -> getWindow().setNavigationBarColor(android.graphics.Color.parseColor(color)));
        }

        @SuppressLint("MissingPermission")
        @android.webkit.JavascriptInterface
        public void Vibrate(int duration) {
            Vibrator vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
            if (vibrator != null && vibrator.hasVibrator()) {
                vibrator.vibrate(duration);
            }
        }

        @android.webkit.JavascriptInterface
        public void ShowDialog(int id, String title, String message, String cancelable, String positiveButton, String negativeButton) {
            runOnUiThread(() -> {
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                builder.setTitle(title);
                builder.setMessage(message);

                builder.setPositiveButton(positiveButton, (dialog, which) -> {
                    webView.evaluateJavascript("window.onDialogPositive(" + id + ")", null);
                });

                builder.setNegativeButton(negativeButton, null);

                builder.setCancelable(Boolean.parseBoolean(cancelable));
                builder.show();
            });
        }

        @android.webkit.JavascriptInterface
        public void Toast(String message) {
            runOnUiThread(() -> Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show());
        }

        @android.webkit.JavascriptInterface
        public void Exit() {
            runOnUiThread(MainActivity.this::finish);
        }
    }
}
