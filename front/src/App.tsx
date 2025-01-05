import React, { useEffect } from "react";
import "./App.scss";
import Login from "./components/login/login";
import List from "./components/list/list";
import Header from "./components/header/header";
import Search from "./components/search/search";
import Detail from "./components/detail/detail";
import Create from "./components/create/create";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

    return (
        <div>
            {user ? (
                <>
                    <Router>
                        <Header />
                        <Search />
                        <Routes>
                            <Route path="/" element={<List />} />
                            <Route
                                path="/detail/:postId"
                                element={<Detail />}
                            />
                            <Route path="/create" element={<Create />} />ß
                        </Routes>
                    </Router>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;
