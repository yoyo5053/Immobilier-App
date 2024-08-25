import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId)
  res.status(200).json({ message: "You are Authenticated" });
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    // Si une erreur se produit lors de la vérification du token, renvoyer une réponse 403 avec un message d'erreur
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    // Vérifier si la charge utile décodée n'a pas la propriété isAdmin définie sur true
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized!" });
    }
  });

  res.status(200).json({ message: "You are Authenticated" });
};