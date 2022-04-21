import 'react-native-gesture-handler';
import App from './src/App';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const app = () => App;
AppRegistry.registerComponent(appName, app);
