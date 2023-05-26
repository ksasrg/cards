import "./App.css";
import { useAppSelector } from "app/hooks";
import { Counter } from "features/counter/Counter";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return (
    <div className="App">
      {isLoading && <h1>Loader...</h1>}
      <Counter />
    </div>
  );
}

export default App;
