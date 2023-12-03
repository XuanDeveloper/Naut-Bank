import CadastroForm from "../../components/cadastroForm";
import CadastroInfo from "../../components/cadastroInfo";
import "./style.css"

const Cadastro = () => {
  return ( 
    <div className="mainCadastro">
      <section className="CadastroInfo">
        <CadastroInfo/>
        <img className="Baleia" src="https://raw.githubusercontent.com/Xuan002/Naut-Bank-/main/src/assets/logo/logo-removebg-preview.svg" alt="baleia do Naut'Bank" />
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