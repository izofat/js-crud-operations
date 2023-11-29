let listData = null;
window.onload = function () {
      getData()
};
async function getData() {
      await fetch('https://6565ad61eb8bb4b70ef21a9e.mockapi.io/crud', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
      })
            .then(result => {
                  if (result.ok) {
                        return result.json();
                  }
            }).then(data => {
                  listData = data;
                  showData()
            })
}
function showData() {
      var parentElement = document.getElementById('datatable');
      var secondChild = parentElement.children[1];
      while (secondChild) {
            parentElement.removeChild(secondChild);
            secondChild = parentElement.children[1];
      }
      /* 
      ! which one is profesional
      ?parentElement.innerHTML =  `
                        <tr >
                              <th class="container-datatable-th-id">
                                    ID
                              </th>
                              <th class="th">
                                    Name
                              </th>
                              <th class="container-datatable-th-age">
                                    Age
                              </th>
                              <th>
                                    City
                              </th>
                              <th>
                                    Actions
                              </th>
                        </tr> 
      `
      */

      for (let i = 0; i < listData.length; i++) {
            var childOlder = document.createElement('tr');
            for (let k = 0; k < 5; k++) {
                  var childYounger = document.createElement('td');
                  switch (k) {
                        case 0: {
                              childYounger.textContent = listData[i].id;
                              childYounger.classList.add('container-datatable-th-id');
                              break;
                        }
                        case 1: {
                              childYounger.textContent = listData[i].name;
                              break;
                        }
                        case 2: {
                              childYounger.textContent = listData[i].age;
                              childYounger.classList.add('container-datatable-th-id');
                              break;
                        }

                        case 3: {
                              childYounger.textContent = listData[i].city;
                              break;
                        }
                        case 4: {
                              var childBabyUpdate = document.createElement('button')
                              childBabyUpdate.addEventListener('click', function () {
                                    writeData(this)
                              })
                              childBabyUpdate.textContent = "Update";
                              childBabyUpdate.classList.add('container-datatablediv-button-update');
                              childYounger.appendChild(childBabyUpdate);
                              var childBabyDelete = document.createElement('button');
                              childBabyDelete.addEventListener('click', function () {
                                    deleteData(this);
                              })
                              childBabyDelete.textContent = "Delete";                              
                              childBabyDelete.classList.add('container-datatablediv-button-delete');
                              
                              childYounger.appendChild(childBabyDelete);
                              break;
                        }
                  }
                  childOlder.appendChild(childYounger);
            }
            parentElement.appendChild(childOlder);
      }
}
function writeData(element) {
      var row = element.closest('tr');
      var idInput = document.getElementById('idInput');
      var fullnameInput = document.getElementById('fullnameInput');
      var cityInput = document.getElementById('cityInput');
      var ageInput = document.getElementById('ageInput');
      idInput.value = row.cells[0].innerHTML.trim();
      fullnameInput.value = row.cells[1].innerHTML.trim();
      ageInput.value = row.cells[2].innerHTML.trim();
      cityInput.value = row.cells[3].innerHTML.trim();
}
async function deleteData(element) {
      var row = element.closest('tr');
      let idDataThatWillDelete = row.cells[0].innerHTML;
      let baseurl = 'https://6565ad61eb8bb4b70ef21a9e.mockapi.io/crud/'
      var urlnew = new URL(baseurl + idDataThatWillDelete)
      await fetch(urlnew, {
            method: 'DELETE',
      }).then(result => {
            if (result.ok) {
                  return result.json();
            }
      }
      ).then(task => {
            getData();
      })
}
function checkData() {
      var elementIdInput = document.getElementById('idInput');
      let id = elementIdInput.value.trim();
      var elementFullnameInput = document.getElementById('fullnameInput');
      let fullname = elementFullnameInput.value.trim();
      var elementCityInput = document.getElementById('cityInput');
      let city = elementCityInput.value.trim();
      var elementAgeInput = document.getElementById('ageInput');
      let age = elementAgeInput.value.trim();
      if (id == "" || fullname == "" || city == "" || age == "") {
            alert('Fill the empty spaces');
      }
      else if (listData.some(obj => obj.id == id)) {
            updateData(id, fullname, age, city);
      }
      else {
            addData(id, fullname, age, city);
      }
}

async function addData(newId, newName, newAge, newCity) {
      let newData = {
            city: newCity,
            name: newName,
            age: newAge,
            id: newId,
      }
      await fetch('https://6565ad61eb8bb4b70ef21a9e.mockapi.io/crud', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newData),
      }).then(result => {
            if (result.ok) {
                  return result.json();
            }
      }).then(task => {
            getData();
            clearInputValues();
      })

}
async function updateData(id, newName, newAge, newCity) {
      let newData = {
            city: newCity,
            name: newName,
            age: newAge,
      }
      let link = new URL('https://6565ad61eb8bb4b70ef21a9e.mockapi.io/crud/' + id);
      await fetch(link, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newData),
      }).then(result => {
            if (result.ok) {
                  return result.json();
            };
      }).then(task => {
            getData();
            clearInputValues();
      });

}

function clearInputValues() {
      var elementIdInput = document.getElementById('idInput');
      elementIdInput.value = "";
      var elementFullnameInput = document.getElementById('fullnameInput');
      elementFullnameInput.value = "";
      var elementCityInput = document.getElementById('cityInput');
      elementCityInput.value = "";
      var elementAgeInput = document.getElementById('ageInput');
      elementAgeInput.value = "";
}