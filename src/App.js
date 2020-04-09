import React from 'react';
import './App.css';
import { Typography, CardContent, } from '@material-ui/core';
import bingoItems from './bingoItems.json';
import BingoHeader from './components/bingoHeader';
import styled from 'styled-components';

//Database
import firebase from './firebase.js';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (min-width: 640px){
    flex-direction: row;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 20px;

  @media (min-width: 640px){
    flex-direction: row;
  }
`
const ScoreContainer = styled.div`
  position: relative;
  font-size: 26px;
`

const DateContainer = styled.div`
  position: relative;
  font-size: 26px;
`

const BingoItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  width: 80%;
  height: 25%;
  min-height: 300px;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  color: white;
  margin: 10px;

  @media (min-width: 640px){
    justify-content: space-around;
    width: 30%;
  }
`

const CompletedItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  width: 80%;
  height: 25%;
  min-height: 300px;
  background: linear-gradient(45deg, #7F8C8D 30%, #CACFD2 90%);
  color: white;
  margin: 10px;

  @media (min-width: 640px){
    justify-content: space-around;
    width: 30%;
  }
`

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      "name0": null,
      "name1": null,
      "name2": null,
      "name3": null,
      "name4": null,
      "name5": null,
      "name6": null,
      "name7": null,
      "name8": null,
      "name9": null,
      "name10": null,
      "name11": null,
      score: 0
    };


  }

  markComplete = e => {
    const id = e.target.id;
    this.setState({[id]: true})
    this.setState({ score: this.state.score + 1 });
  }

  bingoRow(row) {
    let rowOne = bingoItems.slice(0, 3);
    let rowTwo = bingoItems.slice(3, 6);
    let rowThree = bingoItems.slice(6, 9);
    let rowFour = bingoItems.slice(9, 12);
    let renderRow;

    switch (row) {
      case 1:
        renderRow = rowOne;
        break;
      case 2:
        renderRow = rowTwo;
        break;
      case 3:
        renderRow = rowThree;
        break;
      case 4:
        renderRow = rowFour;
        break;
      default:
        renderRow = rowOne;
      }
    return (
    <MainContainer>
      {renderRow.map(item => {
        const id = item.id;
       
        if (this.state[id] === true) {
          return (
              <CompletedItem id={id}>
                <CardContent></CardContent>
              </CompletedItem>
          )
        }
        else {
          return (
            <BingoItem id={item.id} onClick={this.markComplete}> 
              <CardContent>
                <Typography variant='button' id={item.id} onClick={this.markComplete}>
                  {item.item}
                </Typography>
              </CardContent>
            </BingoItem>
          )
        }
      })
      }
      </MainContainer>
    )
  }

  render(score) {
  return (
    <>
      <BingoHeader />
      <InfoContainer>
        <ScoreContainer>
          Score: { this.state.score }
        </ScoreContainer>
        <DateContainer>
          Date: 
        </DateContainer>
      </InfoContainer>
      {this.bingoRow(1)}
      {this.bingoRow(2)}
      {this.bingoRow(3)}
      {this.bingoRow(4)}
    </>
  )};
}

export default App;
// import React, { Component } from 'react';
// import './App.css';
// import firebase from './firebase.js';

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       currentItem: '',
//       username: '',
//       items: []
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     const itemsRef = firebase.database().ref('items');
//     const item = {
//       title: this.state.currentItem,
//       user: this.state.username
//     }
//     itemsRef.push(item);
//     this.setState({
//       currentItem: '',
//       username: ''
//     });
//   }
//   componentDidMount() {
//     const itemsRef = firebase.database().ref('items');
//     itemsRef.on('value', (snapshot) => {
//       let items = snapshot.val();
//       let newState = [];
//       for (let item in items) {
//         newState.push({
//           id: item,
//           title: items[item].title,
//           user: items[item].user
//         });
//       }
//       this.setState({
//         items: newState
//       });
//     });
//   }
//   removeItem(itemId) {
//     const itemRef = firebase.database().ref(`/items/${itemId}`);
//     itemRef.remove();
//   }
//   render() {
//     return (
//       <div className='app'>
//         <header>
//             <div className="wrapper">
//               <h1>Fun Food Friends</h1>
                             
//             </div>
//         </header>
//         <div className='container'>
//           <section className='add-item'>
//                 <form onSubmit={this.handleSubmit}>
//                   <input type="text" name="username" placeholder="date" onChange={this.handleChange} value={this.state.username} />
//                   <input type="text" name="currentItem" placeholder="score" onChange={this.handleChange} value={this.state.currentItem} />
//                   <button>Add Item</button>
//                 </form>
//           </section>
//           <section className='display-item'>
//               <div className="wrapper">
//                 <ul>
//                   {this.state.items.map((item) => {
//                     return (
//                       <li key={item.id}>
//                         <h3>score {item.title}</h3>
//                         <p>date {item.user}
//                           <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
//                         </p>
//                       </li>
//                     )
//                   })}
//                 </ul>
//               </div>
//           </section>
//         </div>
//       </div>
//     );
//   }
// }
// export default App;