package com.rnwalk

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class IntentLauncherModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule() {

    override fun getName(): String {
        return "IntentLauncher"
    }

    @ReactMethod
    fun startActivityByName(activityName: String) {
        try {
            val activityClass = Class.forName(activityName)
            val intent = Intent(reactContext, activityClass)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            reactContext.startActivity(intent)
        } catch (e: ClassNotFoundException) {
            e.printStackTrace()
        }
    }
}
