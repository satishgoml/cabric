import { PanelType } from "@/constants/app-options";
import React, { createContext, useState } from "react";

type Template = any;
interface IAppContext {
    isMobile: boolean | undefined;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    templates: Template[];
    setTemplates: (templates: Template[]) => void;
    uploads: any[];
    setUploads: (templates: any[]) => void;
    shapes: any[];
    setShapes: (templates: any[]) => void;
    activePanel: PanelType;
    setActivePanel: (option: PanelType) => void;
    activeSubMenu: string | null;
    setActiveSubMenu: (option: string) => void;
    currentTemplate: any;
    setCurrentTemplate: any;
    userFonts: any[];
    setUserFonts: (fonts: any[]) => void;
}

export const AppContext = createContext<IAppContext>({
    isMobile: false,
    setIsMobile: () => {},
    templates: [],
    setTemplates: () => {},
    uploads: [],
    setUploads: () => {},
    shapes: [],
    setShapes: () => {},
    activePanel: PanelType.TEMPLATES,
    setActivePanel: () => {},
    activeSubMenu: null,
      // @ts-ignore
    setActiveSubMenu: (value: string) => {},
    currentTemplate: {},
    setCurrentTemplate: {},
    userFonts: [],
    setUserFonts: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [uploads, setUploads] = useState<any[]>([]);
    const [shapes, setShapes] = useState<Template[]>([]);
    const [activePanel, setActivePanel] = useState<PanelType>(PanelType.TEMPLATES);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const [currentTemplate, setCurrentTemplate] = useState(null);
    const [userFonts, setUserFonts] = useState<any[]>([]);
    const context = {
        isMobile,
        setIsMobile,
        templates,
        setTemplates,
        activePanel,
        setActivePanel,
        shapes,
        setShapes,
        activeSubMenu,
        setActiveSubMenu,
        uploads,
        setUploads,
        currentTemplate,
        setCurrentTemplate,
        userFonts,
        setUserFonts,
    };
    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
