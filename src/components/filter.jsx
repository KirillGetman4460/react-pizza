import React,{useState,useEffect} from "react";
import classNames from 'classnames';
const Filter = (props)=>{

    const {selectCategory,getPosts,sortProducts} = props;

    const [listSelect,setListSelect] = useState(['популярности','по цене','по алфавиту']);

    const [categories,setCategories] = useState(["Все",'Мясные','Вегетарианская','Гриль','Острые','Закрытые'])

    const [optionsSort,setOptionsSort] = useState(listSelect[0])

    const [activeCategory,setActiveCategory] = useState(0);

    const [activeList,setActiveList] = useState(0)

    const [active,setActive] = useState(false);


    const activeLink = (i,item)=>{    
        setActiveCategory(i)
        sortProducts(item)
    }

    const toogle = () =>{
        setActive(!active)
    }

    const selectOptions = (options,i) =>{
        setOptionsSort(options)
        selectCategory(options)
        setActiveList(i);
        setActive(false)
    }

    useEffect(()=>{
        if(activeCategory === 0){
            getPosts();
        }
    },[activeCategory])

    return (
        <div className="filter">
            <div className="filter__conteiner">

            <ul className="filter__list">
                {categories.map((item,i) =>
                    <li className={"filter__list__link " + classNames({active: activeCategory === i,})} onClick={()=> activeLink(i,item)}>
                        <span>
                            {item}
                        </span>
                    </li>
                )}
            </ul>
            <div className="filter__select">
                <div className={"filter__select__title" + (active ? " active":"")} onClick={() => toogle()} >
                    <span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C"/>
                    </svg>

                        Сортировка по:
                    </span>
                    
                    <span>
                        {optionsSort}
                    </span>
                </div>
                {active ? <div className="filter__select__content">
                    <ul className="filter__select__content__list">
                        {listSelect.map((link,i) => <li className={"filter__select__list__link " + classNames({active: activeList === i,})} onClick={()=> selectOptions(link,i)}>{link}</li>)}
                    </ul>
                </div>:null}
                
            </div>
            </div>
        </div>
    )
}
export default Filter;