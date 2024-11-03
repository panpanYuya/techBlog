import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import List from "./components/list/list";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

function App() {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((loginUser) => {
            if (loginUser) {
                dispatch(
                    login({
                        userId: loginUser.uid,
                        name: loginUser.displayName,
                        photo: loginUser.photoURL,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);

    return <div>{user ? <List /> : <Login />}</div>;
}

export default App;
