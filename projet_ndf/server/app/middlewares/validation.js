module.exports = (req, res, next) => {
    if (typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
        return res.status(400).json({
            errors: 'problem with sending data'
        })
    }
    //console.log('cool',req.body.name)
    let userId = req.body.userId
    let name = req.body.name
    let image = req.file.path
    let montant = req.body.montant
    //console.log('cool',req.body.montant)
    //console.log('cool',req.file)

    if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "file not support"
        })
    }

    if (req.file.size > 1024 * 1024) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "File is Too large"
        })
    }
    console.log('cool',req.file)

    if (!name || !image  ) {

        return res.status(400).json({
            sucess: false,
            message: "all fields are required"
        })
    }

    next()
}