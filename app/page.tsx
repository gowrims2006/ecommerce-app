"use client"
import { useState } from "react"

type Product = {
  id: number
  name: string
  price: number
  image: string
}

type CartItem = Product & { quantity: number }
const products: Product[] = [
  { id: 1, name: "iPhone 15", price: 70000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
  { id: 2, name: "Nike Shoes", price: 5000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: 3, name: "Headphones", price: 3000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 4, name: "Laptop", price: 60000, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { id: 5, name: "Watch", price: 15000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 6, name: "Backpack", price: 2000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c32a3?w=400" },
]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((a, b) => a + b.quantity, 0)

  const handleBuy = () => {
    alert(`Order Placed! Total: ₹${total}\nThank you GOWRI ❤️`)
    setCart([])
    setShowCart(false)
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-black">Gowri's Store 🛒</h1>
        <button
          onClick={() => setShowCart(!showCart)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-600"
        >
          Cart: {cartCount} | ₹{total}
        </button>
      </div>

      {/* CART SECTION */}
      {showCart && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-black mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b py-2 text-black">
                  <span>{item.image} {item.name} x {item.quantity}</span>
                  <div>
                    <span className="font-bold mr-4">₹{item.price * item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-bold">Remove</button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="text-2xl font-bold text-black">Total: ₹{total}</p>
                <button
                  onClick={handleBuy}
                  className="w-full bg-green-500 text-white py-3 rounded-lg mt-3 font-bold hover:bg-green-600"
                >
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <img src={product.image} className="w-full h-48 object-cover rounded mb-4" />
            <div className="text-6xl mb-4 text-center">{product.image}</div>
            <h3 className="text-xl font-bold text-black mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-purple-600 mb-4">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 font-semibold"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}