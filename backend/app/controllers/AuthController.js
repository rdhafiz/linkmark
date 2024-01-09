const AuthController = {
    login: async (req, res) => {
        try {
            const user = {test: "adsfasfd"};
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    register: async (req, res) => {
        try {
            const user = null;
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = AuthController;