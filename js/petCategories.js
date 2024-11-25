// load petCategories
const petCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
}
// display petCategories
const displayCategories = (categories) => {
    // console.log(categories);

    // using loop to show the categories individually
    categories.forEach(item => {
        const individualCategory = item.category;
        console.log(individualCategory);
        loadCategoriesByName(individualCategory);
    })

}


// petCategories();

// load pet categories by name
const loadCategoriesByName = (id) => {
    document.getElementById("spinner").classList.remove("hidden");
    setTimeout(() => {
   
        document.getElementById("spinner").classList.add("hidden");

        fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
            .then(res => res.json())
            .then(data => {
                removeActiveClass();
                const activeBtn = document.getElementById(id);
                activeBtn.classList.add('active');
                displayPets(data.data);
            })
            .catch(error => {
                console.error("Error fetching category:", error);
            });
    }, 2000); 
};
// loadCategoriesByName();

// load all pets
const loadPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayPets(data.pets));
}

const displayPets = (pets) => {
    const petContainer = document.getElementById('pet-card-container');
    petContainer.innerHTML = "";
    // console.log(pets);

    if (pets.length == 0) {
        petContainer.classList.remove('grid');
        petContainer.classList.remove('border');
        petContainer.classList.add('bg-slate-100');
        petContainer.innerHTML =
            `
            <div class="flex flex-col justify-center items-center py-10 space-y-5 ">
                <img src="images/error.webp"/>
                <h3 class="font-extrabold text-4xl text-center"> No Information Available </h3>
                <p class="text-center text-base text-slate-500"> 
                    It is a long established fact that a reader will be distracted by the   readable content of a page when looking at 
                    <br>its layout. The point of using Lorem Ipsum is that it has a.
                </p>
            </div>
        `;
    }
    else {
        petContainer.classList.add('grid');
        petContainer.classList.add('border');
        petContainer.classList.remove('bg-slate-100');
    }
    pets.forEach(pet => {
        // console.log(pet);
        // const petPrice = pet.price;
        // sortByPrice(petPrice);
        // petContainer.innerHTML = "";

        const card = document.createElement('div');
        card.classList = "card card-compact border";
        // card.innerHTML = "";
        card.innerHTML =
            `
            <figure class=" h-[200px]" >
                <img
                    src=${pet.image}
                alt="" class="p-3 rounded-3xl h-full w-full object-cover block" id="pet-img"/>
            </figure>
            <div class="card-body">
                <h2 class="card-title mb-4">${pet.pet_name}</h2>

                <div class="flex gap-2 items-center text-slate-500">
                    <img src="https://img.icons8.com/?size=24&id=82774&format=png" width="17px" height="17px" class="opacity-60"/>
                    <p> Breed: ${pet.breed == undefined ? "Breed not found" : pet.breed} </p>
                </div>

                <div class="flex gap-2 items-center text-slate-500">
                    <img src="https://img.icons8.com/?size=80&id=p3I8pPJtlpYD&format=png" width="17px" height="17px" />
                    <p> Birth: ${pet.date_of_birth == null || pet.date_of_birth == undefined ? "DOB not found" : pet.date_of_birth} </p>
                </div>

                <div class="flex gap-2 items-center text-slate-500">
                    <img src="https://img.icons8.com/?size=64&id=66022&format=png" width="17px" height="17px" class="opacity-80"/>
                    <p> Gender: ${pet.gender == undefined ? "Gender not found" : pet.gender} </p>
                </div>

                <div class="flex gap-2 items-center text-slate-500">
                    <img src="https://img.icons8.com/?size=48&id=7Q33A458BSsj&format=png" width="17px" height="17px" class="opacity-70"/>
                    <p> Price: ${pet.price == null ? " free" : pet.price} $ </p>
                    
                </div>

                <div class="card-actions justify-between items-center">
                    <div class="mt-3 px-4 py-2 border rounded-xl cursor-pointer" onclick="likeBtn('${pet.image}')">
                        <img src="https://img.icons8.com/?size=80&id=114011&format=png" width="25px" height="25px"/> 
                    </div>

                    <div class="mt-3 px-4 py-2 border rounded-xl cursor-pointer">
                        <p class="text-teal-700 font-bold text-lg" onclick="startCountdown()"> Adopt </p>
                    </div>

                    <div class="mt-3 px-4 py-2 border rounded-xl cursor-pointer" onclick="loadDetails(${pet.petId})">
                        <p class="text-teal-700 font-bold text-lg"> Details </p>
                    </div>
                    
                </div>
            </div>
        `
        petContainer.append(card);

    })

};
loadPets();


// load and display pet details by id section

// load details by id
const loadDetails = async (petDetails) => {
    console.log(petDetails);
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petDetails}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPetDetails(data.petData);
};

const displayPetDetails = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById('modal-Content');
    detailsContainer.innerHTML = `
        <figure class=" h-[250px]" >
            <img src="${details.image}" class="rounded-xl h-full w-full object-cover block"/>
        </figure>
        <div class="my-3 felx"> 
            <h2 class="card-title text-2xl font-bold">${details.pet_name}</h2>
             <div class="space-y-1"> 
                
                <div class="flex gap-2 items-center text-slate-500 text-sm"">
                    <img src="https://img.icons8.com/?size=24&id=82774&format=png" width="17px" height="17px" class="opacity-60"/>
                    <p> Breed: ${details.breed == undefined ? "Breed not found" : details.breed} </p>
                </div>

                 <div class="flex gap-2 items-center text-slate-500 text-sm"">
                    <img src="https://img.icons8.com/?size=64&id=66022&format=png" width="17px" height="17px" class="opacity-80"/>
                    <p> Gender: ${details.gender == undefined ? "Gender not found" : details.gender} </p>
                </div>

                 <div class="flex gap-2 items-center text-slate-500 text-sm">
                    <img src="https://img.icons8.com/?size=80&id=t1FSygsBnceW&format=png" width="18px" height="18px" class="opacity-80"/>
                    <p class="text-base"> Vaccinated status: ${details.vaccinated_status == undefined ? "Not found" : details.vaccinated_status} </p>
                </div>
               
            </div>
            

            <div class="space-y-1">

                <div class="flex gap-2 items-center text-slate-500 text-sm"">
                    <img src="https://img.icons8.com/?size=80&id=p3I8pPJtlpYD&format=png" width="17px" height="17px" />
                    <p> Birth: ${details.date_of_birth == null || details.date_of_birth == undefined ? "DOB not found" : details.date_of_birth} </p>
                </div>

                 <div class="flex gap-2 items-center text-slate-500 text-sm"">
                    <img src="https://img.icons8.com/?size=48&id=7Q33A458BSsj&format=png" width="17px" height="17px" class="opacity-70"/>
                    <p> Price: ${details.price == null ? " free" : details.price} $ </p>
                    
                </div>

            <div> 
        </div>


        <br>
        <div class="mt-4">
            <hr class="w-full">  
        </div>
        <br>  

    <div class="mt-8 w-full">

        <h3 class="font-bold text-lg"> Details Information </h3>
        <p class="font-normal text-sm text-slate-500 text-justify">${details.pet_details == null ? "No Description found" : details.pet_details}</p>
    </div>

    `;


    document.getElementById('showModalData').click();
};

// Sort By price functionality
const sortButton = document.getElementById("sortPriceBtn");

sortButton.addEventListener("click", () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            const sortedPets = data.pets.sort((a, b) => (b.price || 0) - (a.price || 0)); // 
            displayPets(sortedPets);
        })
        
});

