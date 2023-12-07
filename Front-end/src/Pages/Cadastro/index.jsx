import CadastroForm from "../../components/cadastroForm";
import CadastroInfo from "../../components/cadastroInfo";
import "./style.css"

const Cadastro = () => {
  return ( 
    <div className="mainCadastro">
      <section className="CadastroInfo">
        <CadastroInfo/>
        
      </section>

    <div class="linha-vertical"></div>
      <div class="container">
      <section className="Cadastro">
        <CadastroForm/>
      </section>
      </div>
    </div>
   );
}
 
export default Cadastro;