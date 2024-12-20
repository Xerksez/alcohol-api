import { Router } from 'express';
const router = Router();
import winesController from '../controllers/winesController.js';

/**
 * @swagger
 * /api/wines:
 *   get:
 *     summary: Pobiera listę wszystkich win
 *     tags:
 *       - Wines
 *     responses:
 *       200:
 *         description: Lista win
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
 *                     example: Wine Merlot
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
 *                               example: "Wine of the Year"
 */
router.get('/', winesController.getAllWines);

/**
 * @swagger
 * /api/wines:
 *   post:
 *     summary: Tworzy nowe wino
 *     tags:
 *       - Wines
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Wine
 *               type:
 *                 type: string
 *                 example: Red
 *     responses:
 *       201:
 *         description: Wino zostało utworzone
 *       400:
 *         description: Niepoprawne dane wejściowe
 *       409:
 *         description: Wino już istnieje
 */
router.post('/', winesController.createWine);

/**
 * @swagger
 * /api/wines/{id}:
 *   get:
 *     summary: Pobiera szczegóły wina o podanym id
 *     tags:
 *       - Wines
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Szczegóły wina
 *       404:
 *         description: Wino nie znalezione
 */
router.get('/:id', winesController.getWineById);

/**
 * @swagger
 * /api/wines/{id}:
 *   put:
 *     summary: Aktualizuje dane wina o podanym id
 *     tags:
 *       - Wines
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
 *                 example: Updated Wine
 *               type:
 *                 type: string
 *                 example: White
 *     responses:
 *       200:
 *         description: Dane wina zostały zaktualizowane
 *       404:
 *         description: Wino nie znalezione
 */
router.put('/:id', winesController.updateWine);

/**
 * @swagger
 * /api/wines/{id}:
 *   patch:
 *     summary: Częściowo aktualizuje dane wina o podanym id
 *     tags:
 *       - Wines
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
 *                 example: Updated Wine
 *               type:
 *                 type: string
 *                 example: Sparkling
 *     responses:
 *       200:
 *         description: Dane wina zostały zaktualizowane
 *       404:
 *         description: Wino nie znalezione
 */
router.patch('/:id', winesController.partialUpdateWine);

/**
 * @swagger
 * /api/wines/{id}:
 *   delete:
 *     summary: Usuwa wino o podanym id
 *     tags:
 *       - Wines
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Wino zostało usunięte
 *       404:
 *         description: Wino nie znalezione
 */
router.delete('/:id', winesController.deleteWine);

export default router;

