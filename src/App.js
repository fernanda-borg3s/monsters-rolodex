import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';


class App extends Component {
  constructor(){ // componente de inicialização
    super(); //sempre deve vir dentro do constructor
    this.state = {
      monsters: [],
      searchField: ''
   //SPA: Pedido para servidor que devolver a contrução da pagina de volta, sem precisar pedir de nvo ao navegar
    };// esta dizendo que o react procura algo dentro do construtor, dentro do componente. Sempre sera um objeto JSON
  }
  componentDidMount(){
   //componentDidMount: metodo ao qual se tem acesso e dentro vc escreve o codigo que sera executado sempre que o componente for montado. Utilizado para solicitaçao API.
   fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
      .then((user) => 
      this.setState(() => {
        return {monsters: user};
      },
      () => {
        
      }
      ))
  }
  onSeachChange = (event) =>{
     const searchField = event.target.value.toLocaleLowerCase();
          this.setState(() => {
            return {searchField}
          })
  }
  render(){// executada depois do contructor, faz a renderização que determina o que mostrar
     //duas otimização, mais facil ver que as duas variaveis estao sendo inicializadas
    const {monsters, searchField} = this.state;
    const {onSeachChange} = this;

     const filtrandoMonstros = monsters.filter((monster)=>{
        return monster.name.toLocaleLowerCase().includes(searchField);
          });
    return (
      <div className="App">
        
        <SearchBox className='monsters-search-box' onChangeHandler={onSeachChange} placeholder='Search Monsters'/>
      
        <CardList monsters={filtrandoMonstros}/>
      </div>
    );
  }
  
}

export default App;
