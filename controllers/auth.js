const authFailed = (req, res) => {
    res.send('Failed to Authenticate')
}

module.exports = {
    authFailed
}