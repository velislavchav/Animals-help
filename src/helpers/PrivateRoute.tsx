import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({component: Component, ...otherAttributes}: any) {
  const { currentUser } = useAuth();
  return (
    <Route {...otherAttributes} 
    render={(props: any) => { return currentUser ? <Component {...props} /> : <Redirect to="/user/login" /> }} />
  )
}
