import Provider from "./Provider"
import Container from "./Container"
import "./index.css"
import DesignEditor from "./views/DesignEditor"


interface CabricEditorProps {
  designState?: any
  onSave?: (designState: any, image : any) => void
  userFonts?: any
  applyContext?: any
}

function CabricEditor({designState, onSave, userFonts, applyContext} : CabricEditorProps) {

  return (
    <Provider>
      <Container>
        <DesignEditor
          designState={designState}
          onSave={onSave}
          userFonts={userFonts}
          applyContext={applyContext}
        />
      </Container>
    </Provider>
  )
}
export  { CabricEditor }