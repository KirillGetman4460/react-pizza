import React,{useState,useEffect} from "react"
import ProductItem from './productItem.jsx';
import { useDispatch } from 'react-redux'
import Filter from "./filter.jsx";
import axios from "axios";


const ProductList = () => {


    const [posts, setPosts] = useState([]);

    const [categories,setCategories] = useState(['Мясные','Вегетарианская','Гриль','Острые','Закрытые'])

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

    const [types,setTypes] = useState();

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

    const selectTypes = (types)=>{      
        setTypes(types)
        console.log(types);
    }

   

    useEffect(() => {     
        getPosts();
    },[])
    useEffect(() =>{
        choiceOptions === 'по цене' ? sortPrice(): null

        choiceOptions === "по алфавиту" ? sortAlphabet(): null

        choiceOptions === 'популярности' ? sortRating(): null

    },[choiceOptions])


    return(
        
    <div className="product__conteiner">
    <Filter selectCategory={selectCategory} selectTypes={selectTypes} getPosts={getPosts} sortProducts={sortProducts}/>   
        <div className="product__title">
            Все пиццы
        </div>  
        <div className="product__list">               
            {posts.map(post =>
                <ProductItem post={post} addToBasket={addToBasket}/>,
            )}
        </div>      
    </div>
       /* <div className="product__conteiner">
            
            
            
             <Filter selectCategory={selectCategory} selectTypes={selectTypes}/>
             <Link to={`${url}item`}>
                item
            </Link>

             <Switch>
        <Route exact path={path}>
        <div className="product__title">
                Все пиццы
            </div>      
            <div className="product__list">               
            {posts.map(post =>
                <ProductItem post={post} addToBasket={addToBasket}/>,
            )}

        </div>
        </Route>
        <Route path={`${path}:id`}>
        <FilterItem/>
        </Route>
      </Switch>
            
        </div>*/
    )
}
export default ProductList;