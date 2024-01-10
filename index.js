const items = document.querySelectorAll("#accordion li.accordion-item button");
// const arrow = document.querySelector(".d-arrow");

items.forEach(item => item.addEventListener('click', function () {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }

}));