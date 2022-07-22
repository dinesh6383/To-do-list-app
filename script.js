const bodyEl = document.querySelector('body')
const inputEl = document.querySelector('.input-box');
const addBtnEl = document.querySelector('.add-icon');
const foodItemsEl = document.querySelector('.food-items');
const foodListEl = document.querySelector('#food-list img');
const emptyMsg = document.querySelector('#food-list h2');
const messageEl = document.querySelector('#message');
const deleteIconEl = document.getElementsByClassName('fa-trash-can');
const infoEl = document.querySelector('.information')
const hambIconEl = document.querySelector('.hamburger');
const cancelEl = document.querySelector('.cancel');
const profileEl = document.querySelector('.profile');
const aboutEl = document.querySelector('.about');
const firstNameEl = document.querySelector('.first-name input');
const lastNameEl = document.querySelector('.last-name input');
const maleEl = document.querySelector('#male');
const femaleEl = document.querySelector('#female');
const saveBtnEl = document.querySelector('.save-btn');
const userNameEl = document.getElementById('username');
const userImg = document.querySelector('.user-greet img');
const taskIntimate = document.querySelector('.user-greet p');

//Adding event listener on click to the add button.
//Meanwhile the value user has entered gets appended to the list.
addBtnEl.addEventListener('click',(e)=>{
    //If the input value is greater than 1 then it should call the function..
    if(inputEl.value != ''){
        storeValues(inputEl.value);
        updateList(inputEl.value);
        intimation();
    }
})

//Enter event linstner..
inputEl.addEventListener("keyup",(e)=>{
    if(e.code == 'Enter'){
    //If the input value is greater than 1 then it should call the function..
        if(inputEl.value != ''){
            storeValues(inputEl.value);
            updateList(inputEl.value);
            intimation();
        } 
    }
})

//This function Capitalize the first letter that user gives..
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Function used to update the list after clicking the add btn.
const updateList = (workType) => {
    //creating the new li & i tag..
    let newEl = document.createElement('li');
    let iconEl = document.createElement('i');

    //Adding some classes and inner Text to the created tags..
    newEl.innerText = capitalize(workType);
    iconEl.className = 'fa-regular fa-trash-can';
    iconEl.setAttribute('onclick','remove(event)')

    //Append the newEl tags to ul tag and i tag to the newEl tag..
    newEl.appendChild(iconEl)
    foodItemsEl.appendChild(newEl)

    //Show the sucessufully added message..
    messageEl.classList.add('animation-msg');
    messageEl.innerText = `Sucessfully added!`
    setTimeout(()=>{
    messageEl.classList.remove('animation-msg');
    },1000)

    //Empty the input box.After the content gets appended.
    inputEl.value = '';  
    
    //Remove image child..
    foodListEl.style.display = 'none';
    emptyMsg.style.display = 'none';
}

// Deleting functionality. The recycle icon delete the item that the
// user doesn't need or completed that kinda wrk.
// On clicking that the the targeted parentElemnent should be removed.

function remove(e){
    //Taking the parent node and removing it..
    e.path[1].remove();

    //Deleted message..
    messageEl.innerText = 'Sucessfully deleted!'
    messageEl.classList.add('deleted');
    messageEl.classList.add('animation-msg');
    setTimeout(()=>{
        messageEl.classList.remove('deleted');
        messageEl.classList.remove('animation-msg');
    },1000)

    if(foodItemsEl.childElementCount == 0){
        foodListEl.style.display = 'block';
        emptyMsg.style.display = 'block';
    }
    //Store the data into a fetches variable.
    //on delete the list the value (becomes = '') which indicates
    //that there is no value. Meanwhile it is the machine understood
    //this is the one i needs to splice..
    let fetches = [...JSON.parse(localStorage.getItem('to-do'))];
    fetches.forEach((res) => {
        if(res.todo == e.path[1].innerText){
            fetches.splice(fetches.indexOf(res),1);
        }
    });
    //Reassinging the local storage after splicing performs..
    localStorage.setItem('to-do',JSON.stringify(fetches));
    //On deleting the list the initmation needs to be called.
    //Meanwhile task count allocates..
    intimation();

}

//Hamburger click/toggle functionality.
hambIconEl.addEventListener('click',()=>{
    infoEl.classList.add('show');

})
cancelEl.addEventListener('click',()=>{
    infoEl.classList.remove('show');
})

//Save button in the modal..
//On clicking the save button in the modal the User in the header
//section needs to be changed to the user entered firstname.
//The gender images too needs to be changed acordingly to the 
//gender info given by the user.

saveBtnEl.addEventListener('click',()=>{
    userNameEl.innerText = capitalize(firstNameEl.value)
    if(maleEl.checked == true){
        userImg.src = 'assets/man.png';
        storedInfo(userNameEl.innerText , maleEl.value);
    }
    else if(femaleEl.checked == true){
        userImg.src = 'assets/woman.png';
        storedInfo(userNameEl.innerText , femaleEl.value);
    }
})

//Store values function is used to store the datas into our local machine.
//We can use localStorage.getItem and .setItem to retrive and store data.

const storeValues = (data) => {
    let myData = capitalize(data);
    localStorage.setItem('to-do',JSON.stringify([...JSON.parse(localStorage.getItem('to-do') || '[]'), {todo: myData}]));

}

//On loading the dom content the value stored in Local storage get assigned
//automatically.It avoids loss of data..
document.addEventListener('DOMContentLoaded',()=>{
    let storedData = [...JSON.parse(localStorage.getItem('to-do'))];
    storedData.forEach((works)=>{
         //creating the new li & i tag..
    let newEl = document.createElement('li');
    let iconEl = document.createElement('i');

    //Adding some classes and inner Text to the created tags..
    newEl.innerText = works.todo;
    iconEl.className = 'fa-regular fa-trash-can';
    iconEl.setAttribute('onclick','remove(event)')

    //Append the newEl tags to ul tag and i tag to the newEl tag..
    newEl.appendChild(iconEl);
    foodItemsEl.appendChild(newEl);

    //Empty the input box.After the content gets appended.
    inputEl.value = '';  
    
    //Remove image child..
    foodListEl.style.display = 'none';
    emptyMsg.style.display = 'none';
    })
    //On document load the intimation needs to be called..
    //Why beacause the tasks number sets accordingly.
    intimation();
    //Assigning the name to local storage and getting it.
    userNameEl.innerText = localStorage.getItem('name');
    //Assigning the image to local storage and getting it.
    let img = localStorage.getItem('photo');
    if(img == 'male'){
        userImg.src = 'assets/man.png';
    }
    else if(img == 'female'){
        userImg.src = 'assets/woman.png';
    }

})

//This function intimates the user. How many tasks left..
const intimation = () => {
    let storedData = [...JSON.parse(localStorage.getItem('to-do'))];
    taskIntimate.innerText = `You have ${storedData.length} tasks left..`
}

//This function is used to save the user's info into the local machine;
const storedInfo = (uname , sexuality) => {
    localStorage.setItem('name', uname);
    localStorage.setItem('photo',sexuality);
}

