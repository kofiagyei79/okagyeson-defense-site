export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const secureKey = env.RESEND_API_KEY;

    // ==========================================
    // ROUTE 1: LEADS/AUDIT REQUEST FORM SUBMISSION
    // ==========================================
    if (path === "/api/v1/services/request" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const companyName = formData.get("company_name") || "Not Provided";
        const corporateEmail = formData.get("email") || "Not Provided";
        const details = formData.get("details") || "Not Provided";
        const severity = formData.get("severity") || "low";

        // CORE FIX: Switched to the correct api.resend.com/emails endpoint architecture
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { 
            "Authorization": "Bearer " + secureKey, 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            from: "Okagyeson Intake <onboarding@resend.dev>",
            to: "kofiagyei79@gmail.com",
            subject: `🚨 [${severity.toUpperCase()}] New Client Ticket from ${companyName}`,
            html: `<h3>Okagyeson Defense Portal Client Intake</h3>
                   <p><strong>Company Name:</strong> ${companyName}</p>
                   <p><strong>Corporate Contact Email:</strong> ${corporateEmail}</p>
                   <p><strong>Severity Priority Level:</strong> ${severity.toUpperCase()}</p>
                   <p><strong>Log Excerpts & Context:</strong></p>
                   <pre style="background:#f1f5f9; padding:15px; border-radius:4px;">${details}</pre>`
          })
        });

        if (!emailResponse.ok) { const errText = await emailResponse.text(); throw new Error(errText); }
        
        return new Response("<h1>[SUCCESS] Encrypted Ticket Transmitted Successfully.</h1><p><a href='/'>Return to main nodes dashboard.</a></p>", { 
          status: 200, 
          headers: { "Content-Type": "text/html; charset=utf-8" } 
        });
      } catch (err) { 
        return new Response("<h1>Transmission Failure</h1><p>" + err.message + "</p>", { 
          status: 500, 
          headers: { "Content-Type": "text/html; charset=utf-8" } 
        }); 
      }
    }

    // ==========================================
    // ROUTE 2: CAREERS FORM WITH BINARY PDF ATTACHMENT
    // ==========================================
    if (path === "/api/v1/careers/apply" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const fullName = formData.get("full_name") || "Not Provided";
        const applicantEmail = formData.get("email") || "Not Provided";
        const appliedRole = formData.get("primary_skill") || "Not Provided";
        const bio = formData.get("bio") || "Not Provided";
        const file = formData.get("resume");

        // Actively stops execution if file values are empty
        if (!file || !(file instanceof File) || file.size === 0) {
          return new Response("<h1>Submission Error</h1><p>Missing credentials attachment element. A PDF file upload is mandatory.</p>", { 
            status: 400, 
            headers: { "Content-Type": "text/html; charset=utf-8" } 
          });
        }

        const fileBuffer = await file.arrayBuffer();
        const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));

        // CORE FIX: Switched to the correct api.resend.com/emails endpoint architecture
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { 
            "Authorization": "Bearer " + secureKey, 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            from: "Okagyeson Careers <onboarding@resend.dev>",
            to: applicantEmail, // Routes straight to the applicant's input mailbox
            subject: "🛡️ Application Receipt Token: Okagyeson Cyber Defense",
            html: `<h3>System Operator Application Log Ingested</h3>
                   <p>Hello ${fullName},</p>
                   <p>Your application profile for the specialization area <strong>${appliedRole}</strong> has been registered successfully.</p>
                   <p><strong>Your Profile Summary Statement:</strong></p>
                   <p>${bio}</p>
                   <p>A copy of your attached original resume documentation context is compiled below.</p>`,
            attachments: [{ 
              filename: file.name || "resume.pdf", 
              content: base64Content,
              contentType: "application/pdf"
            }]
          })
        });

        if (!emailResponse.ok) { const errText = await emailResponse.text(); throw new Error(errText); }
        
        return new Response("<h1>[SUCCESS] Operator Profile and Credentials Deployed Successfully.</h1><p><a href='/'>Return to dashboard node.</a></p>", { 
          status: 200, 
          headers: { "Content-Type": "text/html; charset=utf-8" } 
        });
      } catch (err) { 
        return new Response("<h1>Credential Ingestion Pipeline Error Node</h1><p>" + err.message + "</p>", { 
          status: 500, 
          headers: { "Content-Type": "text/html; charset=utf-8" } 
        }); 
      }
    }

    return new Response("<h1>404 Gateway Resource Node Not Found</h1>", {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
