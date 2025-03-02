package com.rnwalk

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class StepCounterModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "StepCounter"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getStepCount(): Int {
        Log.d("jimmy","called")
        return 10 // ✅ React Native에서 요청하면 항상 10을 반환
    }
}
