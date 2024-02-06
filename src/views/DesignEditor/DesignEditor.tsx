
import GraphicEditor from "./GraphicEditor"

import useDesignEditorContext from "@/hooks/useDesignEditorContext"
import Preview from "./components/Preview"
// @ts-ignore
import ContextMenu from "./components/ContextMenu"

import { useEffect } from "react"

interface DesignEditorProps {
  designState?: any
  onSave?: (designState: any) => void
}

function DesignEditor ({ designState, onSave }: DesignEditorProps) {
  const { displayPreview, setDisplayPreview, setEditorType } = useDesignEditorContext()

  useEffect(() => {
    setEditorType("GRAPHIC")

  }, [])

  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}
      <GraphicEditor
        designState = { designState }
        onSave = {onSave}
      />,
    </>
  )
}

export default DesignEditor
