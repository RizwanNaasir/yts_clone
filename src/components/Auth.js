import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function Auth() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) navigate("/login");
    }, [user, loading]);
    return null;
}
export default Auth;