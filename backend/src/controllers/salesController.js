import salesModel from '../models/sales.js';

const salesController = {}


salesController.salesByCategory = async (req, res) => {
    try {

        const result = await salesModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalSales: { $sum: "$total" },
                    totalCount: { $sum: 1 }
                }
            },
            //ordenar
            {
                $sort: { totalSales: -1 } // Ordenar por total de ventas de mayor a menor
            }
        ]);
        res.status(200).json(result);

    } catch (error) {
        
        console.error("Error fetching sales by category:", error);
        res.status(500).json({ error: "Internal server error" });

    }
}

salesController.bestSellingProducts = async (req, res) => {
    try {
        const result = await salesModel.aggregate([
            {
                $group: {
                    _id: "$product",
                    totalCount: { $sum: 1 }
                }
            },
            //ordenar
            {
                $sort: { totalCount: -1 } // Ordenar por total de ventas de mayor a menor
            },
            //limitar la cantidad de datos a mostrar
            {
                $limit: 5 // Limitar a los 10 productos más vendidos
            }
        ]);
        
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching best selling products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

salesController.frecuentCustomers = async (req, res) => {

    try {
        const result = await salesModel.aggregate([
            {
                $group: {
                    _id: "$customer",
                    totalPurcharse: { $sum: 1 }
                }
            },
            //ordenar
            {
                $sort: { totalCount: -1 } // Ordenar por total de ventas de mayor a menor
            },
            //limitar la cantidad de datos a mostrar
            {
                $limit: 3 // Limitar a los 3 clientes más frecuentes
            }
        ]);
        
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching frequent customers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

salesController.totalEarnings = async (req, res) => {

    try {
        const result = await salesModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: "$total" }
                }
            }
        ]);
        
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching total earnings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

salesController.insertSales = async (req, res) => {


    try {
       /* const { product, category, customer, total, date } = req.body;*/
const newSale = new salesModel(req.body);

        await newSale.save();
        res.status(200).json({ message: "Sale created successfully" });
    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default salesController;