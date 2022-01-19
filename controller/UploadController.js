const { cloudinary } = require("../util/cloudinary");

module.exports.upload_img_post = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const type = req.body.type;
        let preset = type === "post" ? "findmeow_posts" : "findmeow_users";

        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: preset,
        });

        console.log(uploadResponse);
        res.status(200).json(uploadResponse);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "404",
            message: "Something Went Wrong",
            error: err,
        });
    }
};
