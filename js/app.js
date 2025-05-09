//fetch categories
const loadCategories = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
  const data = await res.json();
  const categories = document.getElementById("categories");

  data.categories.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button 
        class="category-btn btn px-8 rounded-[25px] border border-gray-500 flex items-center gap-2"
        data-category="${item.category.toLowerCase()}"
      >
        <img src="${item.category_icon}" class="w-9" alt="">${item.category}
      </button>
    `;
    categories.appendChild(div);
  });

  // Attach click listeners after buttons are added
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const selectedCategory = btn.dataset.category;

      // Remove active class from all buttons
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active-btn"));

      // Add active class to current button
      btn.classList.add("active-btn");

      // Load pets by selected category
      loadAllPets(selectedCategory);
    });
  });
};
//load all pets data
const loadAllPets = async (category = '') => {
    const url = category
      ? `https://openapi.programming-hero.com/api/peddy/category/${category.toLowerCase()}`
      : `https://openapi.programming-hero.com/api/peddy/pets`;
  
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
  
    const petsContainer = document.getElementById("pets-container");
   
    if(url == "https://openapi.programming-hero.com/api/peddy/pets"){
      data.pets.forEach((pet) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <div class="card card-compact border border-gray-200 p-4">
            <figure>
              <img src="${pet.image}" alt="${pet.pet_name}" class="h-[170px] object-cover rounded-lg w-full" />
            </figure>
            <div class="py-4 px-1.5">
              <h2 class="card-title">${pet.pet_name}</h2>
              <p class="text-gray-500">Breed : ${pet.breed || 'Unknown Breed'}</p>
              <p class="text-gray-500">Birth : ${pet.date_of_birth || 'Not Available'}</p>
              <p class="text-gray-500">Gender : ${pet.gender || 'Not Specified'}</p>
              <p class="mb-4 text-gray-500">Price : ${pet.price} $</p>
              <hr>
              <div class="card-actions justify-between mt-4">
                <button onclick="likedBtn('${pet.image}')" class="btn bg-white hover:bg-[#0E7A81] hover:text-white"><i class="fa-solid fa-thumbs-up"></i></button>
                <button onclick="startAdoption(this)" class="btn bg-white text-[#0E7A81] font-bold hover:bg-[#0E7A81] hover:text-white">Adopt</button>
                <button onclick="loadVideoDetails('${pet.petId}')" class="btn bg-white text-[#0E7A81] font-bold hover:bg-[#0E7A81] hover:text-white">Details</button>

              </div>
            </div>
          </div>
        `;
        petsContainer.appendChild(div);
      });
    }
  
   
  else{
    petsContainer.innerHTML = "";
    if(!data.data.length)
    {
      const div = document.createElement("div");
      petsContainer.classList.remove("grid");
      div.classList.add("flex", "flex-col", "justify-center", "items-center","py-5","bg-gray-100");
      
      div.innerHTML= `
       
            <img src="images/error.webp" class="text-center" alt="">
            <p class="text-2xl font-extrabold text-black text-center">No Data Here!!!Please Visits Others Button...</p>
        
      `
      petsContainer.appendChild(div);
      
      return;
      
      
    }
    petsContainer.classList.add("grid");
    data.data.forEach((pet) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card card-compact border border-gray-200 p-4">
          <figure>
            <img src="${pet.image}" alt="${pet.pet_name}" class="h-[170px] object-cover rounded-lg w-full" />
          </figure>
          <div class="py-4 px-1.5">
            <h2 class="card-title">${pet.pet_name}</h2>
            <p class="text-gray-500">Breed : ${pet.breed}</p>
            <p class="text-gray-500">Birth : ${pet.date_of_birth || 'Not Available'}</p>

            <p class="text-gray-500">Gender : ${pet.gender || 'Not Specified'}</p>
            <p class="mb-4 text-gray-500">Price : ${pet.price} $</p>
            <hr>
            <div class="card-actions justify-between mt-4">
              <button onclick="likedBtn('${pet.image}')" class="btn bg-white hover:bg-[#0E7A81] hover:text-white"><i class="fa-solid fa-thumbs-up"></i></button>
              <button class="btn bg-white text-[#0E7A81] font-bold hover:bg-[#0E7A81] hover:text-white">Adopt</button>
              <button onclick="loadVideoDetails('${pet.petId}')" class="btn bg-white text-[#0E7A81] font-bold hover:bg-[#0E7A81] hover:text-white">Details</button>
            </div>
          </div>
        </div>
      `;
      petsContainer.appendChild(div);
    });
  }
    
  };

  
  
  
  
 
// Event listener for the "Sort By Price" button
document.getElementById("sort-btn").addEventListener("click", () => {
  loadAllPets('', true); // Trigger sorting by price (descending order)
});

  const loadVideoDetails = async(videoId) =>
    {
      
      const url = `https://openapi.programming-hero.com/api/peddy/pet/${videoId}`;
      const res = await fetch(url);
      const data = await res.json();
      displayDetails(data.petData);
    }
    const displayDetails =(pet)=>
      {
        // console.log(video)
        const detailsContainer = document.getElementById('modal-content');
      
        // way-1 
        // document.getElementById("showModal").click();
        // way-2
        document.getElementById("customModal").showModal();
        // add inner html 
        detailsContainer.innerHTML=`
       
          <figure>
            <img src="${pet.image}" alt="${pet.pet_name}" class="object-cover rounded-lg w-full" />
          </figure>
          <div class="py-4 px-1.5">
            <h2 class="card-title">${pet.pet_name}</h2>
            <p class="text-gray-500">Breed : ${pet.breed}</p>
            <p class="text-gray-500">Birth : ${pet.date_of_birth}</p>
            <p class="text-gray-500">Gender : ${pet.gender}</p>
            <p class="text-gray-500">Price : ${pet.price} $</p>
            <p class="mb-4 text-gray-500">Vaccine : ${pet.vaccinated_status}</p>
            <hr>
            <h2 class="text-lg font-bold">Details Information </h2>
            <p>${pet.pet_details}</p>
          </div>
        </div>
        `
      }

  const likedBtn= (image)=>{
    const liked = document.getElementById("liked");
    const div = document.createElement('div');
    div.classList.add("border","border-gray-200","p-2","rounded-lg","h-[95px]", "pb-0")
    div.innerHTML =`
    <img src=${image} class="rounded-lg mt-0"/>
    `
    liked.appendChild(div);
  }
  const loadPetDetails =(item)=>{
    console.log(item);
  }
 

    

  
  
loadCategories()
loadAllPets()