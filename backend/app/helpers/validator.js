const Validator = {
    parseError: (error) => {
        let fails = {};
        error.details.forEach((v, i) => {
            fails[v.path[0]] = v.message;
        })
        return fails;
    }
}
module.exports = Validator