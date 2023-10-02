
document.body.style.backgroundImage = "url('https://fiberc.com/wp-content/uploads/Company-Facts-Background.png')"; //adds backgroung image to the body of the page. 
const container= document.querySelector('.gallery')
const searchContainer= document.querySelector('.search-container')
let employees= []; //creates an array for employees. 

const searchHTML = ` 
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>

`;
searchContainer.insertAdjacentHTML('afterend',searchHTML) 
const searchForm= document.querySelector('form');
const searchBar= document.getElementById("search-input") 
const searchButton= document.getElementById("search-submit") 

async function getEmployees(){ //function for fetching users from api.
    try{
    const response = await fetch('https://randomuser.me/api/?nat=us&results=12')
    if(!response.ok) throw new Error('something went wrong')
    const data= await response.json();
    employees.push(...data.results);
    for(let i = 0; i < employees.length; i++){ // looping through employees for each ind employee card.
        employeeCard(employees[i], i)
    }
    indCard(employees) //calling each card with the employees arrays. 
    }catch(error){
        console.log(error)
    }
}
function employeeCard(employee, index){ //displays each employee info and adds an index to each. 
        const employeeHTML= `
            <div class="card" data-index=${index}>
                <div class="card-img-container">
                    <img class="card-img" src=${employee.picture.large} alt="profile picture">
                </div>
                <div class="card-info-container" data-name=${employee.name.first}>
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>
        `;
     container.insertAdjacentHTML('beforeend', employeeHTML)
       searchEmployee() // call search function. 
}

function indCard(employees){ // creates a card for each employee displayed and adds event listener to call for employeeModal function when each employee is clicked.
    const employeeCard= container.querySelectorAll('.card')
       employeeCard.forEach((card, index) => {
        card.addEventListener('click', ()=> {
                const employeeData= employees[index]
                employeeModal(employeeData, index)
            })
       });
}

function employeeModal(employee, index){ // function with html for each employee modal.
    let  dob= new Date(employee.dob.date);   
    let formatted = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`; 
    const modalHTML= `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${employee.picture.large} alt=${employee.name.first} picture>
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}., ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${formatted}</p>
            </div>
        </div>
            <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>

    </div> `; 
    container.insertAdjacentHTML('afterend', modalHTML)
    closeModal()  // calls function to even listener to close modal 
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.addEventListener('click', e => { //event listener to add a way to toddle over the employee modals and clicked through them using Next and Prev buttons. 
      if (e.target.id === 'modal-next') {
        if (index !== employees.length - 1) {
          index += 1;
          document.body.removeChild(modalContainer);
          employeeModal(employees[index], index);
        }
      }
      if (e.target.id === 'modal-prev') {
        if (index !== 0) {
          index -= 1;
          document.body.removeChild(modalContainer);
          employeeModal(employees[index], index);
        }
      }
    });

}
function searchEmployee(){ //search for employees by name using keyup on event listener.
    searchForm.addEventListener('keyup', (e) =>{
        const searchInput= searchBar.value.toUpperCase(); 
        const employeeName= document.querySelectorAll('.card-name')
        employeeName.forEach(employee => {
            if (employee.textContent.toUpperCase().includes(searchInput)){
                employee.parentNode.parentNode.style.display = "flex";
            }else{
                employee.parentNode.parentNode.style.display = "none";
            }
        })  
        searchButton.onclick= () => { //once the search button is clicked it goes back to a value of an empty string.
        searchBar.value= '';
        }
    })
}
function closeModal(){ // function to close modal but clicking on the close button.
    const closeButton= document.querySelectorAll('.modal-close-btn')
    closeButton.forEach(button => {
        button.addEventListener('click', () => {
        const modalContainer= document.querySelector('.modal-container')
        if(modalContainer){
            modalContainer.remove();
        }
        })
    })
}
getEmployees();