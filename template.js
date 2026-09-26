// ===================================================================================================
// OKAGYESON CYBER DEFENCE SYSTEMS: PRODUCTION TEXT ENVIRONMENT MAP DATA (template.js)
// ===================================================================================================

export const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Okagyeson Cyber Defense LLC provides professional threat detection, vulnerability penetration testing, and dedicated HIPAA and legal data compliance solutions for critical infrastructure, hospitals, and law firms.">
    <title>Okagyeson Cyber Defense LLC | Enterprise Security & Compliance</title>
    <style>
        :root {
            --bg-dark-portal: #070c14;
            --text-primary-white: #ffffff;
            --text-muted-gray: #7d8b9e;
            --accent-electric-blue: #3b82f6;
            --card-surface-dark: #0c1420;
            --border-slate: #152238;
            --terminal-green: #4ade80;
            --button-blue: #0284c7;
            --accent-amber: #d1a86a;
        }

        body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--bg-dark-portal);
            color: var(--text-primary-white);
            line-height: 1.6;
        }

        .enterprise-portal {
            min-height: 100vh;
            padding: 2rem 5%;
            box-sizing: border-box;
        }

        header.nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--border-slate);
            margin-bottom: 3.5rem;
            background-color: transparent;
        }

        .logo-area {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .brand-title {
            font-weight: 800;
            font-size: 1.25rem;
            letter-spacing: 0.05em;
            line-height: 1.1;
        }

        .brand-title small {
            font-size: 0.75rem;
            color: var(--text-muted-gray);
            letter-spacing: 0.1em;
        }

        .main-nav {
            display: flex;
            gap: 2.5rem;
        }

        .nav-link {
            color: var(--text-muted-gray);
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .nav-link:hover {
            color: var(--text-primary-white);
        }

        .cta-audit-btn {
            background: transparent;
            border: 1px solid var(--text-primary-white);
            color: var(--text-primary-white);
            padding: 0.6rem 1.25rem;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .cta-audit-btn:hover {
            background: var(--text-primary-white);
            color: var(--bg-dark-portal);
        }

        .content-container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .hero-matrix {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 4rem;
            align-items: center;
            margin-bottom: 4rem;
        }
