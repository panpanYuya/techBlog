import React from "react";
import { auth } from "../../firebase";

const List = () => {
    return (
        <div>
            <button onClick={() => auth.signOut()}>ログアウト</button>
        </div>
    );
};

export default List;
