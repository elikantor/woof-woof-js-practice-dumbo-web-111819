let dogBar = document.querySelector("#dog-bar")
let dogContainer = document.querySelector("#dog-info")
let dogFilter = document.getElementById("good-dog-filter")
let dogs = []
let filter = false
let dogUrl = "http://localhost:3000/pups"

function fetchDogs(){
    fetch(`${dogUrl}`)
        .then(r => r.json())
        .then(data => {
            dogs = data
            data.forEach(dog => {
                addDogs(dog)
            })
        })
}
    
function addDogs(dog){
    let span = document.createElement("span")
    span.innerText = dog.name
    dogBar.append(span)
    span.addEventListener("click",(e) => {
        addDog(dog)
    })
}

function addDog(dog) {
    dogContainer.innerHTML = ''
    let image = document.createElement("img")
    image.src = `${dog.image}`
    let h2 = document.createElement("h2")
    h2.innerText = dog.name
    let button = document.createElement("button")
    button.innerText = dog.isGoodDog? "Good Dog!" : "Bad Dog!"
    dogContainer.append(image, h2, button)

    button.addEventListener("click",(e) => {
        toggleDog(dog, button)
    })
}

function toggleDog(dog, button){
    dog.isGoodDog = !dog.isGoodDog
    fetch(`${dogUrl}/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog
        })
    })
    .then(r => r.json())
    .then(dog => {
        if(button.innerText === "Good Dog!"){
            button.innerText = "Bad Dog!"
        } else {button.innerText = "Good Dog!"}
    })
}

dogFilter.addEventListener("click",function(e){
    filter = !filter
    if(filter){
        dogFilter.innerText = "Filter good dogs: ON"
        dogBar.innerHTML = ''
        dogs.forEach(function(dog){
            if(dog.isGoodDog){ 
                addDogs(dog)
            } 
        })
    } else {
        dogFilter.innerText = "Filter good dogs: OFF"
        dogBar.innerHTML = ''
            fetchDogs()
    }
})
fetchDogs()