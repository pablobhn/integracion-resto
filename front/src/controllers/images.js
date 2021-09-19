const uploadImage = async function (image) {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'bmxof4c4');
  data.append('cloud_name', 'dtusu0lel');

  const response = await fetch('https://api.cloudinary.com/v1_1/dtusu0lel/image/upload', {
    method: 'post',
    body: data
  });

  return response.json();
};

export default uploadImage;
