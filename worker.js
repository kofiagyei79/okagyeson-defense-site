
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okagyeson Defense Systems | Enterprise Cyber Security</title>
    <style>
        :root {
            --bg-main: #070a13;
            --bg-card: #0f1424;
            --border-color: #1e294b;
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --accent-blue: #38bdf8;
            --accent-green: #4ade80;
            --accent-red: #f87171;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-main);
            color: var(--text-primary);
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }

        header {
            background-color: rgba(15, 20, 36, 0.85);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid var(--border-color);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
        }

        .logo {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo span {
            color: var(--accent-blue);
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        nav a {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
            cursor: pointer;
        }

        nav a:hover, nav a.active {
            color: var(--accent-blue);
        }

        .btn-header {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: white;
            border: none;
            padding: 0.5rem 1.2rem;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
        }

        main {
            max-width: 1200px;
            margin: 7rem auto 4rem auto;
            padding: 0 2rem;
        }

        .page-section {
            display: none;
        }

        .page-section.active-section {
            display: block;
            animation: fadeIn 0.4s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1.5rem;
            position: relative;
        }

        .stat-card h3 {
            color: var(--text-secondary);
            font-size: 0.9rem;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .stat-card .value {
            font-size: 2.2rem;
            font-weight: 700;
            font-family: monospace;
        }

        .stat-card .status-indicator {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .bg-pulse-green { background-color: var(--accent-green); box-shadow: 0 0 10px var(--accent-green); }
        .bg-pulse-blue { background-color: var(--accent-blue); box-shadow: 0 0 10px var(--accent-blue); }

        .console-box {
            background-color: #020617;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1.5rem;
            font-family: monospace;
            height: 300px;
            overflow-y: auto;
            color: #38bdf8;
        }

        .console-line {
            margin-bottom: 0.4rem;
            font-size: 0.9rem;
        }

        .section-title {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            text-align: center;
        }

        .section-desc {
            color: var(--text-secondary);
            text-align: center;
            margin-bottom: 3rem;
        }

        .services-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 2rem;
        }

        .service-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 2.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .tier-badge {
            display: inline-block;
            background-color: rgba(56, 139, 253, 0.1);
            color: var(--accent-blue);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .service-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .price {
            font-size: 2rem;
            font-weight: 700;
            margin: 1rem 0;
            font-family: monospace;
        }

        .price span {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .service-features {
            list-style: none;
            margin-bottom: 2rem;
            color: var(--text-secondary);
        }

        .service-features li {
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .service-features li::before {
            content: "✓";
            color: var(--accent-green);
        }

        .btn-card {
            background-color: transparent;
            color: var(--text-primary);
            border: 1px solid var(--border-color);
            padding: 0.75rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            width: 100%;
        }

        .btn-card:hover {
            background-color: var(--accent-blue);
            color: #070a13;
        }

        .jobs-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .job-item {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .job-meta h3 {
            font-size: 1.25rem;
        }

        .job-details {
            color: var(--text-secondary);
            font-size: 0.9rem;
            display: flex;
            gap: 1.5rem;
        }

        .btn-apply {
            background-color: rgba(56, 139, 253, 0.15);
            color: var(--accent-blue);
            border: 1px solid rgba(56, 139, 253, 0.3);
            padding: 0.6rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
        }

        .btn-apply:hover {
            background-color: var(--accent-blue);
            color: #070a13;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.7);
            z-index: 2000;
            align-items: center; justify-content: center;
        }

        .modal-content {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 8px; padding: 2.5rem;
            max-width: 500px; width: 100%; position: relative;
        }

        .close-modal { position: absolute; top: 1rem; right: 1.5rem; cursor: pointer; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: var(--text-secondary); }
        
        .form-group input, .form-group textarea, .form-group select {
            width: 100%; background-color: var(--bg-main);
            border: 1px solid var(--border-color); padding: 0.75rem;
            border-radius: 4px; color: var(--text-primary);
        }

        .btn-submit {
            width: 100%; background: linear-gradient(135deg, #0284c7, #0369a1);
            color: white; border: none; padding: 0.75rem; border-radius: 4px; font-weight: 600; cursor: pointer;
        }
    </style>
</head>
<body>
    <header>
        <div class="nav-container">
            <div class="logo">🛡️ Okagyeson <span>Defense</span></div>
            <nav>
                <ul>
                    <li><a onclick="switchTab('soc')" id="nav-soc" class="active">SOC Operations</a></li>
                    <li><a onclick="switchTab('services')" id="nav-services">Our Services</a></li>
                    <li><a onclick="switchTab('careers')" id="nav-careers">Careers</a></li>
                </ul>
            </nav>
            <button class="btn-header" onclick="openModal('service-modal')">Request Audit</button>
        </div>
    </header>

    <main>
        <section id="sec-soc" class="page-section active-section">
            <h2 class="section-title">Security Operations Center</h2>
          
