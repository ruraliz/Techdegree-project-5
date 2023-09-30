
const body= document.querySelector('body')
const container= document.querySelector('.gallery')
const searchContainer= document.querySelector('.search-container')
let employees= [];
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
async function getEmployees(){
    try{
    const response = await fetch('https://randomuser.me/api/?nat=us&results=12')
    if(!response.ok) throw new Error('something went wrong')
    const data= await response.json();
    const employees= data.results;
    displayEmployees(employees);
    // searchEmployees(employees);
    }catch(error){
        console.log(error)
    }
}
function displayEmployees(employees){
    employees.map(employee => {
        const employeeHTML= `
            <div class="card">
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
       const employeeCard= document.querySelector('.card')
        employeeCard.addEventListener('click', (e)=> {
            const card= e.target.closest('.card-info-container');
            if(!card) return;
            const employeeName= card.dataset.name;
            const employee= employees.find(
                (employee) => employee.name.first === employeeName
            );
            employeeModal(employee);
        });
        searchForm.addEventListener('keyup', (e) =>{
            const searchInput= searchBar.value.toUpperCase(); 
            const employeeName= document.querySelectorAll('.card-name')
            employeeName.forEach(employee => {
                // const name= `${employee.name.first} ${employee.name.last}`;
                if (employee.textContent.toUpperCase().includes(searchInput)){
                    employee.parentNode.parentNode.style.display = "flex";
                }else{
                    employee.parentNode.parentNode.style.display = "none";
                }
            })  
            searchButton.onclick= () => { //once the search button is clicked it goes back to a value of an empty string
            searchBar.value= '';
            }
        })
    });
}
getEmployees();

function employeeModal(employee){
    let  dob= new Date(employee.dob.date); // My date of birth    
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

    </div>    `; 
    const modals= document.querySelectorAll('.modal-container')
    container.insertAdjacentHTML('afterend', modalHTML)
    modals.forEach(modal => {
        modal.style.display= "none";
    })
    const closeButton= document.querySelectorAll('.modal-close-btn')
    closeButton.forEach(button => 
        button.addEventListener('click', () => {
            console.log('clicked')
        const modalContainer= document.querySelector('.modal-container')
        if(modalContainer){
            modalContainer.remove();
        }
        })
    )
}
