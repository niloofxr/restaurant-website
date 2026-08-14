// Edit this file to update dishes, prices, descriptions, and categories.
const MENU = [
  { id:'nebula', name:'Nebula oysters', description:'Mignonette, finger lime, black garlic', price:18, category:'Appetizers', tag:'Raw' },
  { id:'solar', name:'Solar flare', description:'Charred carrot, vadouvan, smoked yogurt', price:14, category:'Appetizers', tag:'Vegetarian' },
  { id:'moon', name:'Moonstone crudo', description:'Ora king salmon, yuzu kosho, sesame', price:22, category:'Appetizers', tag:'Raw' },
  { id:'gravity', name:'Gravity noodles', description:'Hand-pulled noodles, XO, crispy shallot', price:19, category:'Main items', tag:'Signature' },
  { id:'darkmatter', name:'Dark matter', description:'A5 wagyu, fermented plum, burnt onion', price:34, category:'Main items', tag:'Chef’s cut' },
  { id:'rings', name:'Rings of Saturn', description:'Tempura squash, miso caramel, shiso', price:16, category:'Main items', tag:'Vegetarian' },
  { id:'eclipse', name:'Eclipse', description:'Black sesame, cacao, salted comet caramel', price:12, category:'Desserts', tag:'Sweet', isDessert:true },
  { id:'pulsar', name:'Pulsar tea', description:'Osmanthus, pear, tonic, zero proof', price:9, category:'Drinks', tag:'Zero proof' },
  { id:'quasar', name:'Quasar tartare', description:'Hand-cut beef, cosmic mustard, caper dust', price:29, category:'Daily specials', tag:'Signature' },
  { id:'comet', name:'Comet tail', description:'Citrus meringue, white chocolate, ginger', price:15, category:'Desserts', tag:'Sweet', isDessert:true },
  { id:'moonbeam', name:'Moonbeam spritz', description:'White peach, elderflower, sparkling water, lemon', price:11, category:'Drinks', tag:'Zero proof' },
  { id:'redshift', name:'Redshift soda', description:'Blood orange, rosemary, smoked vanilla, soda', price:10, category:'Drinks', tag:'House soda' },
  { id:'starlight', name:'Starlight cooler', description:'Cucumber, mint, lime, pressed apple', price:9, category:'Drinks', tag:'Refreshing' }
];
