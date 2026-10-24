$(function() {
    console.log("🔧 Iniciando reparación de botones eXe V3 (Radar Emparejador)...");

    // 1. EL CONSTRUCTOR: Enlaza cada botón con su caja de solución correspondiente
    function repararBotones() {
        var $cajas = $('[class*="ejercicio-custom"]');
        
        $cajas.each(function(cajaIndex) {
            var $caja = $(this);
            
            // Encontramos todas las cajas de soluciones ocultas en orden
            var $feedbacks = $caja.find('.iDevice_answer, .iDevice_feedback, .feedback, [id^="feedback"]');
            
            // Encontramos todos los botones en orden
            var $botones = $caja.find("input[type='button']:not(.box-toggle):not(.toggler), input[type='submit'], .feedbackbutton");
            
            $botones.each(function(btnIndex) {
                var $btn = $(this);
                if (!$btn.parent().hasClass("feedbackbutton-wrapper")) {
                    // Creamos un código único para esta pareja (ej. "0-1")
                    var uniqueId = cajaIndex + '-' + btnIndex;
                    
                    // Envolvemos el botón y le ponemos la etiqueta
                    $btn.wrap("<div class='feedbackbutton-wrapper' data-target-id='" + uniqueId + "'></div>");
                    $btn.after("<span class='custom-text-overlay'>Mostrar solución</span>");
                    
                    // Le ponemos la misma etiqueta a la caja de solución que le toca
                    if ($feedbacks.eq(btnIndex).length > 0) {
                        $feedbacks.eq(btnIndex).attr('data-feedback-id', uniqueId);
                    }
                }
            });
        });
    }

    // 2. EL RADAR INDIVIDUAL: Comprueba si la caja emparejada está visible
    $(document).on('click', '.feedbackbutton-wrapper, .feedbackbutton-wrapper input', function(e) {
        var $btnWrapper = $(this).closest('.feedbackbutton-wrapper');
        var $overlay = $btnWrapper.find('.custom-text-overlay');
        var targetId = $btnWrapper.attr('data-target-id');
        var $cajaPadre = $btnWrapper.closest('[class*="ejercicio-custom"]');
        
        var check = function() {
            var isVisible = false;
            // Buscamos la caja de solución exacta de este botón
            var $targetFeedback = $cajaPadre.find('[data-feedback-id="' + targetId + '"]');
            
            if ($targetFeedback.length > 0) {
                // Comprobamos si la caja ha aparecido en la pantalla
                if ($targetFeedback.is(':visible') && $targetFeedback.css('opacity') != 0 && $targetFeedback.css('display') != 'none') {
                    isVisible = true;
                }
            }

            // Cambiamos el color (blanco) y el texto SOLO a este botón
            $btnWrapper.toggleClass('solucion-abierta', isVisible);
            $overlay.text(isVisible ? "Ocultar solución" : "Mostrar solución");
        };

        // Escaneos tácticos para ajustarse a las animaciones de eXeLearning
        setTimeout(check, 50);
        setTimeout(check, 300);
        setTimeout(check, 600);
    });

    // 3. ARRANQUE
    repararBotones();
    setTimeout(repararBotones, 1000); // Doble pasada de seguridad
});