const WebController = {
    index: async (req, res) => {
        try {
            const user = {msg: "This is the root page of the project"};
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = WebController;