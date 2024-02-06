import Provider from "./Provider"
import Container from "./Container"
import "./index.css"
import DesignEditor from "./views/DesignEditor"


interface CabricEditorProps {
  designState?: any
  onSave?: (designState: any) => void
}

function CabricEditor({designState, onSave} : CabricEditorProps) {

  return (
    <Provider>
      <Container>
        <DesignEditor
          designState={designState}
          onSave={onSave}
        />
      </Container>
    </Provider>
  )
}
export  { CabricEditor }