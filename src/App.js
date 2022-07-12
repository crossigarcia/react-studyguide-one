// import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list';
import SearchBox from './components/search-box/search-box';
import './App.css';

//Functional Compnent
//Mounting Phase --> no constructor or class, behaves like a JS function, takes props as arguments, returns JSX, React runs the function, returns the return and puts it on the page, from top to bottom
//Functional components do not go through lifecycle methods, its all functions and side-effects
const App = () => {
  //this entire function runs when the component needs to re-render (as opposed to just the render method in class components)
  //props, state changes will trigger rerender
  //encapsulate local state in a functional component
  const [searchString, setSearchString] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  // fetch("https://jsonplaceholder.typicode.com/users")
  // .then(res => res.json())
  // .then(users => setMonsters(users))
  // .catch(err => console.log(err));
  //if this calls when rendering, every response will be a different array in memory (even if values are the same) which will trigger rendering (state value changed, pointing to a different value in memory)
  //this will cause an infinite loop of rerendering and fetching every time, updating state etc...
  //control this behavior with sideeffects -- useEffect
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setMonsters(users))
      .catch((err) => console.log(err));
  }, []);
  //two arguments -- callback and dependency array
  //runs once on mount, changes values in dependency array trigger running useEffect

  // const filteredMonsters = monsters.filter((monster) => {
  //   return monster.name.toLowerCase().includes(searchString);
  // }); //this will be rebuilt every time re-render is triggered, even if this array has not changed
  useEffect(() => {
    const filtered = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchString);
    });
    setFilteredMonsters(filtered);
  }, [monsters, searchString]);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value.toLowerCase());
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={handleSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <CardList data={filteredMonsters} />
    </div>
  );
}

// class App extends Component {
//   //JSX --> syntax extension of JS, allows you to write what looks like HTML inside JS, a more efficient way of telling the app what to render
  
//   //access and generate state through constructor method/function
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchString: ""
//     }
//   }

//   // handleClick = () => {
//   //   //shallow merge this object with local state, if local state has same key the valu gets updated in local state
//   //   //changing state object which triggers a re-render
//   //   //only changes the keys being named, react doesn't care what the value was before change
//   //   //best practice --> always update using same type of values -> string to string, obj to obj etc
//   //   //react batches setState calls, determining when the best time to update state is, setState is async
//   //   // this.setState({heading: "I have changed."});
//   //   //writing setState this way gives you access to state and props...
//   //   this.setState((state, props) => {
//   //     return {
//   //       heading: "Hello World, I have changed."
//   //     }
//   //   }, () => {console.log("This is the callback, I only run after all state changes have applied.", this.state)})
//   // }

//   //key -> unique property on listed elements (usually an id) --> helps for optimizing re-rendering, 
//           //differentiates each element from the other using the key, so it can re-render one specific 
//           //element on change instead or every element on change
//   //SPA --> Single Page Application -- request files to build page from the server once, on first load, using react code it gets from that request it can build other "pages" on request

//   //api request, GET
//   //lifecycle method --> update state, re-render component the moment the app is mounted/rendered: componentDidMount()
//   componentDidMount() {
//     //mounting --> first time component gets put on the DOM, will only re-mount when if it has ben unmounted
//     fetch("https://jsonplaceholder.typicode.com/users")
//     .then(res => res.json())
//     .then(users => this.setState(() => {
//       return {monsters: users}
//     }))
//     .catch(err => console.log(err))
//   }

//   //SyntheticBaseEvent -- event handling facilitated by react, _reactName
//   handleSearchChange = (event) => {
//     this.setState(() => {return { searchString: event.target.value.toLowerCase() } });
//   }

//   render () {
//     const { monsters, searchString } = this.state;
//     const { handleSearchChange } = this;
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchString);
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={handleSearchChange} placeholder='search monsters' className='monsters-search-box'/>
//         <CardList data={filteredMonsters}/>
//       </div>
//     );
//   }
  
// }

export default App;
