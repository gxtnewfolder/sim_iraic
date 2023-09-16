const Dataset = require('../models/Data');
const fs = require('fs');

exports.read =  async (req, res) => {
    try {
        // code
        const id = req.params.id;
        const Dataseted = await Dataset.findOne({ _id: id }).exec();
        res.send(Dataseted);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const Dataseted = await Dataset.find({}).exec();
        res.send(Dataseted);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.create = async (req, res) => {
    try {
        // code
        var data = req.body;
        if (req.file) {
            data.file = req.file.filename;
        }
        const Dataseted = await Dataset(data).save();
        console.log(Dataseted);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.update = async (req, res) => {
    try {
        // code
        const id = req.params.id;
        var newData = req.body;
        if (typeof req.file !== 'undefined') {
            newData.file = req.file.filename
            await fs.unlink('./uploads/' + newData.fileold, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit success')
                }
            })
        }
        const updated = await Dataset
            .findOneAndUpdate({ _id: id }, newData, { new: true })
            .exec()
        res.send(updated)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.remove = async (req, res) => {
    try {
        // code
        const id = req.params.id;
        const removed = await Dataset.findOneAndDelete({ _id: id }).exec();
        if(removed?.file){
            await fs.unlinkSync('./uploads/' + removed.file, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File removed');
                }
            });
        }

        res.send(removed);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}
