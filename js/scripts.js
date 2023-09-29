async function getEmployees(){
    try{
    const response = await fetch('https://randomuser.me/api/?nat=us&results=12')
    if(!response.ok) throw new Error('something went wrong')
    const data= await response.json();
    const employees= data.results;
    displayEmployees(employees);
    console.log(employees)
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
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>
        `;
        document.querySelector('.gallery').insertAdjacentHTML('beforeend', employeeHTML)
    });
}
getEmployees();
