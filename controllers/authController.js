const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { email, password, name, lastName, phone } = req.body;

    // Validar que el usuario no exista
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya está registrado." });
    }

    // Crear usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword, name, lastName, phone });
    await user.save();

    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta." });

    // Generar JWT
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Inicio de sesión exitoso.", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor."});
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Sesión cerrada." });
};