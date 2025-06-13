import { createContext} from "react";
const userCart = [
    { id: 1, title: "Movie 1", price: 10 },
    { id: 2, title: "Movie 2", price: 15 },
    { id: 3, title: "Movie 3", price: 20 }
];

export const userContext = createContext({ cartItems: userCart });

export default userContext;