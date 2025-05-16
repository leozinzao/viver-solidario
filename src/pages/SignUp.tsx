
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para o aplicativo principal com a tela de cadastro
    navigate("/", { replace: true });
    
    // Depois de redirecionar, ativa a tela de cadastro no app
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).navigateTo) {
        (window as any).navigateTo('signup');
      }
    }, 100);
  }, [navigate]);

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 64 }}>
      <h2>Redirecionando...</h2>
    </div>
  );
};

export default SignUp;
