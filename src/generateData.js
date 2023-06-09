import { faker } from '@faker-js/faker';
import Product from '../models/products.js';

const commerce=faker.commerce
export function generateProducts()
{
  const items=[]
  for (let i = 0; i < 50; i++)
  {
    const price=Number(commerce.price({min: 100, max: 1e4, dec: 0}))
    let taxCategory='PA'
    if(price>5e3) taxCategory='PB'
    let taxAmount=taxCategory=='PA'? 0.12*price : 0.18*price
    taxAmount=Math.round(taxAmount)
    if(taxAmount==200) taxCategory='PC'

    items.push({
      name: commerce.product(),
      category: 'product',
      price,
      taxCategory,
      taxAmount
    })
  }
  return items
}

const services=
[
  {
    name: 'it services',
    price: 2000
  },
  {
    name: 'gaming',
    price: 9000
  },
  {
    name: 'teaching',
    price: 5000
  },
  {
    name: 'repairs',
    price: 1500
  }
]
export function generateServices()
{
  const items=[]
  services.forEach(item=>{
    const price=item.price
    let taxCategory='SA'
    if(price>8e3) taxCategory='SB'
    let taxAmount=taxCategory=='SA'? 0.1*price : 0.15*price
    taxAmount=Math.round(taxAmount)
    if(taxAmount==100) taxCategory='SC'

    items.push({
      name: item.name,
      category: 'service',
      price,
      taxCategory,
      taxAmount
    })
  })
  return items
}

// Product.bulkCreate(generateProducts(),{ignoreDuplicates: true})
//   .then(console.log('created products'))
// Product.bulkCreate(generateServices(),{ignoreDuplicates: true})
//   .then(console.log('created services'))