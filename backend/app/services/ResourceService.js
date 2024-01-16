const ResourceService = {
    parseData: (resource) => {
        return {
            _id: resource._id,
            title: resource.title,
            parent_id: resource.parent_id,
            is_dir: resource.is_dir,
            url: resource.url,
            preview: resource.preview,
            createdAt: resource.createdAt
        }
    }
}
module.exports = ResourceService