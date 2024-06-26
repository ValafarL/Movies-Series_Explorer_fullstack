const Media = require('../models/Media')

const getAllMedia = async (req,res)=>{
    const allMedia = await Media.find({createdBy:req.user.userId});
    console.log(allMedia)
    res.status(200).json(allMedia)
}
const getOne = async (req,res)=>{
    const {media_TMDB_ID, createdBy} = req.body
    const media = await Media.findOne({createdBy, media_TMDB_ID});
    console.log(media)
    res.status(200).json(media)
}

const addMedia = async (req, res) => {
    const { media_TMDB_ID} = req.body
    const createdBy = req.user.userId;
    const alreadyAdd = await Media.findOne({ media_TMDB_ID, createdBy});
    if(alreadyAdd){
        console.log("AREALDY ADD")
        return res.status(400).json({msg: 'media already add'})
    }
    console.log("ADICIONADO")
    req.body.createdBy = createdBy;
    const media = await Media.create(req.body);
    res.status(201).json(media)
}
const updateMedia = async (req, res)=>{
    req.body.createdBy = req.user.userId;
    const { createdBy, media_TMDB_ID } = req.body
    const media = await Media.findOneAndUpdate(
        {createdBy, media_TMDB_ID}, 
        req.body.updates,
        {new: true})
    console.log('UPDATEd')
    console.log(req.body)
    res.status(200).json(media)
}
const removeMedia = async(req,res)=>{
    const media_TMDB_ID = req.params.id
    const createdBy = req.user.userId
    console.log('deleted mediaID ', media_TMDB_ID)
    console.log('deleted mediaID ', createdBy)
    const deleteResponse = await Media.deleteOne({media_TMDB_ID, createdBy})
    res.status(200).json({deleted: true}).send()
}

module.exports = { getAllMedia,
    getOne,
    addMedia,
    removeMedia,
    updateMedia
}