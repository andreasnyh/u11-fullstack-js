const notFound = (req, res) => res.status(404).json('Endpoint not found');
module.exports = notFound;
