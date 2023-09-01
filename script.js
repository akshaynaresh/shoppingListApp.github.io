import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
	databaseURL: "https://playground-56a3b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "ShoppingList")

const inputField = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
let myCart = []
const cartEl = document.getElementById("cart-el")

onValue(shoppingListInDB, function(snapshot) {
	if(snapshot.exists()) {
		let shoppingList = Object.entries(snapshot.val())
		clearCartEl()
		for(let i = 0; i < shoppingList.length; i++) {
			let currentItem = shoppingList[i]
			let currentItemID = currentItem[0]
			let currentItemValue = currentItem[1]
			addToMyCart(currentItem)
		}
	}
	else {
		cartEl.innerHTML = "No items here...yet"
	}
})

// function for adding and showing items in the cart
function addToMyCart(item) {
	// cartEl.innerHTML += `<li>${shoppingItems}</li>`
	let itemID = item[0]
	let itemValue = item[1]
	let newEl = document.createElement("li")
	newEl.textContent = itemValue

	newEl.addEventListener("dblclick", function() {
		let itemsExactLocation = ref(database, `ShoppingList/${itemID}`)
		remove(itemsExactLocation)
	})

	cartEl.append(newEl)
}

// function for clearing the input field 
function clearInputFieldEl() {
	inputField.value = ""
}

function clearCartEl() {
	cartEl.innerHTML = ""
}

// main function to be executed upon clicking the add button
addBtn.addEventListener("click", function() {
	let inputValue = inputField.value
	push(shoppingListInDB, inputValue)
	// myCart.push(inputValue)
	clearInputFieldEl()
	// addToMyCart(myCart)
})