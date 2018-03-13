// Dependencies

var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
var colors = require("colors");

// Variables
var itemChosen;
var quantityRemaining = 0;
var productSales = 0;
var subTotal = 0;
var custTotal = 0;

// Create connection to db

const connection = mysql.createConnection( {
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_db"
});

connection.connect( err => {
	if (err) throw err;
	start();
});

// Prints the items for sale and the details
function start() {
	connection.query("SELECT * FROM products;", function(err, res) {
		if (err) throw err;

		console.log("Welcome to Bamazon! Take a look at our products:".green);
		let table = new Table({
		    head: ["ID".green, "Product Name".green, "Price".green, "QTY: ".green],
		    colWidths: [ 10, 25, 10, 20 ]
		});
		for ( let i = 0; i < res.length; i++ ) {			
			table.push([ res[i].item_id, res[i].product_name, '$'+res[i].price, res[i].stock_quantity ]);
		} 
		console.log(table.toString());
		inquirer.prompt([
		{
			type: "input",
			name: "id",
			message: "What is the ID of the product you would like to purchase?",
			validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
		{
			type: "input",
			name: "quantity",
			message: "How many would you like to purchase?",
			validate: int => {
				if ( /\D/.test(int) || int <= 0 ) {
					console.log("Please enter a number greater than zero.".green)
					return false;
				} else {
					return true;
				}
			}
		}
		]).then( response => {
			itemChosen =  () => {
				for ( let i = 0; i < res.length; i++ ) {
					if ( res[i].item_id === parseInt( response.id ) ) {
						return res[i];
					} 
				}
				return "";
			};

			if ( response.quantity <= itemChosen().stock_quantity ) {
				quantityRemaining = itemChosen().stock_quantity - response.quantity;
				subTotal = response.quantity * itemChosen().price;
				custTotal += subTotal;
				productSales = itemChosen().product_sales += subTotal;
				updateStock();
			} else if ( response.quantity > itemChosen().stock_quantity ) {
				console.log("Sorry, there is not enough in stock!".green);
				buyMore();
			} else if ( itemChosen() === "" ) {
				console.log("The product ID does not match our product list.".green);
				buyMore();
			}
		});
	}); //end of mysql
} //end of function

// Asks if user would like to purchase another item
function buyMore() {
	inquirer.prompt([
	{
		type: "confirm",
		name: "tryAgain",
		message: "Purchase another item?",
		default: true
	}
	]).then( res => {
		if (res.tryAgain) {
			start();
		} else {
			console.log("Thank you for choosing Bamazon! See you again soon!".green);
			connection.end();
		}
	});
}

// Updates stock quantity and product sales
function updateStock() {
	connection.query("UPDATE products SET ? WHERE ?", 
		[{stock_quantity: quantityRemaining, product_sales: productSales }, {item_id: itemChosen().item_id}],
		 ( err, res ) => {
		 	if ( err ) throw err;
				console.log(`Your total is $${custTotal}.`.green);
				buyMore();
	});
}



