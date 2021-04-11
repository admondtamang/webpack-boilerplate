import React, { useState } from "react";
export default function Footer() {
    // home, category, cart, login
    const [selectedTab, setSelectedTab] = useState("home");
    return <p>footer</p>;
}
