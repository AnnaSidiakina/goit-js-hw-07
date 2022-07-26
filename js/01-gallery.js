import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);
const galleryList = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

// console.log(createGalleryMarkup(galleryItems));
function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

galleryList.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const source = event.target.dataset.source;
  const instance = basicLightbox.create(
    `
    <img src="${source}" width = "800" height = "600">`,
    {
      onShow: () => {
        document.addEventListener("keydown", onEscButton);
      },
      onClose: () => {
        document.removeEventListener("keydown", onEscButton);
      },
    }
  );
  instance.show();

  function onEscButton(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
