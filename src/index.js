
let dogBarDiv = document.querySelector("#dog-bar")
let dogInfo = document.querySelector("#dog-info")
let dogFilterBtn = document.querySelector("#good-dog-filter")
let dogArray = []
fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(dogs => {
    dogs.forEach(singlePup => {
        dogArray.push(singlePup)
        // debugger
        turnToHTML(singlePup)
    });
})

function turnToHTML(singlePup){ 
    let spanName = document.createElement("span")
    spanName.innerText = singlePup.name 
    dogBarDiv.append(spanName)
   
 spanName.addEventListener("click", (evt) => {
        dogInfo.innerText = ""
         let newDogDiv = document.createElement("div")
        let dogImage = document.createElement('img')
        dogImage.src = singlePup.image

        let dogH2 = document.createElement("h2")
        dogH2.innerText= singlePup.name

        let dogButton = document.createElement('button')
            singlePup.isGoodDog ? dogButton.innerText = 'Good Dog!': dogButton.innerText = 'Bad Dog!'
            
            dogInfo.append(dogImage, dogH2, dogButton)
            
            dogButton.addEventListener("click", evt => {
                // changes the object locally 
                singlePup.isGoodDog ? singlePup.isGoodDog = false : singlePup.isGoodDog = true

                fetch(`http://localhost:3000/pups/${singlePup.id}`, {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        // changes the object in the backend
                        isGoodDog: singlePup.isGoodDog
                    })
                })
                .then(res => res.json())
                // updates the innertext 
                .then(updatedIsGoodBoy => updatedIsGoodBoy.isGoodDog ? dogButton.innerText = 'Good Dog!' : dogButton.innerText = "Bad Dog!")
            })
        })
    }
dogFilterBtn.addEventListener("click", (evt)=>{
    dogBarDiv.innerText = ""
    // dogFilterBtn.innerText == "Filter good dogs: OFF" ? dogFilterBtn.innerText ="Filter good dogs: ON" : dogFilterBtn.innerText == "Filter good dogs: OFF"
    if (dogFilterBtn.innerText.includes("OFF")){
        dogFilterBtn.innerText = "Filter good dogs: ON"
       dogArray.forEach((pup)=> {
           if(pup.isGoodDog){
               turnToHTML(pup)
           }
       })
    }else{
        dogFilterBtn.innerText = 'Filter good dogs: OFF'
        dogArray.forEach((pup) => turnToHTML(pup))
    }

})
