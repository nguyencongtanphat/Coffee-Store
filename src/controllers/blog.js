const blogModel = require('../models/blog')
const blogParagraphModel = require('../models/blogParagraph')
const paragraphModel = require('../models/paragraph')

const blogController = {
    create: async (req, res, next) => {
        try{
            const blogReq = {
                title: req.body.Title,
                date: req.body.Date,
                description: req.body.Description,
                conclusion: req.body.Conclusion,
                image: req.body.TitleImage,
                content: req.body.Content // array
            }
    
            // Create Blog
            const newBlog = await blogModel.create({
                Title: blogReq.title,
                Date: blogReq.date,
                Description: blogReq.description,
                Conclusion: blogReq.conclusion,
                TitleImage: blogReq.image
            })
            if(!newBlog){
                throw "Create blog error"
            }
            const newBlogID = newBlog.getDataValue('id')
            // Map Content
            await Promise.all(
                blogReq.content.map(async (part) => {
                    // Create Part
                    let newPart = await blogParagraphModel.create({
                        Title: part.Title,
                        Image: part.Image,
                        ImageCaption: part.ImageCaption,
                        ImagePosition: part.ImagePosition ?? 1,
                        blogID: newBlogID
                    })
                    if(!newPart){
                        throw "Create Part Error"
                    }
                    let newPartID = newPart.getDataValue('id')

                    // Create paragraphs 
                    let paragraphArr = []
                    part.Paragraphs.map((para) => {
                        let paraObject = {
                            Content: para,
                            BlogParagraphID: newPartID
                        }
                        paragraphArr.push(paraObject)
                    })

                    await paragraphModel.bulkCreate(paragraphArr)
                })
            )

            return res.status(200).json({
                message: "Create Success",
                data: newBlog
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },

    getAllBlogs: async (req, res, next) => {
        try{
            const blogs = await blogModel.findAll({
                order: [ ['createdAt', 'DESC' ]]
            })
            if(!blogs){
                throw "Get Blogs Error"
            }

            return res.status(200).json({
                message: "Get Blogs Success",
                data: blogs
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
        
    },

    getNewestBlogs: async (req, res, next) => {
        try{
            const blogDB = await blogModel.findOne({
                order: [ ['createdAt', 'DESC' ]]
            })

            const blogParagraphsDB = await blogParagraphModel.findAll({
                where: {
                    blogID: blogDB.getDataValue('id')
                }
            })
            if(!blogParagraphsDB)
                throw "Blog Paragraph Error"
            
            let contentRes = []
            await Promise.all(
                blogParagraphsDB.map(async (part) => {
                    let partID = part.getDataValue('id')
                    let paragraphsDB = await paragraphModel.findAll({
                        where: {
                            BlogParagraphID: partID
                        },
                        attributes: ['Content']
                    })
                    let partRes = {
                        ...part.toJSON(),
                        Paragraphs: paragraphsDB
                    }

                    contentRes.push(partRes)
                })
            )

            return res.status(200).json({
                message: "Get Blog By ID",
                data: {
                    ...blogDB.toJSON(),
                    Content: contentRes
                }
            })
        
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },

    getBlogByID: async (req, res, next) => {
        try{
            const idReq = req.params.id
            const blogDB = await blogModel.findByPk(idReq)
            if(!blogDB) 
                throw "Blog ID invalid"

            const blogParagraphsDB = await blogParagraphModel.findAll({
                where: {
                    blogID: idReq
                }
            })
            if(!blogParagraphsDB)
                throw "Blog Paragraph Error"
            
            let contentRes = []
            await Promise.all(
                blogParagraphsDB.map(async (part) => {
                    let partID = part.getDataValue('id')
                    let paragraphsDB = await paragraphModel.findAll({
                        where: {
                            BlogParagraphID: partID
                        },
                        attributes: ['Content']
                    })
                    let partRes = {
                        ...part.toJSON(),
                        Paragraphs: paragraphsDB
                    }

                    contentRes.push(partRes)
                })
            )

            return res.status(200).json({
                message: "Get Blog By ID",
                data: {
                    ...blogDB.toJSON(),
                    Content: contentRes
                }
            })
        
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
        
    }
}

module.exports = blogController