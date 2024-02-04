import Provider from "./Provider"
import Container from "./Container"
import "./index.css"
import DesignEditor from "./views/DesignEditor"

function CabricEditor() {
  return (
    <Provider>
      <Container>
        <DesignEditor />
      </Container>
    </Provider>
  )
}
export  { CabricEditor }