
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
    }, 200);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecionando...</h2>
        <p>Você será direcionado para a página de cadastro.</p>
      </div>
    </div>
  );
};

export default SignUp;
