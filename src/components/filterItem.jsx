import React,{useEffect,useState} from "react";
import { useParams } from "react-router";
import axios from "axios";
const FilterItem = ()=>{
    const {id} = useParams()

    const [test,setTest] = useState(['Гриль',"Мясные","Закрытые"])

    const[posts, setPosts] = useState([]);

    const getPosts = async(item)=>{
        await axios.get(`http://localhost:3000/product?category=${item}`)
            .then((res)=> setPosts(res.data))
            .catch((err)=> console.log(err))
    }

    return (
        <div className="item">
            {test.map(item => <button onClick={()=> getPosts(item)}>{item}</button>)}
            {posts.map(post=><div>{post.title}</div>)}
        </div>
    )
}
export default FilterItem;