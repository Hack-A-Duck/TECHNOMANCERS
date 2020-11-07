const cloudinary = require('cloudinary');
cloudinary.config({
cloud_name: 'hrrweuqdq',
api_key: '897422611662845',
api_secret: 'Gg_Ykrn4Xh1qH6Dz7FkYe-VMCqU'
});

exports.uploads = (file, blog_id) =>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) =>{
            resolve({url: result.url, id: result.public_id, blog_id})
        }, {resource_type: "auto"}) 
    })
}