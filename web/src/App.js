import { Provider } from "react-redux";

import { store } from "./redux/store";
import Routes from "./utils/routes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
