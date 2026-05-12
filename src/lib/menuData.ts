// Generated local menu data from user-provided JSON
// This file is auto-created to display the provided menu on the frontend.

export const USE_LOCAL_MENU = true;

const RAW = {
  "restaurant": "High Spirits Indian Restaurant",
  "menu": [
    {"category":"Entrees","items":[{"name":"Papadums (5 pieces)","price":4.99},{"name":"Tandoori Samosa","price":7.99},{"name":"Veg Pakora","price":7.99},{"name":"Onion Bhaji","price":7.99},{"name":"Dal Puri","price":7.99},{"name":"Fish Pakora","price":15.99},{"name":"Aloo Phud Chaat","price":12.99},{"name":"Cheese Pakora","price":12.99},{"name":"Crispy Fish","price":15.99},{"name":"Chicken Tikka","price":15.99},{"name":"Chicken 65","price":17.99},{"name":"Tandoori Prawns","price":29.99},{"name":"Tandoori Chicken","price":25.99},{"name":"Seekh Kebab","price":19.99},{"name":"Lamb Cutlets","price":25.99},{"name":"Chicken Malai","price":18.99}]},
    {"category":"Special Platters","items":[{"name":"Veg Platter","price":24.99},{"name":"Mix Entree Platter","price":42.99}]},
    {"category":"Vegetarian Lovers","items":[{"name":"Palak Paneer","price":19.99},{"name":"Saag Aloo","price":19.99},{"name":"Paneer Butter Masala","price":19.99},{"name":"Paneer Lababdar","price":19.99},{"name":"Paneer Tikka Masala","price":19.99},{"name":"Dal Makhani","price":19.99},{"name":"Dal Tadka","price":19.99},{"name":"Aloo Matar","price":19.99},{"name":"Aloo Gobi","price":19.99},{"name":"Mixed Vegetables","price":19.99},{"name":"Veg Kadai","price":19.99},{"name":"Garlic Mushroom","price":19.99}]},
    {"category":"Chicken Lovers","items":[{"name":"Butter Chicken","price":23.99},{"name":"Chicken Mushroom","price":23.99},{"name":"Chicken Kadai","price":23.99},{"name":"Chicken Korma","price":23.99},{"name":"Chicken Madras","price":23.99},{"name":"Chicken Vindaloo","price":23.99}]},
    {"category":"Meat Lovers","items":[{"name":"Lamb Rogan Josh","price":27.99},{"name":"Pepper Lamb","price":27.99},{"name":"Beef Vindaloo","price":27.99},{"name":"Goat Curry","price":27.99}]},
    {"category":"Ocean Lovers","items":[{"name":"Goan Fish Curry","price":28.99},{"name":"Kerala Fish Curry","price":28.99},{"name":"Fish Malabar","price":28.99},{"name":"Butter Fish","price":28.99},{"name":"Prawn Curry","price":28.99},{"name":"Chilli Prawns","price":28.99}]},
    {"category":"Rice & Biryanis","items":[{"name":"Steamed Rice","price":4.99},{"name":"Saffron Rice","price":5.99},{"name":"Peas Pulao","price":6.99},{"name":"Kashmiri Rice","price":6.99},{"name":"Curd Rice","price":9.99},{"name":"Vegetable Pulao","price":12.99},{"name":"Mushroom Rice","price":13.99},{"name":"Vegetable Biryani","price":19.99},{"name":"Chicken Biryani","price":21.99},{"name":"Lamb Biryani","price":21.99},{"name":"Goat Biryani","price":21.99}]},
    {"category":"Breads","items":[{"name":"Plain Naan","price":3.99},{"name":"Butter Naan","price":4.5},{"name":"Garlic Naan","price":4.99},{"name":"Cheese Naan","price":5.99},{"name":"Cheese & Garlic Naan","price":6.99},{"name":"Peshwari Naan","price":5.99},{"name":"Keema Naan","price":6.99},{"name":"Tandoori Roti","price":3.5},{"name":"Lachha Paratha","price":5.99}]},
    {"category":"Sides","items":[{"name":"Raita","price":3.0},{"name":"Pickle","price":2.0},{"name":"Mint Sauce","price":2.0},{"name":"Mango Chutney","price":2.0}]},
    {"category":"Indo-Chinese","items":[{"name":"Gobi Manchurian","price":17.99},{"name":"Veg Manchurian","price":16.99},{"name":"Chicken Noodles","price":18.99},{"name":"Veg Noodles","price":16.99},{"name":"Schezwan Fried Rice","price":18.99}]},
    {"category":"Dosas","items":[{"name":"Plain Dosa","price":13.99},{"name":"Masala Dosa","price":15.99},{"name":"Cheese Dosa","price":16.99},{"name":"Paneer Dosa","price":18.99}]},
    {"category":"Kids Menu","items":[{"name":"Butter Chicken with Rice","price":14.99},{"name":"Chicken Nuggets & Chips","price":12.99},{"name":"Fish & Chips","price":12.99}]},
    {"category":"Desserts","items":[{"name":"Gulab Jamun","price":7.99},{"name":"Pistachio Kulfi","price":7.99},{"name":"Mango Kulfi","price":7.99},{"name":"Shahi Tukda","price":9.99}]},
    {"category":"Beverages","items":[{"name":"Soft Drinks","price":4.0},{"name":"Mango Lassi","price":5.99},{"name":"Sweet Lassi","price":5.99},{"name":"Salt Lassi","price":5.99},{"name":"Fresh Lime Soda","price":5.99}]} 
  ]
};

// Helper: simple slug generator
const slugify = (s: string) =>
  s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

let catId = 1000;
let itemId = 10000;

export const LOCAL_MENU = {
  menuCategories: RAW.menu.map((cat: any, idx: number) => {
    const cid = ++catId + idx;
    return {
      id: cid,
      title: cat.category,
      slug: slugify(cat.category),
      displayOrder: idx + 1,
      menu_items: (cat.items || []).map((it: any, j: number) => ({
        id: ++itemId + j,
        title: it.name,
        shortDescription: it.description || '',
        price: typeof it.price === 'number' ? it.price : parseFloat(it.price) || 0,
        featured: false,
      })),
    };
  }),
  buffetCategories: [],
};

export default LOCAL_MENU;
