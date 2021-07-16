const TrainingController = require('../controllers/training.controller');

module.exports = function(app){
    app.get('/api/plans', TrainingController.getAllTraining);
    app.get('/api/plans/:id', TrainingController.getTraining);
    app.post('/api/products', TrainingController.createTraining);
    app.put('/api/products/:id', TrainingController.updateTraining);
    app.delete('/api/products/:id',TrainingController.deleteTraining);
}