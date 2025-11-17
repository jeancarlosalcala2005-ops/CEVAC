<?php
// ===============================================
// Archivo: submit_form.php
// Función: Procesa el formulario de contacto y envía un correo.
// ===============================================

// 1. CONFIGURACIÓN DEL CORREO DESTINO
$recipient_email = "jeancarlosalcala2005@gmail.com"; 
$subject = "Nueva Consulta Web - CEVAC";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// 2. RECIBIR Y SANITIZAR DATOS
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Simple sanitización (limpieza) de datos para seguridad
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
    $interest = filter_var(trim($_POST['interest']), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // 3. VALIDACIÓN EN EL SERVIDOR (Doble seguridad)
    if (empty($name) || empty($email) || empty($interest) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Redirigir a la página de error si faltan datos importantes
        header("Location: error.html");
        exit;
    }

    // 4. PREPARAR EL CUERPO DEL CORREO EN FORMATO HTML
    $email_body = "
    <html>
    <head>
      <title>{$subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #ff0000; color: white; padding: 10px; text-align: center; border-radius: 6px 6px 0 0; }
        .content { padding: 20px 0; }
        .data-point { margin-bottom: 15px; }
        .data-point strong { display: block; color: #000000; margin-bottom: 5px; }
        .footer { font-size: 0.9em; text-align: center; color: #777; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h2>Nueva Consulta de: {$name}</h2>
        </div>
        <div class='content'>
          <div class='data-point'>
            <strong>Motivo de Interés:</strong> {$interest}
          </div>
          <div class='data-point'>
            <strong>Nombre:</strong> {$name}
          </div>
          <div class='data-point'>
            <strong>Email:</strong> {$email}
          </div>
          <div class='data-point'>
            <strong>Teléfono/WhatsApp:</strong> " . (empty($phone) ? "No proporcionado" : $phone) . "
          </div>
          <div class='data-point' style='border-top: 1px dashed #ccc; padding-top: 15px;'>
            <strong>Mensaje:</strong>
            <p>{$message}</p>
          </div>
        </div>
        <div class='footer'>
          Este mensaje fue enviado desde el formulario de contacto de cevac.org.
        </div>
      </div>
    </body>
    </html>
    ";

    // 5. ENVIAR EL CORREO
    if (mail($recipient_email, $subject, $email_body, $headers)) {
        // Éxito: Redirigir a la página de agradecimiento
        header("Location: thank_you.html");
        exit;
    } else {
        // Error: Redirigir a la página de error
        header("Location: error.html");
        exit;
    }
    
} else {
    // Si alguien intenta acceder directamente al archivo PHP, redirigir a la página principal
    header("Location: index.html");
    exit;
}
?>