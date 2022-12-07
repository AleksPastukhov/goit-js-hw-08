import { galleryItems } from "./gallery-items";

const galleryBox = document.querySelector(".gallery");
const galleryMarkap = createGaleryMarkup(galleryItems);

galleryBox.insertAdjacentHTML("beforeend", galleryMarkap);

function createGaleryMarkup(galleryItems) {
  return galleryItems
    .map(
      (image) => `
    <a class="gallery__item" href="${image.original}">
      <img class="gallery__image" src="${image.preview}" alt="${image.description}" 
 />
    </a>
`
    )
    .join("");
}
