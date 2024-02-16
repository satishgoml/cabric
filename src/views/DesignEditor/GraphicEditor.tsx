import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import Toolbox from "./components/Toolbox"
import EditorContainer from "./components/EditorContainer"
// @ts-ignore
import ContextMenu from "./components/ContextMenu"


interface GraphicEditorProps {
  designState?: any
  onSave?: (designState: any, image: any) => void
}

function GraphicEditor({ designState , onSave}: GraphicEditorProps) {

  return (
    <>
      <EditorContainer>
        <Navbar designState={designState} 
          onSave={onSave}
        />
        <div style={{ display: "flex", flex: 1 }}>
          <Panels />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
            <Toolbox />
            <Canvas />
            <Footer />
          </div>
        </div>
      </EditorContainer>
    </>
  )
}

export default GraphicEditor
