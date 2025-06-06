import faqsModel from '../models/faqs.js';

//creo un array de funciones vacias

const faqsController = {};

//select
faqsController.getAllFaqs = async(req,res) => {

    try {

        const faqs = await faqsModel.find()
        res.status(200).json(faqs)

    } catch (error) {
        console.log("error" + error)
        res.status(500).json("Internal server error")
    }
}

//insert
faqsController.insertFaqs = async (req,res) => {

    const { question, answer, level, isActive } = req.body;

    try {

        if(!question || !answer || !level || !isActive){
            return res.status(400).json({message: "Empty fields"})
        }

        if(level < 1 || level > 10){
            return res.status(400).json({message: "Enter a number between 1 to 10"})
        }

        if(question.leght < 4 || answer.leght < 4){
            return res.status(400).json({message: "Too short"})
        }

        const newFaqs = new faqsModel({
            question,
            answer,
            level,
            isActive,
        })

        newFaqs.save();
        
    } catch (error) {
        console.log("error" + error)
        res.status(500).json({message: "Internal server error"})
    }

}

faqsController.updateFaqs = async (req,res) => {

    const { question, answer, level, isActive } = req.body;
    try {

        if(level < 1 || level > 10){
            return res.status(400).json({message: "Enter a number between 1 to 10"})
        }

        if(question.leght < 4 || answer.leght < 4){
            return res.status(400).json({message: "Too short"})
        }

        const updatedFaqs = await faqsModel.findByIdAndUpdate(
            req.params.id, {
            question,
            answer,
            level,
            isActive,
        }, {new: true})

        if(!updatedFaqs) {
            return res.status(400).json({message: "FAQ not found"})
        }

        res.status(200).json({message: "FAQ updated successfully", updatedFaqs})
        
    } catch (error) {

        console.log("error" + error)
        res.status(500).json({message: "Internal server error"})
        
    }
}

//eliminar

faqsController.deleteFaqs = async (req,res) => {

    try {

        const deletedFaqs = await faqsModel.findByIdAndDelete(req.params.id)

        if(!deletedFaqs) {
            return res.status(400).json({message: "FAQ not found"})
        }

        res.status(200).json({message: "FAQ deleted successfully", deletedFaqs})

    } catch (error) {
        console.log("error" + error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default faqsController;