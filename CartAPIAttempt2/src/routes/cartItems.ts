// require the express module
import express from "express";
import { CartItem } from "../models/Cart";
// create a new Router object
const routes = express.Router();

const cart: CartItem[] = [
  {
    id: 111,
    price: 4.99,
    quantity: 1,
    product: "Shampoo",
    customer_id: 4,
  },
  {
    id: 122,
    price: 5.99,
    quantity: 2,
    product: "Conditioner",
    customer_id: 6,
  },
  {
    id: 211,
    price: 3.99,
    quantity: 1,
    product: "Toothpaste",
  },
  {
    id: 225,
    price: 6.99,
    quantity: 1,
    product: "Bodywash",
  },
  {
    id: 233,
    price: 1.99,
    quantity: 1,
    product: "Dental Floss",
  },
];

routes.get("/", (req, res) => {
  let newCart = cart;
  if (req.query.maxPrice) {
    newCart = newCart.filter((item) => {
      return item.price < parseInt(req.query.maxPrice as string);
    });
  }

  if (req.query.prefix) {
    newCart = newCart.filter((item) =>
      item.product.startsWith(req.query.prefix as string)
    );
  }

  if (req.query.pageSize) {
    newCart = cart.slice(0, parseInt(req.query.pageSize as string));
  }

  res.json(newCart);
});

routes.get("/customers/:customer_id/", (req, res) => {
  let found: CartItem | undefined = cart.find((item) => {
    return item.customer_id === parseInt(req.params.customer_id);
  });

  if (found) {
    res.json(found);
  } else {
    res.status(404).json("Not found");
  }
});

routes.get("/customers/:customer_id/:id", (req, res) => {
  let found: CartItem | undefined = cart.find((item) => {
    return item.id === parseInt(req.params.id) &&
      item.customer_id === parseInt(req.params.customer_id);
  });

  if (found) {
    res.json(found);
  } else {
    res.status(404).json("Not found");
  }
});

routes.get("/:id", (req, res) => {
  let found: CartItem | undefined = cart.find((item) => {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.json(found);
  } else {
    res.status(404).json("Not found");
  }
});

routes.post("/", (req, res) => {
  const item = req.body as CartItem;

  cart.push(item);

  res.status(201).json(item);
});

routes.put("/:id", (req, res) => {
  const item = req.body as CartItem;
  item.id = parseInt(req.params.id);

  let foundIndex: number = cart.findIndex((item) => {
    return item.id === parseInt(req.params.id);
  });

  if (foundIndex !== -1) {
    cart.splice(foundIndex, 1, item);
  } else {
    cart.push(item);
  }

  res.json(item);
});

routes.patch("/:id", (req, res) => {
  const item = req.body as CartItem;
  item.id = parseInt(req.params.id);

  let foundIndex: number = cart.findIndex((item) => {
    return item.id === parseInt(req.params.id);
  });

  if (foundIndex !== -1) {      // update only the values that are different
    cart.splice(foundIndex, 1, Object.assign(cart[foundIndex], item));
  } else {
    cart.push(item);
  }

  res.json(item);
});

routes.delete("/:id", (req, res) => {
  let foundIndex: number = cart.findIndex((item) => {
    return item.id === parseInt(req.params.id);
  });

  if (foundIndex !== -1) {
    cart.splice(foundIndex, 1);
    res.status(204); // 204 Deleted
    res.json("Deleted");
  } else {
    res.status(404).json("Not Found");
  }
});

export default routes;