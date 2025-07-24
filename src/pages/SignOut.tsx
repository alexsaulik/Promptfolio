import { useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const SignOut = () => {
    const { signOut } = useClerk();

    useEffect(() => {
        signOut();
    }, [signOut]);

    return <Navigate to="/" replace />;
};

export default SignOut;
