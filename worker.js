export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. ROUTE: Technical Service Consultation Requests
    if (path === "/api/v1/services/request" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const companyName = formData.get("company_name") || "Not Provided";
        const corporateEmail = formData.get("corporate_email") || "Not Provided";
        const coverageScope = formData.get("coverage_scope") || "LOCAL";

        const emailResponse = await fetch("https://resend.com", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + env.RESEND_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "kofiagyei79@gmail.com",
            subject: "🚨 New Audit Request from " + companyName,
            html: `<h3>Okagyeson Defense Network Intake Alert</h3>
                   <p><strong>Company Name:</strong> \${companyName}</p>
                   <p><strong>Corporate Email:</strong> \${corporateEmail}</p>
                   <p><strong>Coverage Scope Target:</strong> \${coverageScope}</p>`
          })
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          throw new Error("Resend API rejected request: " + errText);
        }
        
        return new Response("<h1>[SUCCESS] Security Intake Transmission Received.</h1><p><a href='/'>Return to dashboard node.</a></p>", { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
      } catch (err) { 
        return new Response("<h1>Transmission Failure</h1><p>" + err.message + "</p>", { status: 500, headers: { "Content-Type": "text/html" } }); 
      }
    }

    // 2. ROUTE: Careers Application System Ingest with Attached PDF Document
    if (path === "/api/v1/careers/apply" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const fullName = formData.get("full_name") || "Not Provided";
        const email = formData.get("email") || "Not Provided";
        const targetRegion = formData.get("target_region") || "GLOBAL";
        const appliedRole = formData.get("applied_role") || "Not Provided";
        const file = formData.get("resume");

        if (!file || !(file instanceof File) || file.size === 0) {
          return new Response("<h1>Submission Error</h1><p>Missing operational credentials attachment element. A PDF file upload is mandatory.</p>", { status: 400, headers: { "Content-Type": "text/html" } });
        }

        const fileBuffer = await file.arrayBuffer();
        const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));

        const emailResponse = await fetch("https://resend.com", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + env.RESEND_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "kofiagyei79@gmail.com",
            subject: "💼 New Candidate Application: " + appliedRole,
            html: `<h3>New System Operator Application Ingested</h3>
                   <p><strong>Operator Name:</strong> \${fullName}</p>
                   <p><strong>Contact Email:</strong> \${email}</p>
                   <p><strong>Deployment Region:</strong> \${targetRegion}</p>
                   <p><strong>Applied Operational Role:</strong> \${appliedRole}</p>`,
            attachments: [{ filename: file.name || "resume.pdf", content: base64Content }]
          })
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          throw new Error("Resend API rejected request: " + errText);
        }

        return new Response("<h1>[SUCCESS] Operator Profile and Credentials Deployed Successfully.</h1><p><a href='/'>Return to dashboard node.</a></p>", { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
      } catch (err) { 
        return new Response("<h1>Credential Ingestion Pipeline Error</h1><p>" + err.message + "</p>", { status: 500, headers: { "Content-Type": "text/html" } }); 
      }
    }
    // 3. ROUTE: Serve the Complete Visual User Dashboard Application
    const ui = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okagyeson Defense Systems</title>
    <!-- Styles and UI elements omitted for brevity; ensure your complete HTML template with matching form fields (name="resume", name="applied_role") is included here. -->
</html>`;

    return new Response(ui, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
