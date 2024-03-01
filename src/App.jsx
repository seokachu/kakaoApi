import { Provider } from 'react-redux';
import Router from './shared/Router';
import store from './shared/store/config/configStore';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
