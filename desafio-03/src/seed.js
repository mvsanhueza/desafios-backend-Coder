import { Product, ProductManager } from "./clases.js";

const productManager = new ProductManager('./products.txt');

const p1 = await productManager.addProduct(new Product("Escuadra", "Escuadra de 30cm", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", "123456", 10));
const p2 = await productManager.addProduct(new Product("Calculadora", "Calculadora científica", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", "234567", 5));
const p3 = await productManager.addProduct(new Product("Globo Terráqueo", "Globo terráqueo", 345.67, "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png", "345678", 5));
const p4 = await productManager.addProduct(new Product("Mochila", "Mochila escolar", 456.78, "https://cdn3.iconfinder.com/data/icons/education-209/64/school-bookbag-rucksack-256.png", "456789", 5));
const p5 = await productManager.addProduct(new Product("Lápiz", "Lápiz de grafito", 567.89, "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-ruler-stationary-school-256.png", "567890", 5));
const p6 = await productManager.addProduct(new Product("Libreta", "Libreta de 100 hojas", 678.90, "https://cdn3.iconfinder.com/data/icons/education-209/64/notebook-stationary-school-book-binder-256.png", "678901", 5));
const p7 = await productManager.addProduct(new Product("Borrador", "Borrador escolar", 789.01, "https://cdn3.iconfinder.com/data/icons/education-209/64/gum-rubber-eraser-stationary-school-256.png", "789012", 5));
const p8 = await productManager.addProduct(new Product("Regla", "Regla de 30cm", 890.12, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", "890123", 5));
const p9 = await productManager.addProduct(new Product("Cuaderno", "Cuaderno de 100 hojas", 901.23, "https://cdn3.iconfinder.com/data/icons/education-209/64/notebook-stationary-school-book-binder-256.png", "901234", 5));
const p10 = await productManager.addProduct(new Product("Lapiz","Lapiz pasta", 600, "No imagen","12308",8));