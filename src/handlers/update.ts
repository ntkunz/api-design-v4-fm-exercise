import prisma from "../db";

export const getUpdates = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});
	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);
	res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id,
		},
	});
	res.json({ data: update });
};

export const createUpdate = async (req, res) => {
   // const {productId, ...rest} = req.body;
	const product = await prisma.product.findUnique({
		where: {
			id: req.body.productId
		},
	});

	if (!product) {
		//does not belong to user
		res.status(403).json({ error: "Product does not belong to user" });
	}

	const update = await prisma.update.create({
		data: {
         title: req.body.title,
         body: req.body.body,
         product: {connect: {id: product.id}}
      }
	});
   res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
   const products = await prisma.product.findMany({
      where: {
         belongsToId: req.body.productId,
      },
      include: {
         updates: true,
      },
   })

   const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
   }, []);

   const match = updates.find((update) => update.id === req.params.id);

   if (!match) {
      res.status(403).json({ error: "Update does not belong to user" });
   }

   const updated = await prisma.update.update({
      where: {
         id: req.params.id,
      },
      data: req.body
   })
   res.json({ data: updated });
};

export const deleteUpdate = async (req, res) => {
   const products = await prisma.product.findMany({
      where: {
         belongsToId: req.body.productId,
      },
      include: {
         updates: true,
      },
   })

   const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
   }, []);

   const match = updates.find((update) => update.id === req.params.id);

   if (!match) {
      res.status(403).json({ error: "Update does not belong to user" });
   }

   const deleted = await prisma.update.delete({
      where: {
         id: req.params.id
      }
   })
   res.json({ data: deleted });
};
