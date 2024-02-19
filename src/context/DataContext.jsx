import { createContext, useState } from "react";

const Data = createContext();

function DataContext({ children }) {

    const [loginUser, setLoginUser] = useState("");
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(true);
    const [products, setProducts] = useState(true);

    return (
        <div>
            <Data.Provider value={{ loginUser, setLoginUser, login, setLogin, signUp, setSignUp, products, setProducts }} >
                {children}
            </Data.Provider>
        </div>
    )
}

export default DataContext;
export { Data };