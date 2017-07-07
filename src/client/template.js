export default ({ title, body }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
};
