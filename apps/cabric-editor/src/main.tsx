import ReactDOM from "react-dom/client"
import Provider from "./Provider"
import Router from "./routes/Router"
import Container from "./Container"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <Container>
      <Router />
    </Container>
  </Provider>
)
