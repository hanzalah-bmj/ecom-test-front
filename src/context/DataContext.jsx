import { createContext, useState } from "react";

const Data = createContext();

function DataContext({ children }) {

    const [loginUser, setLoginUser] = useState("");
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(true);
    const [products, setProducts] = useState(true);
    const [catgoryName, setCatgoryName] = useState();
    const [catgorySlug, setCatgorySlug] = useState();
    const [catgoryParentCategory, setCatgoryParentCategory] = useState();
    const [catgoryDescription, setCatgoryDescription] = useState();

    return (
        <div>
            <Data.Provider value={{ loginUser, setLoginUser, login, setLogin, signUp, setSignUp, products, setProducts, catgoryName, setCatgoryName, catgorySlug, setCatgorySlug, catgoryParentCategory, setCatgoryParentCategory, catgoryDescription, setCatgoryDescription}} >
                {children}
            </Data.Provider>
        </div>
    )
}

export default DataContext;
export { Data };