import { drinksType } from "../types/drinksType";
import flakesImage from '../assets/flakes.png';
import image2 from '../assets/image1.png';
import image3 from '../assets/image2.png'
// import image4 from '../assets/image3.png'
import image5 from '../assets/image4.png'
import image6 from '../assets/image5.png'
import image7 from '../assets/image6.png'
import image8 from '../assets/image7.png'
import image9 from '../assets/image8.png'
import image10 from '../assets/image9.png'
import image11 from '../assets/image10.png'
import image12 from '../assets/image11.png'
import image13 from '../assets/image12.png'
import image14 from '../assets/image13.png'
import image15 from '../assets/image14.png'
import image16 from '../assets/image15.png'
import image4 from '../assets/image16.png'



export interface cartData {
  category: string;
  icon: string;
  items: drinksType[];
}

const data: cartData[] = [
  {
    category: "Drinks",
    icon: "drink.png",
    items: [
      {
        drink: 'Fanta',
        size: '300ml',
        price: '3.00',
        image: image2
      },
      {
        drink: 'Pepsi',
        size: '400ml',
        price: '4.00',
        image: image4
      },
      {
        drink: 'Lucozade',
        size: '200ml',
        price: '2.50',
        image: image5
      },
      {
        drink: 'Ceres',
        size: '300ml',
        price: '3.50',
        image: image6
      },
      {
        drink: 'Coca-Cola',
        size: '330ml',
        price: '2.00',
        image: image7
      },
      {
        drink: 'Welch',
        size: '330ml',
        price: '2.00',
        image: image8
      },
      {
        drink: 'Martinellis',
        size: '350ml',
        price: '4.25',
        image: image9
      },

      {
        drink: 'Sprite',
        size: '350ml',
        price: '4.75',
        image: image16
      }
    ]
  },




  {
    category: "Snacks",
    icon: "drink.png",
    items: [
      {
        drink: 'Corn Flakes',
        size: '250ml',
        price: '4.50',
        image: flakesImage
      },

      {
        drink: 'Rice Krispies',
        size: '350ml',
        price: '5.00',
        image: image3
      },
      {
        drink: 'Pringles',
        size: '300ml',
        price: '3.75',
        image: image10
      },
      {
        drink: 'Lays Classic',
        size: '100ml',
        price: '2.75',
        image: image11
      },
      {
        drink: 'Shortbread',
        size: '350ml',
        price: '4.50',
        image: image12
      },
      {
        drink: 'Famous Amos',
        size: '250ml',
        price: '3.00',
        image: image13
      },
      {
        drink: 'Oreo',
        size: '400ml',
        price: '5.50',
        image: image14
      },
      {
        drink: 'Doritos Cheese',
        size: '300ml',
        price: '4.00',
        image: image15
      }
    ]
  }
];

export { data };
