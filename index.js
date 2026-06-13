import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "Api key",
    authDomain: "expenses-tracker-47e14.firebaseapp.com",
    projectId: "expenses-tracker-47e14",
    storageBucket: "expenses-tracker-47e14.firebasestorage.app",
    messagingSenderId: "864949932673",
    appId: "1:864949932673:web:0e38e5ad72eb527c78f380"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.addExpense = async function () {

    const name =
        document.getElementById("expenseName").value;

    const amount =
        document.getElementById("amount").value;

    const category =
        document.getElementById("category").value;

    if (!name || !amount) {
        document.getElementById("message").innerText =
            "Please fill all fields";
        return;
    }

    try {

        await addDoc(
            collection(db, "expenses"),
            {
                name: name,
                amount: Number(amount),
                category: category,
                createdAt: new Date()
            }
        );

        document.getElementById("message").innerText =
            "Expense Saved Successfully!";

        document.getElementById("expenseName").value = "";
        document.getElementById("amount").value = "";

        loadExpenses();

    } catch (error) {

        document.getElementById("message").innerText =
            error.message;

        console.log(error);
    }
};

async function loadExpenses() {

    const querySnapshot =
        await getDocs(collection(db, "expenses"));

    let table =
        document.getElementById("expenseTable");

    table.innerHTML = "";

    let total = 0;

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        total += Number(data.amount);

        table.innerHTML += `
        <tr>
            <td>${data.name}</td>
            <td>₹${data.amount}</td>
            <td>${data.category}</td>
            <td>${expense.date}</td>
        </tr>
        `;
    });

    document.getElementById("totalExpenses").innerText =
        `Total Expenses: ₹${total}`;
}

const expense = {
    name,
    amount,
    category,
    date: new Date().toLocaleString()
};

loadExpenses();