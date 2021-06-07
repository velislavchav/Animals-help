import { useState } from "react";
import { useHistory } from "react-router";
import "./Errors.scss";

export default function NotFound404() {
    const [secondToRedirect, setSecondToRedirect] = useState(10);
    const history = useHistory(); 
    
    setInterval(() => {
        secondToRedirect <= 0 ? history.push("/") : setSecondToRedirect(() => secondToRedirect - 1);
    }, 1000)

    return (
        <div id="error">
            <div className="fof">
                <h2>Error 404</h2>
                <p>
                    The page that you are looking for is missing! <br /> 
                    You will be automatically redirected to home page after {secondToRedirect} seconds.
                </p>
            </div>
        </div>
    )
}