import job from "./components/JobPosts";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
function App() {
  return (
    <Provider store={store}>
      <div className="main">
        <JobPosts />
      </div>
    </Provider>
  );
}

export default App;
