import React from "react";
import { Route } from "react-router-dom";

export default function AppLayout({ component: ComponentToRender, layout: Layout, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout>
                    <ComponentToRender {...props} />
                </Layout>
            )}
        />
    );
}
