let box = document.querySelector('.container');
let addBtn = document.querySelector('.plus');
let form = document.querySelector('form');
let submitbtn = document.querySelector('.submit');
let element = document.querySelector('input');
let sortEl = document.querySelector('.SortingList');
let sortBtn = document.querySelector('.sortBtn');
let searchBtn = document.querySelector('.Searchbtn');
let backBtn = document.querySelector('.BackBtn');
let searching = document.querySelector('.Search');
let inputSearching = document.querySelector('.inputSearch');

addBtn.addEventListener('click', function () {
    form.style.display = 'block';
    document.querySelector('.Searchbtn').style.top = '18vh';
    document.querySelector('.sortBtn').style.top = '18vh';
    document.querySelector('.BackBtn').classList.add('backBtn');
    element.value = ' ';

})

var Lists = [];
const DisplayArray = function (a) {
    let items = " ";
    for (let i = 0; i < a.length; i++) {
        items = `<li style="list-style:none">${a[i]}</li>`
    }
    return items;
}

let dateObj = new Date();
const createEl = function (a) {

    let el = document.createElement('div');
    let el2 = document.createElement('button');
    let el3 = document.createElement('button');
    let el4 = document.createElement('div');
    el2.innerText = 'Delete';
    el3.innerText = 'Done';
    el.innerHTML = a;
    el4.innerHTML = `${dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
    el.classList.add('styleDiv');
    el2.classList.add('DeleteBtn');
    el4.classList.add('DateTime');
    el3.classList.add('DoneBtn');
    box.insertAdjacentElement('beforebegin', el);
    el.insertAdjacentElement('beforeend', el2);
    el.insertAdjacentElement('beforeend', el3);
    el.insertAdjacentElement('afterbegin', el4);

    // Delete Button
    el2.addEventListener('click', function (e) {
        Lists.pop();
        localStorage.removeItem(Lists.pop());
        el.style.display = 'none';
    })
    //  Done Button
    el3.addEventListener('click', function () {
        el3.innerText = 'Completed✔';
        el3.style.width = '75px';
        el3.style.backgroundColor = 'whitesmoke';
        el3.style.fontSize = '17px';
    })

    // Searchi Bar for searching
    document.querySelector('.inputSearch').addEventListener('focus', function () {

        el.style.display = 'none';
        box.style.display = 'none';
        document.querySelector('.BackBtn').classList.add('BackBtnFocus');

    })

    // Back button
    document.querySelector('.BackBtn').addEventListener('click', function () {
        el.style.display = 'block';
        box.style.display = 'block';
        document.querySelector('.find-out-form').style.display = 'none';
    })

}

// Sorting the List
sortBtn.addEventListener('click', function () {
    let sort = Lists.sort();
    let sortedList = Lists.sort(function (a, b) { return a - b });
    let reverseSort = sortedList.reverse();
    reverseSort.forEach(ele => {
        box.style.display = 'none';
        document.querySelector(".Searchbtn").style.display = 'block';
        let eleBox = document.createElement('div');
        eleBox.innerHTML = `${ele} <br> <div style="font-size:15px">${dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<div>`
        sortBtn.insertAdjacentElement('afterend', eleBox);
        sortBtn.classList.add('sortBtnfocus');
        searchBtn.classList.add('Searchbtnfocus');
        backBtn.classList.add('BackBtnsort')
        eleBox.classList.add('findEl');
        backBtn.addEventListener('click', function () {
            eleBox.style.display = 'none';
            backBtn.style.position = 'relative';
            backBtn.style.top = '110px';
            backBtn.style.left = '33vw';
        })
    })
})

// Search button
searchBtn.addEventListener('click', function () {
    document.querySelector('.find-out-form').style.display = 'block'
})

searching.addEventListener('click', function (e) {
    if (Lists.toString().includes(inputSearching.value) == true) {
        let findEl = document.createElement('div');
        findEl.innerHTML = `${inputSearching.value} <br> <div style="font-size:15px">
        ${dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<div>`
        searching.insertAdjacentElement('afterend', findEl);
        backBtn.insertAdjacentElement('afterend', findEl);
        findEl.classList.add('findEl');
        backBtn.addEventListener('click', function () {
            findEl.style.display = 'none';
        })
    }
    else if (Lists.toString().includes(inputSearching.value) == false) {
        alert(`${inputSearching.value} Not Found!`);
    }
    inputSearching.value = ' ';

})

// To add the item in List
submitbtn.addEventListener('click', function (e) {
    Lists.push(element.value);
    let string = JSON.stringify(Lists);
    localStorage.setItem('Lists', string);
    let storedList = JSON.parse(localStorage.getItem('Lists'));
    if (!storedList) return;
    Lists = storedList;
    console.log(storedList);
    createEl(DisplayArray(Lists))
    form.style.display = 'none';
})


