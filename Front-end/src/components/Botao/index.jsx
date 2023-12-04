import "./botao.css"

const Botao = ({texto, funcao}) => {
    return ( 
        <button onClick={funcao} className="botao">{texto}</button>
     );
}
 
export default Botao;