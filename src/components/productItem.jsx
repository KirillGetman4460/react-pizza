import React,{useState} from "react";
import classNames from 'classnames';
import { useSelector } from 'react-redux'

const ProductItem = (props)=>{
    const {post,addToBasket} = props;

    const basket = useSelector(state => state.basket)

    const [size, setSize] = useState([26,30,40])

    //список типов
    const [types,setTypes] = useState(['тонкое','традиционное'])

    //хранилиже выбраного розмера 
    const [choiceSize,setChoiceSize] = useState(size[0]);

    //хранилиже выбраного типа 
    const [choiceTypes,setChoiceTypes] = useState(types[0]);

    //активная кнопка выбора розмера
    const [activeSize, setActiveSize] = useState(0);
    
    //активная кнопка выбора типа
    const [activeTypes, setActiveTypes] = useState(0);

    post.size = choiceSize
    post.types = choiceTypes
    const setSizeActive = (size,s) =>{
        setActiveSize(size);
        setChoiceSize(s);      
    }

    const setTypesActive = (types,s) =>{
        setActiveTypes(types);
        setChoiceTypes(s);      
    }
    return (
        <div className="item__card">                    
            <div className="item__card__img">
                <img src={post.image} alt="" />
            </div>     

            <div className="item__card__title">
                {post.title}
            </div>

            <div className="item__card__choice">
                <div className="item__card__types">
                    {types.map((t,index) => 
                    <span 
                    className={classNames({
                    active: activeTypes === index,
                })} 
                onClick={()=> setTypesActive(index,t)}>{t}
                    </span>)}
                </div>
                               
                <div className="item__card__size">
                {size.map((s,index) => <span className={classNames({
                    active: activeSize === index,
                })} onClick={()=> setSizeActive(index,s)}>{s}.см</span>)}
                </div>
            </div>
                <div className="item__card__content__buttom">
                    <div className="item__card__price">
                    от {post.price} ₽
                    </div>
                    <div className="addBtn" onClick={()=> addToBasket(post)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E"/>
                        </svg>
                        <span className="addBtn__title">
                            Добавить
                        </span>
                    </div>
                </div>
        </div>
    )
}
export default ProductItem;