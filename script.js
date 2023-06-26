let imageURL;
let filesofImage;

function handleUpload() {
  const fileInput = document.getElementById('filePicker');
  const image = fileInput.files[0];
  filesofImage =image;
  
  const formData = new FormData();
  formData.append('image_file', image);
  formData.append('size', 'auto');

  const apikey = 'DbwzjEJHoGuN2T7xudZ2Dqpo';

  fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': apikey,
    },
    body: formData
  })
    .then(function(response) {
      return response.blob();
    })
    .then(function(blob) {
      const url = URL.createObjectURL(blob);
      imageURL = url;

      const img = document.createElement('img');
      img.src = url;
      img.style.width = '300px';
      img.style.height = '300px';

      const imageContainer = document.querySelector('.imagecontainer');
      imageContainer.innerHTML = ''; // Clear previous image
      imageContainer.appendChild(img);

      successMessage();
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}

function successMessage() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
          <div>${message}</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
  
      alertPlaceholder.innerHTML = ''; // Clear previous alert
      alertPlaceholder.appendChild(wrapper);
    };
  
    appendAlert('Congrats!! Your image is successfully uploaded.', 'success');
 

}

function downloadFile() {
  const anchorelement = document.createElement('a');
  anchorelement.href = imageURL;
  anchorelement.download = 'Removed-background.png';

  document.body.appendChild(anchorelement);
  anchorelement.click();

  document.body.removeChild(anchorelement);
  downloadMsg();
}

function downloadMsg(){
    
        const alertPlaceholder = document.getElementById('downloadAlert');
    
        const appendAlert = (message, type) => {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible" role="alert">
              <div>${message}</div>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
      
          alertPlaceholder.innerHTML = ''; // Clear previous alert
          alertPlaceholder.appendChild(wrapper);
        };
      
        appendAlert('Your File is being Downloaded', 'info');
     
}
