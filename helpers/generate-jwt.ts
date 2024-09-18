import jwt from "jsonwebtoken";

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("el token no se pudo generar");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJWT;
