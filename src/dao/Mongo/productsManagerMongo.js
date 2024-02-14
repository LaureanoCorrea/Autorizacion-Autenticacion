import productModel from "../models/products.model.js"

class ProductManagerMongo {
    async getProducts(){
        return await productModel.find({})
    }

    async getProduct(pid){
        return await productModel.findOne({_id: pid})
    }
    
    async createProducts(newProduct){
        return await productModel.create(newProduct)
    }
    
    async updateProduct(pid){
        return await productModel.updateOne({_id: pid})
    }
    
    async deleteProduct(pid){
        return await productModel.deleteOne({_id: pid})
    }
