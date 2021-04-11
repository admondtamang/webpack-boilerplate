import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";

function ScrollToTop() {
    const history = useHistory();
    console.log("Scrolled to top");
    useEffect(() => {
        const unlisten = history.listen(() => {
            // window.screenTop(0, 0, smooth);
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        });
        return () => {
            unlisten();
        };
    }, [history]);
    return null;
}
export default withRouter(ScrollToTop);
