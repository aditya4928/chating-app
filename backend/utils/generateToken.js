import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  }); //to verify the payload userid is enough

  res.cookie("jwt", token, {
    //jwt name is saved as cookies
    maxAge: 15 * 24 * 60 * 60 * 1000, // Milisec
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
