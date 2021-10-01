import { createStore } from 'redux'
const defaultState = { basket:[],choiceOptions:'',category:'' }

const reducer = (state = defaultState, action) =>{
  switch(action.type){    
    case "add_to_basket":
        //проверка на совпадение по индексу 
        const index = state.basket.findIndex(el => el.id === action.payload.id);
        if(index === -1){  //если совпадение не найдено, догда добавляем новый элемент в массив
          return {...state, basket: [...state.basket, {...action.payload}]}
        }else{  //если совпадение найдено
          state.basket.map((el,i) =>{
            index === i ? el.qty++ : state.basket//увеличиваем количество товара на 1
          })
        }    
    case "delele_to_basket":
      return {...state, basket: state.basket.filter(product => product.id !== action.payload)}

    case "clear_basket":
      return {...state, basket: state.basket = []}

    default:
      return state
  }

}

const store = createStore(reducer);
export default store;