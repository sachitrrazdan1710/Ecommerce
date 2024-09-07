const { default: slugify } = require("slugify")
const CategoryModel = require("../models/CategoryModel")

const createCategoryController = async(req,res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({message:'Name is required'})
        }
        const existingCategory = await CategoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category already exists'
        });
        }

        const category = await new CategoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new category created',
            category
        })

        
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:"error in category"
        })
    }
}

//update category
const updateCategoryController = async (req,res) =>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating category'
            
        })
    }
}

//get all category
const getcategoryController = async (req,res) =>{
    try {
        const category = await CategoryModel.find({})
        res.status(200).send({
            success:true,
            messsage:"All categories list",
            category,
        });
        
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success:false,
            error,message:'Error while getting all categories'
        })
    }
}

//single category controller

const singleCategoryController = async (req,res) =>{
    try {
        const category = await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get single category successfully',
            category,
        });
                
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting Single Category'
        })
    }
}

//delete category
const deleteCategoryController = async (req,res) =>{
    try {
        const {id} = req.params
        await CategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Category deleted successfully',
        })
    
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:'Error while deleting category'
        })
    }
}



module.exports = {createCategoryController,updateCategoryController,getcategoryController,singleCategoryController,deleteCategoryController};
