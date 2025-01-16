import { Router } from 'express';
import whiskiesController from '../controllers/whiskiesController.js';
const router = Router();

/**
 * @swagger
 * /api/whiskies:
 *   get:
 *     summary: Pobiera listę wszystkich whisky
 *     tags:
 *       - Whiskies
 *     responses:
 *       200:
 *         description: Lista whisky
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
 *                     example: Whisky
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
 *                               example: "Best Whisky of the Year"
 */
router.get('/', whiskiesController.getAllWhiskies);

/**
 * @swagger
 * /api/whiskies:
 *   post:
 *     summary: Tworzy nową whisky
 *     tags:
 *       - Whiskies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Whisky
 *               type:
 *                 type: string
 *                 example: Single Malt
 *     responses:
 *       201:
 *         description: Whisky została utworzona
 *       400:
 *         description: Niepoprawne dane wejściowe
 *       409:
 *         description: Whisky już istnieje
 */
router.post('/', whiskiesController.createWhisky);

/**
 * @swagger
 * /api/whiskies/{id}:
 *   get:
 *     summary: Pobiera szczegóły whisky o podanym id
 *     tags:
 *       - Whiskies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Szczegóły whisky
 *       404:
 *         description: Whisky nie znaleziona
 */
router.get('/:id', whiskiesController.getWhiskyById);

/**
 * @swagger
 * /api/whiskies/{id}:
 *   put:
 *     summary: Aktualizuje dane whisky o podanym id
 *     tags:
 *       - Whiskies
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
 *                 example: Updated Whisky
 *               type:
 *                 type: string
 *                 example: Blended
 *     responses:
 *       200:
 *         description: Dane whisky zostały zaktualizowane
 *       404:
 *         description: Whisky nie znaleziona
 */
router.put('/:id', whiskiesController.updateWhisky);

/**
 * @swagger
 * /api/whiskies/{id}:
 *   patch:
 *     summary: Częściowo aktualizuje dane whisky o podanym id
 *     tags:
 *       - Whiskies
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
 *                 example: Updated Whisky
 *               type:
 *                 type: string
 *                 example: Cask Strength
 *     responses:
 *       200:
 *         description: Dane whisky zostały zaktualizowane
 *       404:
 *         description: Whisky nie znaleziona
 */
router.patch('/:id', whiskiesController.partialUpdateWhisky);

/**
 * @swagger
 * /api/whiskies/{id}:
 *   delete:
 *     summary: Usuwa whisky o podanym id
 *     tags:
 *       - Whiskies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Whisky została usunięta
 *       404:
 *         description: Whisky nie znaleziona
 */
router.delete('/:id', whiskiesController.deleteWhisky);

export default router;

