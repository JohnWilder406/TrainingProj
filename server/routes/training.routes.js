const TrainingController = require('../controllers/training.controller');

module.exports = function(app){
    app.get('/api/plans', TrainingController.getAllTraining);
    app.get('/api/plans/:id', TrainingController.getTraining);
    app.post('/api/plans/add_plan', TrainingController.createTraining);
    app.put('/api/plans/:id', TrainingController.updateTraining);
    app.delete('/api/plans/:id',TrainingController.deleteTraining);
    app.put('/api/plans/:id/add_workout', TrainingController.createWorkout);
    app.put('/api/plans/:id/edit_workout', TrainingController.updateWorkout);
    app.put('/api/plans/:id/delete/:workoutid', TrainingController.deleteWorkout);
}