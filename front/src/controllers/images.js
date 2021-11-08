const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const cloudPreset = process.env.REACT_APP_CLOUDINARY_PRESET;

const uploadImage = async function (image) {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', cloudPreset);
  data.append('cloud_name', cloudName);

  console.log(cloudName, cloudPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'post',
    body: data,
  });

  return response.json();
};

export default uploadImage;
