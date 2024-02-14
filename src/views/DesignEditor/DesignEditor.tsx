import GraphicEditor from "./GraphicEditor";

import useDesignEditorContext from "@/hooks/useDesignEditorContext";
import Preview from "./components/Preview";
// @ts-ignore
import ContextMenu from "./components/ContextMenu";

import { useEffect } from "react";
import useAppContext from "@/hooks/useAppContext";

interface DesignEditorProps {
  designState?: any;
  onSave?: (designState: any) => void;
  userFonts?: any;
  applyContext?: any;
}

function DesignEditor({ designState, onSave, userFonts, applyContext }: DesignEditorProps) {
  const { displayPreview, setDisplayPreview, setEditorType } =
    useDesignEditorContext();
  const { setUserFonts, setApplyContext} = useAppContext();

  useEffect(() => {
    setEditorType("GRAPHIC");
    setUserFonts(userFonts);
    setApplyContext(applyContext);
  }, []);

  return (
    <>
      {displayPreview && (
        <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />
      )}
      <GraphicEditor designState={designState} onSave={onSave} />,
    </>
  );
}

export default DesignEditor;
