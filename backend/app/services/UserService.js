const UserService = {
    parseData: (user) => {
        return {
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            designation: user.designation,
            email: user.email,
            user_type: user.user_type,
        }
    }
}
module.exports = UserService