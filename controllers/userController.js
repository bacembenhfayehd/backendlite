import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  // vérifier si email deja existe dans la base de donnée c' est a dire que un client avoir cette email
  let check = await User.findOne({ email: req.body.email });

  if (check) {
    return res.status(404).json({
      succes: false,
      error: "this email exist already in data base try another one",
    });
  }

  let Panier = {};

  for (let i = 0; i < 300; i++) {
    Panier[i] = 0;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: Panier,
  });

  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret ecomm");
  res.json({ succes: true, token });
};

export const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const commparedPassword = user.password === req.body.password;

    if (commparedPassword) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret ecomm");
      res.json({ succes: true, token });
    } else {
      res.json({ succes: false, error: "mot de passe incorrect" });
    }
  } else {
    res.json({ succes: false, error: "email incorrect" });
  }
};

//middleware pour vérifier si le user est autorisé ou non pour executer des transactions dans l'app !
export const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401).json({ error: "token indisponible , vous etes pas autorisé!" });
  }

  try {
    const decoded = jwt.verify(token, "secret ecomm");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "token non valide" });
  }
};

export const addToCart =  async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // yelzem el panier ykoun mawjoud fel les propriétés mte3 el user  fel db
        if (!userData.cartData) {
            userData.cartData = {};
        }


        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;

        await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

        res.json({ message: 'produit ajouté au panier' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        //yelzem el panier ykoun mawjoud fel les propriétés mte3 el user  fel db
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // na9sou fel quantité mte3 lproduit
        if (userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] -= 1;
            
            // nfas5ou le produit mel panier si la quantité est zéro ou moins
            if (userData.cartData[req.body.itemId] <= 0) {
                delete userData.cartData[req.body.itemId];
            }

            await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
        }

        res.json({ message: 'produit supprimé a partir de panier ' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}




export const getCart = async (req,res) => {
    console.log('get cart')
    let userData = await User.findOne({_id:req.user.id})
    res.json(userData.cartData)
}
