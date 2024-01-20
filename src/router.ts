import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { UPDATE_STATUS } from '@prisma/client';
import { createProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

// Product 

router.get('/product', getProducts)

router.get('/product/:id', body('id').isString(), handleInputErrors, getOneProduct)

router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)

router.post('/product', [body('name').isString()], handleInputErrors, createProduct)

router.delete('/product/:id', (req, res) => {

  res.json({message: 'got through validation'})
})

// Update 

router.get('/update' , handleInputErrors, getUpdates)

router.get('/update/:id', handleInputErrors, getOneUpdate)

router.put('/update/:id', 
  [
    body('title').isString().optional(), 
    body('body').isString().optional(), 
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(), 
    body('version').isString().optional()
  ],
  updateUpdate  
)

router.post('/update', 
  [
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    body('productId').exists().isString(), 
  ],
  handleInputErrors, 
  createUpdate  
)

router.delete('/update/:id', deleteUpdate)

// Update Points

router.get('/updatepoint' , () => {})
router.get('/updatepoint/:id', [body('id').isString()], handleInputErrors, (req, res) => {

  res.json({message: 'got through validation'})
})

router.post('/updatepoint', [body('name').isString(), body('description').isString(), body('updateId').exists().isString()], handleInputErrors, (req, res) => {

  res.json({message: 'got through validation'})
})

router.put('/updatepoint/:id', [body('name').optional().isString(), body('description').optional().isString()], handleInputErrors, (req, res) => {

  res.json({message: 'got through validation'})
})

router.delete('/updatepoint/:id', (req, res) => {

  res.json({message: 'got through validation'})
})

router.use((err, req, res, next) => {
  console.log(err)
  res.status(400).json({message: 'in router handler'})
})

export default router