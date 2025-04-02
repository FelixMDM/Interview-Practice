import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { body } from 'express-validator';

const router = Router();
const taskController = new TaskController();

// Validation middleware
const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status value'),
];

// Routes
router.get('/', taskController.getAllTasks.bind(taskController));
router.get('/:id', taskController.getTaskById.bind(taskController));
router.post('/', validateTask, taskController.createTask.bind(taskController));
router.put('/:id', validateTask, taskController.updateTask.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController));
router.get('/filter/:status', taskController.filterTasks.bind(taskController));

export default router; 