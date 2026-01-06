import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getHello() {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Proba API</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f5f5f5; color: #333; }
            .container { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { margin: 0 0 1rem; color: #0070f3; }
            p { margin: 0; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Proba API Services</h1>
            <p>The API is running v1.0.0</p>
            <p style="margin-top: 1rem; font-size: 0.875rem;">Authentication required for all endpoints.</p>
          </div>
        </body>
      </html>
    `;
  }
}
