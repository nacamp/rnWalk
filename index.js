/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import App from './Root';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
