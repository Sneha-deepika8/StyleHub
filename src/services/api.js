/**
 * API Service
 * ============
 * Handles all data fetching for the application.
 * Currently simulates an API call with local data, but can be easily switched
 * to a real backend (e.g., Node.js, Firebase, FakeStoreAPI).
 */

import productsData from "../data";

// Simulate network delay to mimic real API
const API_DELAY = 800;

/**
 * Fetch all products
 * Returns a Promise that resolves with the product list
 */
export async function fetchProducts() {
  // SIMULATION: In a real app, this would be:
  // const response = await fetch('https://api.yourbackend.com/products');
  // return await response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData);
    }, API_DELAY);
  });
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = productsData.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, API_DELAY);
  });
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = productsData.filter(p => p.category === category);
      resolve(filtered);
    }, API_DELAY);
  });
}
