// import { Component } from 'react';
import Card from '../card/card';
import './card-list.css';

// class CardList extends Component {
//    //props change --> triggers a re-render
//    render() {
//       const { data } = this.props;
//       return (
//          <div className='card-list'>
//             {data.map(monster => {
//                return (
//                   <Card key={monster.id} monster={monster}/>
//                )
//             })}
//          </div>
//       )
//    }
// }

const CardList = ({ data }) => {
   return (
      <div className='card-list'>
         {data.map(monster => {
            return (
               <Card key={monster.id} monster={monster}/>
            )
         })}
      </div>
   )
}

export default CardList;