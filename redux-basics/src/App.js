import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from 'redux';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// ACTION CREATOR
const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name,
      amount,
    },
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name,
    },
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name,
      amountOfMoneyToCollect,
    },
  };
};

// REDUCER
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload];
  }

  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }

  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }

  return listOfPolicies;
};

const departments = combineReducers({
  claimDept: claimsHistory,
  accountDept: accounting,
  policyDept: policies,
});

// STORE
const store = createStore(departments);

// DIAPATCH
store.dispatch(createPolicy('Nancy', 20));
store.dispatch(createPolicy('Jane', 30));
store.dispatch(createPolicy('Alex', 40));

store.dispatch(createClaim('Alex', 100));
store.dispatch(deletePolicy('Nancy'));

// STATE
console.log(store.getState());

export default App;
