import { useLocalStorage } from "~/hooks/useLocalStorage";
// import { toast } from "~/themes/defaultTheme";
import { createContext, useContext, useState } from "react";


type SessionDataType = {
    user: {
        first_name: string;
        last_name: string;
        email: string;
        country: string;
    } | null;
    access_token: string | null;
    refresh_token: string | null;
};


export const initialState: SessionDataType = {
    user: null,
    access_token: null,
    refresh_token: null,
};


type UserContextType = {
    session: SessionDataType;
    setSession: (data: SessionDataType) => void;
    logout: () => void;
};


export const UserContext = createContext<UserContextType>({
    session: initialState,
    setSession: () => { },
    logout: () => { },
});


const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuth must be used within a UserContextProvider");
    }
    return context;
};


export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [sessionDataInLocal, setSessionDataInLocal] = useLocalStorage<SessionDataType | null>("user", null);
    const [session, setSessionData] = useState<SessionDataType | null>(sessionDataInLocal);


    function setSession(data: SessionDataType) {
        setSessionData(data);
        setSessionDataInLocal(data);
    }


    function logout() {
        setSession(initialState);
        setSessionDataInLocal(null);
        console.log({
            title: "Logout",
            description: "You have been logged out",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // toast({
        //     title: "Logout",
        //     description: "You have been logged out",
        //     status: "success",
        //     duration: 3000,
        //     isClosable: true,
        // });
    }


    return <UserContext.Provider value={{
        session: session || initialState, setSession,

        logout
    }}>{children}</UserContext.Provider>;
};


export default useAuth;