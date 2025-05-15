import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  return (
    <div style={{ maxWidth: 420, margin: "auto", marginTop: 64 }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        localization={{
          variables: {
            sign_in: { email_label: "E-mail", password_label: "Senha" },
            sign_up: { email_label: "E-mail", password_label: "Senha" },
          },
        }}
      />
    </div>
  );
}