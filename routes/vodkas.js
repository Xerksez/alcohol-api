import { Router } from 'express';
import vodkasController from '../controllers/vodkasController.js';
const router = Router();

/**
 * @swagger
 * /api/vodkas:
 *   get:
 *     summary: Pobiera listę wszystkich wódek
 *     tags:
 *       - Vodkas
 *     responses:
 *       200:
 *         description: Lista wódek
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
 *                     example: Vodka
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
 *                               example: "Best Vodka of the Year"
 */
router.get('/', vodkasController.getAllVodkas);

/**
 * @swagger
 * /api/vodkas:
 *   post:
 *     summary: Tworzy nową wódkę
 *     tags:
 *       - Vodkas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Vodka
 *               type:
 *                 type: string
 *                 example: Premium
 *     responses:
 *       201:
 *         description: Wódka została utworzona
 *       400:
 *         description: Niepoprawne dane wejściowe
 *       409:
 *         description: Wódka już istnieje
 */
router.post('/', vodkasController.createVodka);

/**
 * @swagger
 * /api/vodkas/{id}:
 *   get:
 *     summary: Pobiera szczegóły wódki o podanym id
 *     tags:
 *       - Vodkas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Szczegóły wódki
 *       404:
 *         description: Wódka nie znaleziona
 */
router.get('/:id', vodkasController.getVodkaById);

/**
 * @swagger
 * /api/vodkas/{id}:
 *   put:
 *     summary: Aktualizuje dane wódki o podanym id
 *     tags:
 *       - Vodkas
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
 *                 example: Updated Vodka
 *               type:
 *                 type: string
 *                 example: Super Premium
 *     responses:
 *       200:
 *         description: Dane wódki zostały zaktualizowane
 *       404:
 *         description: Wódka nie znaleziona
 */
router.put('/:id', vodkasController.updateVodka);

/**
 * @swagger
 * /api/vodkas/{id}:
 *   patch:
 *     summary: Częściowo aktualizuje dane wódki o podanym id
 *     tags:
 *       - Vodkas
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
 *                 example: Updated Vodka
 *               type:
 *                 type: string
 *                 example: Ultra Premium
 *     responses:
 *       200:
 *         description: Dane wódki zostały zaktualizowane
 *       404:
 *         description: Wódka nie znaleziona
 */
router.patch('/:id', vodkasController.partialUpdateVodka);

/**
 * @swagger
 * /api/vodkas/{id}:
 *   delete:
 *     summary: Usuwa wódkę o podanym id
 *     tags:
 *       - Vodkas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Wódka została usunięta
 *       404:
 *         description: Wódka nie znaleziona
 */
router.delete('/:id', vodkasController.deleteVodka);

export default router;

