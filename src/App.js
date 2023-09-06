import React , {useReducer} from "react";
import './styles.css';
import DigitButton from "./DigitButton";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  OPERATION: "operation",
  EQUALS: "equals",
  DELETE: "delete",
  DOT: "dot"
}


const reducer = (state,action) =>{
  switch(action.type){
    case ACTIONS.DOT:
      if(state.currentOperand.includes('.')){
        return {
          ...state
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand+'.'
      }
    case ACTIONS.ADD_DIGIT:
       return {...state, currentOperand: state.currentOperand+''+action.payload.currentOperand}
    case ACTIONS.CLEAR:
       return {currentOperand:'',operation:'',previousOperand:''}
    case ACTIONS.OPERATION:
       if(state.currentOperand === '' && state.previousOperand === '')
          return state;
       if(state.previousOperand === ''){
          return {
            ...state,
            operation: action.payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: ''
          }
        }
        if(state.operation !== '' && (state.previousOperand === '' || state.currentOperand === '')){
          return{
            ... state,
            operation: action.payload.operation
          }
        }
        return {
           ...state,
           previousOperand: evaluate(state),
           currentOperand: '',
           operation: action.payload.operation
        }
    case ACTIONS.EQUALS:
      if(state.previousOperand !== '')
       return {
        currentOperand: evaluate(state),
        previousOperand: '',
        operation: ''
       }
      else
        return{
          currentOperand:'',
          operation:'',
          previousOperand:''
      }
    case ACTIONS.DELETE:
      if(state.currentOperand !== ''){
        return{
          ...state,
          currentOperand: state.currentOperand.toString().slice(0,-1)
        }
      }else if(state.operation !== ''){
        return{
          operation: '',
          currentOperand: state.previousOperand,
          previousOperand: '' 
        }
      }else{
        return {
          ... state
        }
      }

  }   
}

const evaluate = ({previousOperand,currentOperand,operation})=> {
    switch(operation){
      case '+':
        return parseFloat(previousOperand) + parseFloat(currentOperand);
      case '-':
        return parseFloat(previousOperand) - parseFloat(currentOperand);
      case '*':
        return parseFloat(previousOperand) * parseFloat(currentOperand);
      case '÷':
        return parseFloat(previousOperand) / parseFloat(currentOperand);
    }
}


function App() {

  const [state,dispatch] = useReducer(reducer,{currentOperand:'',operation:'',previousOperand:''});

 return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{state.previousOperand}{state.operation}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE})}>DEL</button>
      <button onClick={()=>dispatch({type:ACTIONS.OPERATION,payload:{operation: '÷'}})}>÷</button>
      <DigitButton dispatch={dispatch} digit={1}/>
      <DigitButton dispatch={dispatch} digit={2}/>
      <DigitButton dispatch={dispatch} digit={3}/>
      <button onClick={()=>dispatch({type:ACTIONS.OPERATION,payload:{operation: '*'}})}>*</button>
      <DigitButton dispatch={dispatch} digit={4}/>
      <DigitButton dispatch={dispatch} digit={5}/>
      <DigitButton dispatch={dispatch} digit={6}/>
      <button onClick={()=>dispatch({type:ACTIONS.OPERATION,payload:{operation: '+'}})}>+</button>
      <DigitButton dispatch={dispatch} digit={7}/>
      <DigitButton dispatch={dispatch} digit={8}/>
      <DigitButton dispatch={dispatch} digit={9}/>
      <button onClick={()=>dispatch({type:ACTIONS.OPERATION,payload:{operation: '-'}})}>-</button>
      <button onClick={()=>dispatch({type:ACTIONS.DOT})}>.</button>
      <DigitButton dispatch={dispatch} digit={0}/>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EQUALS})}>=</button>
    </div>
  );
}

export default App;
