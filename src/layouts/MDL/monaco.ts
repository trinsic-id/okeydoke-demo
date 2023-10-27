export const monacoHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <style type="text/css">
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="container" style="width: 100%; height: 100%"></div>
    <script
      type="text/javascript"
      src="https://unpkg.com/monaco-editor/min/vs/loader.js"
    ></script>
    <script>
      const json = {{data}};

      require.config({
        paths: { vs: "https://unpkg.com/monaco-editor/min/vs" },
      });

      require(["vs/editor/editor.main"], function () {

        var editor = monaco.editor.create(
          document.getElementById("container"),
          {
            value: JSON.stringify(json, null, 4),
            language: "json",
            fontSize:16,
            readOnly:true,
            theme: "vs-dark",
          }
        );

        window.onresize = function () {
          editor.layout();
        };
      });
    </script>
  </body>
</html>
`;

export const generateMonacoHTML = (data: any) =>
    monacoHTML.replace("{{data}}", JSON.stringify(data));
