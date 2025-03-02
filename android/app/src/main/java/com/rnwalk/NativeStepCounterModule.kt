package com.rnwalk

import android.content.Intent
import android.os.Build
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.MainScope
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.rnwalk.NativeLocalStorageModule.Companion

class NativeStepCounterModule(reactContext: ReactApplicationContext) :
    NativeStepCounterSpec(reactContext) {

    override fun getName() = NAME

    private val scope = MainScope()

    override fun getStepCount(): Double {
        return StepCounterService.steps.value.toDouble() // ✅ 동기적으로 걸음 수 반환
    }

    override fun startListeningToSteps() {
        StepCounterService.steps
            .onEach { stepCount ->
                sendEvent("onStepCountUpdate", stepCount)
            }
            .launchIn(scope)
    }

    override fun startService() {
        val context = reactApplicationContext
        val serviceIntent = Intent(context, StepCounterService::class.java)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            ContextCompat.startForegroundService(context, serviceIntent) // ✅ Foreground Service 실행
        } else {
            context.startService(serviceIntent)
        }
    }

    private fun sendEvent(eventName: String, stepCount: Int) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, stepCount)
    }

    companion object {
        const val NAME = "NativeStepCounter"
    }

}
