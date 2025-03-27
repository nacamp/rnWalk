package com.rnwalk

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeIntentLauncherPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            NativeIntentLauncherModule.NAME -> NativeIntentLauncherModule(reactContext)
            else -> null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            mapOf(
                NativeIntentLauncherModule.NAME to ReactModuleInfo(
                    NativeIntentLauncherModule.NAME,
                    NativeIntentLauncherModule::class.java.name,
                    false,
                    false,
                    false,
                    true
                )
            )
        }
    }
}
