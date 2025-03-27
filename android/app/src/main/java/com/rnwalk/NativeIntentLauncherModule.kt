package com.rnwalk

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext

class NativeIntentLauncherModule(reactContext: ReactApplicationContext) : NativeIntentLauncherSpec(reactContext) {

    override fun getName() = NAME

    override fun startActivityByName(activityName: String) {
        try {
            val activityClass = Class.forName(activityName)
            val intent = Intent(getReactApplicationContext(), activityClass)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            getReactApplicationContext().startActivity(intent)
        } catch (e: ClassNotFoundException) {
            e.printStackTrace()
        }
    }

    companion object {
        const val NAME = "NativeIntentLauncher"
    }
}
