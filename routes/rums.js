import { Router } from 'express';
import rumsController from '../controllers/rumsController.js';
const router = Router();

/**
 * @swagger
 * /api/rums:
 *   get:
 *     summary: Pobiera listę wszystkich rumów
 *     tags:
 *       - Rums
 *     responses:
 *       200:
 *         description: Lista rumów
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Rum Bacardi
 *                   details:
 *                     type: object
 *                     properties:
 *                       awards:
 *                         type: object
 *                         properties:
 *                           international:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "Gold Medal"
 *                           domestic:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "Best Rum of the Year"
 */
router.get('/', rumsController.getAllRums);

/**
 * @swagger
 * /api/rums/{id}:
 *   get:
 *     summary: Pobiera szczegóły rumu o podanym id
 *     tags:
 *       - Rums
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Szczegóły rumu
 *       404:
 *         description: Rum nie znaleziony
 */
router.get('/:id', rumsController.getRumById);

/**
 * @swagger
 * /api/rums:
 *   post:
 *     summary: Tworzy nowy rum
 *     tags:
 *       - Rums
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Rum
 *               type:
 *                 type: string
 *                 example: Dark
 *     responses:
 *       201:
 *         description: Rum został utworzony
 *       400:
 *         description: Niepoprawne dane wejściowe
 *       409:
 *         description: Rum już istnieje
 */
router.post('/', rumsController.createRum);

/**
 * @swagger
 * /api/rums/{id}:
 *   put:
 *     summary: Aktualizuje dane rumu o podanym id
 *     tags:
 *       - Rums
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Rum
 *               type:
 *                 type: string
 *                 example: Spiced
 *     responses:
 *       200:
 *         description: Dane rumu zostały zaktualizowane
 *       404:
 *         description: Rum nie znaleziony
 */
router.put('/:id', rumsController.updateRum);

/**
 * @swagger
 * /api/rums/{id}:
 *   patch:
 *     summary: Częściowo aktualizuje dane rumu o podanym id
 *     tags:
 *       - Rums
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Rum
 *               type:
 *                 type: string
 *                 example: Spiced
 *     responses:
 *       200:
 *         description: Dane rumu zostały zaktualizowane
 *       404:
 *         description: Rum nie znaleziony
 */
router.patch('/:id', rumsController.partialUpdateRum);

/**
 * @swagger
 * /api/rums/{id}:
 *   delete:
 *     summary: Usuwa rum o podanym id
 *     tags:
 *       - Rums
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Rum został usunięty
 *       404:
 *         description: Rum nie znaleziony
 */
router.delete('/:id', rumsController.deleteRum);

export default router;
