import React, { useEffect, useState } from "react";
import { styled, ThemeProvider, DarkTheme } from "baseui";
import { Theme } from "baseui/theme";
import { Button, KIND } from "baseui/button";
import Logo from "@/components/Icons/Logo";
import useDesignEditorContext from "@/hooks/useDesignEditorContext";
import Play from "@/components/Icons/Play";
import { Block } from "baseui/block";
import { useEditor } from "@layerhub-io/react";
import useEditorType from "@/hooks/useEditorType";
import { IScene } from "@layerhub-io/types";
import { loadTemplateFonts } from "@/utils/fonts";
import { loadVideoEditorAssets } from "@/utils/video";
import DesignTitle from "./DesignTitle";
import { IDesign } from "@/interfaces/DesignEditor";
import { toast } from "@/themes/defaultTheme";
import useAppContext from "@/hooks/useAppContext";

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "grid",
  padding: "0 1.25rem",
  gridTemplateColumns: "380px 1fr 380px",
  alignItems: "center",
}));

interface NavbarProps {
  designState?: any;
  onSave?: (designState: any, image: any) => void;
}

export default function Navbar({ designState, onSave }: NavbarProps) {
  const {
    setDisplayPreview,
    setScenes,
    setCurrentDesign,
    currentDesign,
    scenes,
  } = useDesignEditorContext();
  const editorType = useEditorType();
  const editor = useEditor();
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const { userFonts, applyContext } = useAppContext();

  const [isChangesSaved, setIsChangesSaved] = useState(false);

  useEffect(() => {
    if (designState) {
      handleImportTemplate(designState);
    }
  }, [designState, editor]);

  const parseGraphicJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: "GRAPHIC",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      return graphicTemplate;
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const getGraphicImage = async () => {
    const currentScene = await editor.scene.exportToJSON();
    // render the current scene
    const loadedScene = await loadVideoEditorAssets(currentScene);

    const preview = (await editor.renderer.render(loadedScene)) as string;

    return preview;
  };

  const parsePresentationJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          duration: 5000,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        duration: 5000,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const presentationTemplate: IDesign = {
        id: currentDesign.id,
        type: "PRESENTATION",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(presentationTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const parseVideoJSON = () => {
    const currentScene = editor.scene.exportToJSON();
    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: scn.id,
          duration: scn.duration,
          layers: currentScene.layers,
          name: currentScene.name ? currentScene.name : "",
        };
      }
      return {
        id: scn.id,
        duration: scn.duration,
        layers: scn.layers,
        name: scn.name ? scn.name : "",
      };
    });
    if (currentDesign) {
      const videoTemplate: IDesign = {
        id: currentDesign.id,
        type: "VIDEO",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(videoTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const makeDownload = (data: Object) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "template.json";
    a.click();
  };

  const makeDownloadTemplate = async () => {
    if (editor) {
      if (editorType === "GRAPHIC") {
        return parseGraphicJSON();
      } else if (editorType === "PRESENTATION") {
        return parsePresentationJSON();
      } else {
        return parseVideoJSON();
      }
    }
  };

  const downloadImage = async () => {
    // get current scene and render it
    const image = await getGraphicImage();

    const a = document.createElement("a");

    a.href = image;
    a.download = "image.png";
    a.click();
  };

  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = [];
    const { scenes: scns, ...design } = payload;

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);
      await loadTemplateFonts(loadedScene, userFonts);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      scenes.push({ ...loadedScene, preview });
    }

    return { scenes, design };
  };

  const loadPresentationTemplate = async (payload: IDesign) => {
    const scenes = [];
    const { scenes: scns, ...design } = payload;

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      await loadTemplateFonts(loadedScene);
      scenes.push({ ...loadedScene, preview });
    }
    return { scenes, design };
  };

  const loadVideoTemplate = async (payload: IDesign) => {
    const scenes = [];
    const { scenes: scns, ...design } = payload;

    for (const scn of scns) {
      const design: IScene = {
        name: "Awesome template",
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
        duration: scn.duration,
      };
      const loadedScene = await loadVideoEditorAssets(design);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      await loadTemplateFonts(loadedScene);
      scenes.push({ ...loadedScene, preview });
    }
    return { scenes, design };
  };

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      let template;
      if (data.type === "GRAPHIC") {
        template = await loadGraphicTemplate(data);
      } else if (data.type === "PRESENTATION") {
        template = await loadPresentationTemplate(data);
      } else if (data.type === "VIDEO") {
        template = await loadVideoTemplate(data);
      }
      //   @ts-ignore
      setScenes(template.scenes);
      //   @ts-ignore
      setCurrentDesign(template.design);
    },
    [editor]
  );

  // const handleInputFileRefClick = () => {
  //   inputFileRef.current?.click();
  // };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (res) => {
        const result = res.target!.result as string;
        const design = JSON.parse(result);
        handleImportTemplate(design);
      };
      reader.onerror = (err) => {
        console.log(err);
      };

      reader.readAsText(file);
    }
  };

  return (
    // @ts-ignore
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <Logo size={36} />
        </div>
        <DesignTitle />
        <Block
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: "none" }}
          />

          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            <Play size={24} />
          </Button>

          <Button
            style={{ marginLeft: "0.5rem" }}
            size="compact"
            onClick={async () => {
              const updatedJSON = await makeDownloadTemplate();
              const image = await getGraphicImage();

              await onSave?.(updatedJSON, image);

              toast({
                title: "Design Saved",
                description: "Your design has been saved successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
              });

              setIsChangesSaved(true);
            }}
            kind={KIND.primary}
          >
            Save
          </Button>

          <Button
            size="compact"
            style={{ marginLeft: "0.5rem" }}
            onClick={downloadImage}
          >
            Download Asset
          </Button>

          <Button
            size="compact"
            style={{ marginLeft: "0.5rem" }}
            onClick={async () => {
              await applyContext?.applyToAllAssets();
              setIsChangesSaved(false);
            }}
            disabled={
              applyContext.isApplyingToAll ||
              !isChangesSaved ||
              applyContext.isGenerating
            }
            title={
              !isChangesSaved
                ? "Please save your design before applying to all"
                : applyContext.isGenerating
                ? "Generating Assets, Please wait"
                : "Apply To All"
            }
          >
            Apply To All
          </Button>
        </Block>
      </Container>
    </ThemeProvider>
  );
}
