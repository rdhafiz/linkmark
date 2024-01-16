const Joi = require('joi');
const Validator = require('../helpers/validator');
const ResourceModel = require('../model/Resource');
const ResourceService = require('../services/ResourceService');
const { getLinkPreview } = require("link-preview-js");

const ProfileController = {

    all: async (req, res) => {
        try {
            const userId = req.body.auth.id;
            const parent_id = req.query.parent_id ?? "0";
            const page = req.query.page ?? 1;
            const limit = req.query.limit ?? 10;
            const skip = (page - 1) * limit;
            const resources = await ResourceModel.find(
                {user_id: userId, parent_id: parent_id},
                [],
                {skip: skip, limit: limit}
            ).sort({'is_dir': 'desc', 'title': 'asc'}).exec();

            let rv = [];
            for (const r of resources) {
                const resource = ResourceService.parseData(r)
                resource['files'] = await ResourceModel.countDocuments({user_id: userId, is_dir: 0, parent_id: resource._id.toString()}).exec();
                resource['folders'] = await ResourceModel.countDocuments({user_id: userId, is_dir: 1, parent_id: resource._id.toString()}).exec();
                rv.push(resource);
            }

            res.status(200).json({data: rv});
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    create: async (req, res) => {
        try {
            const schema = Joi.object({
                title: Joi.string().min(3).required(),
                parent_id: Joi.string().alphanum().required(),
                url: Joi.string().uri(),
                auth: Joi.required(),
            });
            const validator = await schema.validate(req.body);
            if (validator.error !== undefined) {
                return res.status(400).json(Validator.parseError(validator.error));
            }

            const userId = req.body.auth.id;
            const is_dir = req.body.url !== undefined && req.body.url !== '' ? 0 : 1;
            let preview = null;
            if (is_dir === 0) {
                const checkUrl = await ResourceModel.findOne({url: req.body.url, user_id: userId}).exec();
                if (checkUrl != null) {
                    return res.status(400).json({url: "Url has already been saved."});
                }
                preview = await getLinkPreview(req.body.url);
                console.log(preview);
            }
            const resource = await ResourceModel.create({
                user_id: userId,
                title: req.body.title,
                parent_id: req.body.parent_id,
                is_dir: is_dir,
                url: req.body.url ?? null,
                preview: preview
            })

            // Returning a 200 OK response with user data and the generated access token
            res.status(200).json({data: resource});
        } catch (error) {
            // Handling any unexpected errors and returning a 500 Internal Server Error response
            res.status(500).send(error.message);
        }
    },

    update: async (req, res) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                title: Joi.string().min(3).required(),
                parent_id: Joi.string().alphanum().required(),
                auth: Joi.required(),
            });
            const validator = await schema.validate(req.body);
            if (validator.error !== undefined) {
                return res.status(400).json(Validator.parseError(validator.error));
            }

            const userId = req.body.auth.id;
            const resource = await ResourceModel.findOne({user_id: userId, _id: req.body.id}).exec();
            if (resource == null) {
                return res.status(400).json({error: "Invalid Request"});
            }
            await ResourceModel.updateOne({user_id: userId, _id: req.body.id}, {title: req.body.title, parent_id: req.body.parent_id});

            res.status(200).json({msg: "Resource has been updated."});
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const schema = Joi.object({
                auth: Joi.required(),
            });
            const validator = await schema.validate(req.body);
            if (validator.error !== undefined) {
                return res.status(400).json(Validator.parseError(validator.error));
            }

            const userId = req.body.auth.id;
            const id = req.params.id;
            await ResourceModel.deleteOne({user_id: userId, _id: id});

            res.status(200).json({msg: "Resource has been deleted."});
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

};

// Exporting the authentication controller object for use in other modules
module.exports = ProfileController;
