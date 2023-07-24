
const handleError = (error, res) => {
	console.error(error);
	res.status(500).send({ message: 'Server error' });
}

module.exports = {
	handleError
}