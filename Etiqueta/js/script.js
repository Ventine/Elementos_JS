let tags = [];

const inputTagContainer = document.querySelector("#input-tag");
const TagsContainer = document.createElement("div");
const inputTag = document.createElement("span");

inputTag.ariaRoleDescription = "textbox";
inputTag.contentEditable = "true";
inputTag.classList.add("input");
inputTag.focus();

inputTagContainer.classList.add("input-tag-container");
TagsContainer.classList.add("tag-container");

inputTagContainer.appendChild(TagsContainer);
TagsContainer.appendChild(inputTag);

inputTagContainer.addEventListener("click", e => {
  if(e.target.id === "input-tag" || e.target.classList.contains("tag-container")){
    inputTag.focus();
  }
}); 

inputTag.addEventListener('keydown', e => {
  if(e.key === ' ' && inputTag.textContent != ''){
    e.preventDefault();
      if (!existTag(inputTag.textContent)) {
        tags.push(inputTag.textContent);
        inputTag.textContent = '';
        renderTags();
  }
      }else if( e.key === "Backspace" &&
                inputTag.textContent === "" &&
                tags.length > 0){
        tags.pop();
        renderTags();
  }
    
});
 
function renderTags(){
  TagsContainer.innerHTML = "";
  const html = tags.map(tag => {
    const tagElement = document.createElement('div');
    const tagbutton = document.createElement('button');

    tagElement.classList.add('tag-item');
    tagbutton.textContent = 'x';
    tagbutton.addEventListener('click', e => {
      removeTag(tag);
    });
    tagElement.appendChild(document.createTextNode(tag));
    tagElement.appendChild(tagbutton);
    return tagElement;
  });

  html.forEach(element => {
    TagsContainer.appendChild(element);
  });
  TagsContainer.appendChild(inputTag);
  inputTag.focus();
}

function existTag (value){
  return tags.includes(value);
}

function removeTag(value){
  tags = tags.filter(tag => tag  != value);
  renderTags();
}
