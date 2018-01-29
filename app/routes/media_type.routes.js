module.exports = function(router) {

    var media = require('../controllers/media_type.controller.js');

    router.route('/media_types')
    // Create a new Media Type
    .post(media.create)

    // Retrieve all Media Types
    .get(media.findAll);

    router.route('/media_types/:id')
    // Retrieve a single Media Type with id
    .get(media.findOne)

    // Update a Media Type with id
    .put(media.update)

    // Delete a Media Type with id
    .delete(media.delete);
}
