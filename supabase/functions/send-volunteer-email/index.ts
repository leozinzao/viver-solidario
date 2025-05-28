
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VolunteerData {
  nome: string;
  email: string;
  telefone: string;
  areasInteresse: string[];
  disponibilidade: string;
  experienciaAnterior?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const volunteerData: VolunteerData = await req.json();

    const areasText = volunteerData.areasInteresse.join(", ");
    
    const emailResponse = await resend.emails.send({
      from: "ONG Viver <onboarding@resend.dev>",
      to: ["gestaodepessoas@ongviver.org.br"],
      subject: `Novo Voluntário: ${volunteerData.nome}`,
      html: `
        <h2>Novo Cadastro de Voluntário</h2>
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p><strong>Nome:</strong> ${volunteerData.nome}</p>
          <p><strong>Email:</strong> ${volunteerData.email}</p>
          <p><strong>Telefone:</strong> ${volunteerData.telefone}</p>
          <p><strong>Áreas de Interesse:</strong> ${areasText}</p>
          <p><strong>Disponibilidade:</strong> ${volunteerData.disponibilidade}</p>
          ${volunteerData.experienciaAnterior ? 
            `<p><strong>Experiência Anterior:</strong></p>
             <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${volunteerData.experienciaAnterior}</p>` 
            : ''}
          <p><em>Este email foi enviado através do site da ONG Viver.</em></p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-volunteer-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
