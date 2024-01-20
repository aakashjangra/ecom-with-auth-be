import prisma from '../modules/db'

//Get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    }, 
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [])

  res.json({data: updates});
}

//Get unique update
export const getOneUpdate = async (req, res) => {

  const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      }, 
    });

  res.json({data: update});
}

// Create a new update
export const createUpdate = async (req, res) => {

  console.log(req.user.id)

  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId
    }, 
  })

  if(!product) {
    res.status(400)
    res.json({message: "Product not found"})
    return
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {connect: product}
    }
  })

  res.json({data: update});
}

//Update a update
export const updateUpdate = async (req, res) => {

    const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    }, 
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [])

  const match = updates.find((update) => update.id === req.params.id);

  if(!match){
    res.status(400)
    res.json({message: "Can't find update with matching id"})
    return
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    }, 
    data: req.body, 
  })

  res.json({data: updatedUpdate})
}

//Delete a update
export const deleteUpdate = async (req, res) => {

  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    }, 
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [])

  const match = updates.find((update) => update.id === req.params.id);

  if(!match){
    res.status(400)
    res.json({message: "Can't find update with matching id"})
    return
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({data: deletedUpdate})
}