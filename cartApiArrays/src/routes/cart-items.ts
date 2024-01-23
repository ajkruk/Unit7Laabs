// require the express module
import express from "express";
import { Item } from "../models/Cart";

// create a new Router object
const routes = express.Router();

const cartItems: Item[] = [
    {
        id: 111, 
        product: "shampoo",
        price: 5.99,
        quantity: 2,
    },
    {
        id: 115, 
        product: "conditioner",
        price: 6.99,
        quantity: 1,
    },
    {
        id: 124, 
        product: "body wash",
        price: 6.99,
        quantity: 2,
    },
    {
        id: 211, 
        product: "toothpaste",
        price: 3.99,
        quantity: 3,
    },
];

routes.get("/", (req, res) => {
    res.json("Hello World")
});

routes.get('/cart-items', (req, res) => {
        const maxPrice = Number(req.query['max-price']);
        const maxPriceArray: Item[] = [];
        const prefix = String(req.query['prefix']);
        const prefixArray: Item[] = [];
        const pageSize = Number(req.query['page-size']);

        if (!Number.isNaN(maxPrice) && Object.keys(maxPrice).length === 0) {
            for (const item of cartItems) {
                if(item.price < maxPrice) {
                    maxPriceArray.push(item);    
                } 
            }
            res.status(200).json(maxPriceArray); // <---- cannot be in a loop
        } else if(!Number.isNaN(pageSize)) {
            res.status(200).json(cartItems.slice(0, pageSize) )
        } else {
            for (const item of cartItems) {
                if(Object.keys(prefix).length !== 0 && item.product.includes(prefix?.toString())) {
                prefixArray.push(item);
                }
            };
            if (prefixArray.length > 0) {
                res.status(200).json(prefixArray);
            }

            res.status(200).json(cartItems);
    }       
});

// when a query is submitted for item id, returns the correct item
routes.get('/cart-items/:id', (req, res) => {
    const objectId = Number(req.query['object-id']);

    for(const item of cartItems) {
        if(item.id === objectId) {
            res.status(200).json(item);
        } else if (item.id !== objectId) {
            res.status(404).json("ID Not Found");
        };
    };
});

routes.post('/cart-items', (req, res) => {
    res.json("Adding Cart Item");
});

// routes.delete("/:id", (req, res) => {
//     let foundIndex: number = cartItems.findIndex((item) => {
//         item.id === parseInt(req.params.id);

//     });
    
// })

export default routes;