const UserService = {
    parseData: (user) => {
        return {
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            designation: user.designation,
            email: user.email,
            user_type: user.user_type,
            activation: user.activation_code != null ? 0 : 1
        }
    }
}
module.exports = UserService