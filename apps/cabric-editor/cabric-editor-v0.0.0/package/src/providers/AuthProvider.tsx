import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient, Session } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const initialState: Session | null = null;

type UserContextType = {
    session: Session | null;
    setSession: (data: Session) => void;
    logout: () => void;
    signUpNewUser: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
};

export const UserContext = createContext<UserContextType>({
    session: null,
    setSession: () => { },
    logout: () => { },
    signUpNewUser: () => { },
    login: () => { },
});

const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuth must be used within a UserContextProvider");
    }
    return context;
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [sessionDataInLocal, setSessionDataInLocal] = useLocalStorage<Session | null>("user", null);
    const [session, setSessionData] = useState<Session | null>(sessionDataInLocal);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session!)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session!)
        })

        return () => subscription.unsubscribe()
    }, [])

    function setSession(data: Session) {
        setSessionData(data);
        setSessionDataInLocal(data);
    }
    async function signUpNewUser(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            //   options: {
            //     emailRedirectTo: 'http://localhost:5173'
            //   }
        })

        if (error) {
            // console.log(error)
            throw error
        } else {
            // console.log(data)
            return data
        }


    }
    async function login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            // console.log(error)
            throw error
        } else {
            // console.log(data)
            return data
        }
    }


    async function logout() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            // console.log(error)
            throw error
      }
      

        // Add the necessary logic for toast here

    }

    return <UserContext.Provider value={{
        session: session || initialState, setSession,
        logout,
        signUpNewUser,
        login
    }}>{children}</UserContext.Provider>;
};

export default useAuth;



