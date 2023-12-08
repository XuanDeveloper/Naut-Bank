import LoginForm from "../../components/LoginForm";
import LoginInfo from "../../components/LoginInfo";

import "./style.css"

const Login = () => {
  return ( 
    <div className="mainLogin">
    <section className="LoginInfo">
     <LoginInfo />
    </section>

    <div class="linha-vertical2"></div>
    
  <div class="container">
    <section className="Login">
      <LoginForm />
    </section>
    </div>
  </div>
   );
}
 
export default Login;