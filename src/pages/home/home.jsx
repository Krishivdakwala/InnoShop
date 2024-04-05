import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useState, useEffect } from 'react'
import "./home.css"
import "./searchBar.css"

const API_URL = 'https://dummyjson.com/products'

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [cart, setCart] = useLocalStorageState('cart', {})
    const [query, setQuery] = useState('');
    const [finalQuery, setFinalQuery] = useState('');
    const [firstSpanActive, setFirstSpanActive] = useState(false);
    const [secondSpanActive, setSecondSpanActive] = useState(false);
    const [introTop, setIntroTop] = useState(0);
    const [animationPlayed, setAnimationPlayed] = useLocalStorageState('animationPlayed', false);


    useEffect(() => {
      if (!animationPlayed) {
        setTimeout(() => {
          const firstSpanTimeout = setTimeout(() => {
            setFirstSpanActive(true);
          }, 500); 
      
          const secondSpanTimeout = setTimeout(() => {
            setSecondSpanActive(true);
          }, 1000); 
      
    
          const outroTimeoutSpan = setTimeout(() => {
            setFirstSpanActive(false);
            setSecondSpanActive(false);
            
          }, 2500); 

          const outroTimeout = setTimeout(() => {
            setIntroTop(-100);
          }, 2000)
          
          setAnimationPlayed(true);
          return () => {
            clearTimeout(firstSpanTimeout);
            clearTimeout(secondSpanTimeout);
            clearTimeout(outroTimeout);
          };
        }, 500); 
      }
      else{
        setFirstSpanActive(false);
        setSecondSpanActive(false);
        setIntroTop(-100);
      }
        console.log(finalQuery)
        fetchData(API_URL+finalQuery)
    }, [finalQuery])

    async function fetchData(url) {
        try{
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setProducts(data.products)
                setIsLoading(false)
                console.log(products);
            } else {
                setError(true)
                setIsLoading(false)
            }
        }catch(err){

        }
    }

    const addToCart = (product) => {
        product.quantity = 1
    
        setCart((prevCart) => ({
          ...prevCart,
          [product.id]: product,
        }))
      }
  
      const isInCart = (productId) => Object.keys(cart || {}).includes(productId.toString())

      if (error) {
        return <h3>An error occurred when fetching data. Please check the API and try again.</h3>
      }
    
      if (isLoading) {
        return(<h2>Loading</h2>)
      }

      const handleSearchClick = () => {
        setFinalQuery("/search?q="+query);
      };


  return (
    <div className='shop'>
      <div className="intro" style={{ top: `${introTop}vh` }}>
      <h1 className="logo-header">
        <span className={firstSpanActive ? 'logo active' : 'logo'}>Inno</span>
        <span className={secondSpanActive ? 'logo active' : 'logo'}>Shop</span>
        </h1>
      </div>

        <div className='title'>
            <h1>InnoShop</h1>
        </div>

        <div className='search'>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search for items...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-button" onClick={handleSearchClick}>
                Search
              </button>
            </div>
        </div>

        <div className='products'>

        {products.map(product => (
          <div>
            <div className="product">
                <img src={product.thumbnail} alt="..." />
                <div className="description">
                    <p>
                      <b>{product.title}</b>
                    </p>
                    <p> ${product.price}</p>
                </div>
                <button className="addToCartBttn" disabled={isInCart(product.id)} onClick={() => addToCart(product)}>
                    Add To Cart
                </button>
            </div>
          </div>
        ))}
      
    </div>
    </div>
  )
}
