import Provider from "./Provider"
import Container from "./Container"
import "./index.css"
import DesignEditor from "./views/DesignEditor"


interface CabricEditorProps {
  designState?: any
  onSave?: (designState: any) => void
  userFonts?: any
}

function CabricEditor({designState, onSave, userFonts} : CabricEditorProps) {

  return (
    <Provider>
      <Container>
        <DesignEditor
          designState={designState}
          onSave={onSave}
          userFonts={userFonts}
        />
      </Container>
    </Provider>
  )
}
export  { CabricEditor }