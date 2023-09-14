const images = ["0.jpg","1.jpg","2.jpg","3.jpg"];
const chooseImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");
bgImage.style.width = '100%';
bgImage.style.height = '800px';
bgImage.src = `resource/${chooseImage}`;
document.body.appendChild(bgImage);