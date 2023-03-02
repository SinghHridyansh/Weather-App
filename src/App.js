import "../src/App.css";
import Main from "./Component/Main";

export default function App() {
  return (
    <div>
      <h3
        style={{
          backgroundColor: "#4472C4",
          color: "white",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Hridyansh Weather App
      </h3>
      <Main />
    </div>
  );
}
