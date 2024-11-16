import { Router } from 'express';

const router = Router();

/** import controllers */
import * as controller from '../controllers/controller.js';



/** create routes */


/** Questions Routes API */

/** 
router.get('/questions', controller.getQuestion);
router.post('/questions', controller.insertQuestion);
does same as below
*/
router.route('/questions')
    .get(controller.getQuestion) /** GET Request */
    .post(controller.insertQuestion) /** POST Request */
    .delete(controller.dropQuestions) /** DELETE Request */





router.route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .delete(controller.dropResult)
export default router;