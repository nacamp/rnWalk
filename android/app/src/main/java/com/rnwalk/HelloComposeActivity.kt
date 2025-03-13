package com.rnwalk

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
//import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable

class HelloComposeActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HelloComposeScreen {
                finish() // 현재 Compose Activity를 닫고 React Native 화면으로 돌아감
            }
        }
    }
}

@Composable
fun HelloComposeScreen(onClose: () -> Unit) {
    MaterialTheme {
        Surface {
            Column {
                Text(text = "Hello Compose!")
                Button(onClick = { onClose() }) {
                    Text("React Native로 돌아가기")
                }
            }
        }
    }
}