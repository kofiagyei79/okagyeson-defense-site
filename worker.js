export default {
  async fetch(request, env, ctx) {
    // Exact raw path to fetch your index.html file from your repository
    const githubUrl = "https://githubusercontent.com";
    
    try {
      const response = await fetch(githubUrl);
      
      if (!response.ok) {
        return new Response("Error loading site assets.", { status: 500 });
      }
      
      const htmlContent = await response.text();
      
      return new Response(htmlContent, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    } catch (err) {
      return new Response("Cyber Defense Gateway Timeout", { status: 500 });
    }
  },
};
