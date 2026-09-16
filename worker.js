export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Force the worker to serve index.html for the home page
    if (url.pathname === "/" || url.pathname === "") {
      const html = await env.ASSETS.fetch(new URL("/index.html", request.url));
      return new Response(html.body, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }
    
    // Serve any other static files normally
    return env.ASSETS.fetch(request);
  }
};
