import React,{useState,useEffect} from "react"
import ProductItem from './productItem.jsx';
import { useDispatch } from 'react-redux'
import Filter from "./filter.jsx";
import axios from "axios";


const ProductList = () => {

    const [posts, setPosts] = useState([]);

    const getPosts = async()=>{
        await axios.get('http://localhost:3000/product')
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))      
    }

    const sortProducts = async(item)=>{
        await axios.get(`http://localhost:3000/product?category=${item}`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))   
    }

    const [choiceOptions,setChoiceOptions] = useState();

    //redux action
    const dispatch = useDispatch();

    const addToBasket = product =>{   
        dispatch({type:'add_to_basket',payload: product})           
    }

    const sortPrice = ()=>{         
       setPosts([...posts].sort((a,b)=> a.price - b.price))
    }

    const sortAlphabet = ()=>{ 
        setPosts([...posts].sort((a,b)=> a.title.localeCompare(b.title)))
    }

    const sortRating = ()=>{ 
        setPosts([...posts].sort((a,b)=> b.rating - a.rating))
    }

    const selectCategory = (category) =>{
        setChoiceOptions(category)
    }

    useEffect(() => {     
        getPosts();
    },[])
    useEffect(() =>{
        switch(choiceOptions){
            case 'по цене':
                sortPrice()
                break;
            case 'по алфавиту':
                sortAlphabet()
                break;
            case 'популярности':
                sortRating()
                break;
        }
    },[choiceOptions])

    return(
        
    <div className="product__conteiner">
    <Filter selectCategory={selectCategory} getPosts={getPosts} sortProducts={sortProducts}/>   
        <div className="product__title">
            Все пиццы
        </div>  
        <div className="product__list">               
            {posts.map(post =>
                <ProductItem post={post} addToBasket={addToBasket}/>,
            )}
        </div>      
    </div>
    )
}
export default ProductList;