const User = require("../models/User");

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios.", error });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario.", error });
    }
}

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, name, lastName, phone } = req.body;

        const user = await User.findByIdAndUpdate(id, { email, password, name, lastName, phone }, { new: true });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

        res.status(200).json({ message: "Usuario actualizado exitosamente." });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario.", error });
    }
}

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

        res.status(200).json({ message: "Usuario eliminado exitosamente." });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario.", error });
    }
}