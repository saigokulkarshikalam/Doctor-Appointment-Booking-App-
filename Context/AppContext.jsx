import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const storedToken = localStorage.getItem("token");
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Use a string or null instead of a boolean for token state
    const [token, setToken] = useState(storedToken || null);
    const [appointments, setAppointments] = useState(storedAppointments);
    const currencySymbol = '$';

    // Save appointments and token to localStorage whenever they change
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);  // Store token as a string
        } else {
            localStorage.removeItem("token");  // Remove token if it's null/false
        }
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }, [appointments, token]);

    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        appointments,
        setAppointments,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
